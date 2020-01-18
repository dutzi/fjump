export interface ICommand {
  trigger: string;
  description?: string;
  url: string;
  executeCount: number;
}
