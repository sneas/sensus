import '@webcomponents/custom-elements';
import { debounce } from 'lodash-es';
import { defineCustomElements } from '@sensus/extension-content-ui/loader';
import { analyze } from '@sensus/extension-api';

type ContentScriptOptions = {
  analyze: typeof analyze;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type ShowIconOptions = {
  textarea: HTMLTextAreaElement;
  icon: HTMLElement
}

let currentIcon: HTMLElement | null = null;
const showIcon = ({ textarea, icon }: ShowIconOptions) => {
  icon.style.position = 'absolute';
  icon.style.top = `8px`;
  icon.style.right = `8px`;

  hideIcon();

  textarea.parentElement?.appendChild(icon);
  currentIcon = icon;
}

const hideIcon = () => {
  if (currentIcon) {
    currentIcon.remove();
    currentIcon = null;
  }
};

export const registerContentScript = async ({ analyze }: ContentScriptOptions) => {
  defineCustomElements().then();

  let previousValue = '';
  while (true) {
    const commentTextarea = document
      .querySelector<HTMLTextAreaElement>('[name="comment[body]"]:not(.sensus)');

    if (!commentTextarea) {
      await wait(1000);
      continue;
    }

    previousValue = commentTextarea.value;

    commentTextarea.addEventListener('keyup', debounce(async () => {
      if (commentTextarea.value.trim() === '' && currentIcon) {
        currentIcon.remove();
        return;
      }

      if (commentTextarea.value === previousValue) {
        return;
      }

      previousValue = commentTextarea.value;

      showIcon({
        textarea: commentTextarea,
        icon: document.createElement('sensus-icon-spin'),
      });

      const result = await analyze(commentTextarea.value);

      if (result.status === 'failure') {
        hideIcon();
        return;
      }

      const scoreIcon = document.createElement('sensus-score');
      scoreIcon.value = result.value.averageScore;
      showIcon({
        textarea: commentTextarea,
        icon: scoreIcon,
      })
    }, 1000));

    commentTextarea.classList.add('sensus');

    await wait(1000);
  }
};
