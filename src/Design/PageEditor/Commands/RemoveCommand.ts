import { ICommand } from "./ICommand";

export class RemoveCommand implements ICommand{
  excute(){
    return undefined;
  }

  undo(){
    return undefined;
  }
}