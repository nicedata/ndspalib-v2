import { KVPair } from "../main/types";
import { PARAMETERS } from "../syntax/syntax";
import { Logger } from "./logger";
import { Util } from "./util";

const logger = new Logger('Parameters');

export class Parameter {
    private data: Record<string, any> = {};

    constructor(private element: Element) {
        const data = (element.getAttribute(PARAMETERS.PARAMS.name) || '').trim();
        this.data = data ? Util.to_json(data) : {};
        // Cleanup
        for (const key in this.data) { this.data[key] = this.data[key].trim(); };
    }

    get = (key: string, deflt: any = null): any => {
        return this.data[key] || deflt;
    };

    set = (key: string, value: any, replace: boolean = false): KVPair => {
        this.data[key] = (key in this.data && !replace) ? this.data[key] : value;
        return this.data[key];
    };

    all = () => {
        return this.data;
    };

    dump = (): void => {
        for (const key in this.data) {
            logger.info(`'${key}' -> '${this.data[key]}'`);
        }
    };
}
