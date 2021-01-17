import { IPageSchema } from 'Base/Model/IPage';
import { IMeta } from 'Base/Model/IMeta';
import { ID } from 'Base/Model/graphqlTypes';
import { RXNode } from 'Base/RXNode/RXNode';

export interface IEditorSnapshot {
  canvasNode?: RXNode<IMeta>;
  pageSchema?: IPageSchema;
  selectedNodeId?: ID;
}
