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

export function getQuery(): string | null {
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has('q')) {
    return searchParams.get('q');
  }

  return null;
}

export function isDarkMode() {
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}
