export interface Command {
  trigger(type: string, payload: any): void;
}
