import { createMessage } from '@vocably/hermes';

export const [analyze, onAnalyzeRequest] = createMessage<string, number>('sensus.analyze');
