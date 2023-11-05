import { debounce } from 'lodash-es';
import { defineCustomElements } from '@sensus/extension-content-ui/loader';

type ContentScriptOptions = {
  analyse: (comment: string) => Promise<number>
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type ShowIconOptions = {
  textarea: HTMLTextAreaElement;
  icon: HTMLElement
}

let currentIcon: HTMLElement | null = null;
const showIcon = ({ textarea, icon }: ShowIconOptions) => {
  icon.style.position = 'absolute';
  icon.style.top = `${textarea.offsetTop + 10}px`;
  icon.style.left = `${textarea.offsetLeft + textarea.offsetWidth - 36}px`;

  if (currentIcon) {
    currentIcon.remove();
  }

  textarea.parentElement?.appendChild(icon);
  currentIcon = icon;
}

export const registerContentScript = async ({ analyse }: ContentScriptOptions) => {
  await defineCustomElements();
  while (true) {
    const commentTextarea = document
      .querySelector<HTMLTextAreaElement>('[name="comment[body]"]:not(.sensus)');

    if (!commentTextarea) {
      await wait(1000);
      continue;
    }

    commentTextarea.addEventListener('keyup', debounce(async (event) => {
      showIcon({
        textarea: commentTextarea,
        icon: document.createElement('sensus-icon-spin'),
      });

      const result = await analyse(commentTextarea.value);
      const scoreIcon = document.createElement('sensus-score');
      scoreIcon.value = result;
      showIcon({
        textarea: commentTextarea,
        icon: scoreIcon,
      })
    }, 1000));

    commentTextarea.classList.add('sensus');

    await wait(1000);
  }
};
