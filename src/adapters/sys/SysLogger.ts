import { Logger } from '~/core/interfaces/Logger';

export class SysLogger implements Logger {
  error(message: any): void | Promise<void> {
    const time = new Date();
    const finalMessage = message.toString ? message.toString() : `[Object] ${message}`;
    console.error(`${time.toUTCString()} ${finalMessage}`);
  }
}
