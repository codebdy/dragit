import {EventEmitter} from 'events'    
//const bus= {...EventEmitter.prototype}  
const bus = new EventEmitter();
export const FOCUS_NODE = "FOCUS_NODE";
export default bus       
