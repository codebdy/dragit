import {EventEmitter} from 'events'    

declare var window: {$bus:EventEmitter};
const bus = new EventEmitter();

export const ACTIVE_NODE = "ACTIVE_NODE";
export const DRAG_OVER_EVENT = "DRAG_OVER_EVENT";

export const WILL_FOCUS_NODE = "WILL_FOCUS_NODE";
export const FOCUS_NODE = "FOCUS_NODE";
export const UN_FOCUS_NODE = "UN_FOCUS_NODE";

export const UN_ACTIVE_NODE = "UN_ACTIVE_NODE";
export const DRAGE_NODE = "DRAGE_NODE";
export const UN_DRAGE_NODE = "UN_DRAGE_NODE";
export const CANVAS_SCROLL = "CANVAS_SCROLL";
bus.setMaxListeners(10000);
window.$bus = bus;
export default bus;   
