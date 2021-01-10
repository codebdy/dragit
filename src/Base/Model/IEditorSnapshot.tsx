import { IPageSchema } from 'Base/Model/IPage';
import { IMeta } from 'Base/Model/IMeta';
import { RXNodeRoot } from 'Base/RXNode/Root';
import { ID } from 'Base/Model/graphqlTypes';

export interface IEditorSnapshot {
  canvasNode?: RXNodeRoot<IMeta>;
  pageSchema?: IPageSchema;
  selectedNodeId?: ID;
}
