import { DADA_RXID_CONST } from '../models/RxNode';

export function getDomByRxid(rxid?: string): Element | null {
  return document.querySelector(`[${DADA_RXID_CONST}="${rxid}"]`);
}
