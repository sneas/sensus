import { registerContentScript } from '@sensus/extension-content-script';
import { analyze } from '@sensus/extension-api';

registerContentScript({
  analyze: analyze
}).then();
