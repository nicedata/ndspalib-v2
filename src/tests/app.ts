import { DEFINITIONS, ND_EVENTS, PROGNAME } from "../main";
import { Logger } from "../modules";

import JSON5 from 'json5';


const logger = new Logger('App');
const logger1 = new Logger('App');

logger1.info('This is a test', 1, 2, 3, 4, 65);
logger1.warn('This is a test', 1, 2, 3, 4, 65);
logger1.error('This is a test', 1, 2, 3, 4, 65);

console.log(JSON5.stringify(DEFINITIONS));
console.log(JSON5.stringify(ND_EVENTS));
console.log(PROGNAME)

