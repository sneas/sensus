import { createMessage } from '@vocably/hermes';
import {Analysis, Result} from "@sensus/model";

export const [analyze, onAnalyzeRequest] = createMessage<string, Result<Analysis>>('sensus.analyze');
