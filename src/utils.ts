import { ICommand } from './types.d';

export function getCommands(): ICommand[] {
  return JSON.parse(
    localStorage.getItem('user-commands') || '[]'
  ) as ICommand[];
}

export function setCommands(commands: ICommand[]) {
  localStorage.setItem('user-commands', JSON.stringify(commands));
}

export function addSchemaToURL(url: string): string {
  return (window as any).addSchemaToURL(url);
}
