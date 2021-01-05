import { IPageSchema } from 'base/Model/IPage';
import { IMeta } from 'base/Model/IMeta';
import { RXNodeRoot } from 'base/RXNode/Root';
import { ID } from 'base/Model/graphqlTypes';

export interface IEditorSnapshot {
  canvasNode?: RXNodeRoot<IMeta>;
  pageSchema?: IPageSchema;
  selectedNodeId?: ID;
}
