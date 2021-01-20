import { ICommand } from "./ICommand";

export class DropCommand implements ICommand{
  excute(){
    return undefined;
  }

  undo(){
    return undefined;
  }
}