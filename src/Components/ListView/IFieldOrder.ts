type Order = 'asc' | 'desc';
export interface IFieldOrder {
  field: string;
  direction: Order;
}
