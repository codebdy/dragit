import {EventEmitter} from 'events'    

declare var window: {$bus:EventEmitter};
const bus = new EventEmitter();

bus.setMaxListeners(10000);
window.$bus = bus;
export default bus;   
