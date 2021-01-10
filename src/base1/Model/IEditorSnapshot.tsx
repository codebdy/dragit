import { IPageSchema } from 'base1/Model/IPage';
import { IMeta } from 'base1/Model/IMeta';
import { RXNodeRoot } from 'base1/RXNode/Root';
import { ID } from 'base1/Model/graphqlTypes';

export interface IEditorSnapshot {
  canvasNode?: RXNodeRoot<IMeta>;
  pageSchema?: IPageSchema;
  selectedNodeId?: ID;
}
