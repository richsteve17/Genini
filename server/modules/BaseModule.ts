// Base Module Class for all Jefe Bot modules

import { BotMessage, BotState } from '../types.js';

export abstract class BaseModule {
  protected name: string;
  protected enabled: boolean = false;
  protected state: BotState;

  constructor(name: string, state: BotState) {
    this.name = name;
    this.state = state;
  }

  abstract initialize(): Promise<void>;
  abstract cleanup(): Promise<void>;

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    console.log(`[${this.name}] ${enabled ? 'Enabled' : 'Disabled'}`);
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  protected async sendMessage(message: BotMessage, sendFn: (msg: string) => Promise<void>): Promise<void> {
    if (!this.enabled) return;

    if (message.delay) {
      await new Promise(resolve => setTimeout(resolve, message.delay));
    }

    await sendFn(message.content);
  }

  protected log(message: string): void {
    console.log(`[${this.name}] ${message}`);
  }
}
