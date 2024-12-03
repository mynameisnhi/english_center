/* eslint-disable vars-on-top, no-var */
import type { Logger as LoggerType } from 'winston';

declare global {
  type CustomObject<Type> = {
    [key: string]: Type;
  };
  var ProductID: string;
  var Logger: LoggerType;
}

declare module 'express-session' {
  interface SessionData {
    user?: any;
  }
}
