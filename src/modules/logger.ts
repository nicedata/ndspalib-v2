import { Debug } from './debug';

export class Logger {
    source: string;
    debug: Debug;
    constructor(source: string, silent: boolean = false) {
        const name = "Logger";
        this.source = source;
        this.debug = new Debug();
        if (!this.debug.is_active()) return;
        if (this.debug.is_filtered(name)) return;
        if (!silent) console.info(`INFO | ${name} | Creating a logger for ${this.source}`);
    }

    info(...args: any) {
        if (!this.debug.is_active()) return;
        if (this.debug.is_filtered(this.source)) return;
        console.info(`INFO | ${this.source} |`, ...args);
    }

    error(...args: any) {
        console.error(`ERROR | ${this.source} |`, ...args);
    }

    warn(...args: any) {
        if (!this.debug.warnings) return;
        console.warn(`WARNING | ${this.source} |`, ...args);
    }
};