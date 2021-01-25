import { DADA_RXID_CONST } from '../RxNode';

export function getDomByRxid(rxid?: string): Element | null {
  return document.querySelector(`[${DADA_RXID_CONST}="${rxid}"]`);
}
