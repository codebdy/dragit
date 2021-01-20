import { DADA_RXID_CONST } from '../Base/RXNode/RXNode';

export function getDomByRxid(rxid?: string): Element | null {
  return document.querySelector(`[${DADA_RXID_CONST}="${rxid}"]`);
}
