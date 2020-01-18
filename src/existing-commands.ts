import { ICommand } from './types.d';

const existingCommands: ICommand[] = (window as any).existingCommands;

export default existingCommands;
