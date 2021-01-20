import { ICommand } from "./ICommand";

export class DuplicateCommand implements ICommand{
  excute(){
    return undefined;
  }

  undo(){
    return undefined;
  }
}