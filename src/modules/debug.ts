export class Debug {
    static _instance: Debug;

    classname: string = "Debug";
    debug: boolean = false;
    filter_items: string[] = [];
    filter_override: string[] = [];
    warnings: boolean = true;

    constructor() {
        if (!!Debug._instance) {
            return Debug._instance;
        }
        Debug._instance = this;
    }

    enable() {
        this.debug = true;
        console.info(`INFO | ${this.classname} | Debugging is enabled.`);
    }

    disable() {
        this.debug = false;
        console.info(`INFO | ${this.classname} | Debugging is disabled.`);
    }

    hide_warnings = () => {
        this.warnings = false;
        console.info(`INFO | ${this.classname} | Warnings are hidden.`);
    };

    show_warnings = () => {
        this.warnings = true;
        console.info(`INFO | ${this.classname} | Warnings are shown.`);
    };

    is_active() {
        return this.debug;
    }

    ignore = (items: string[]) => {
        if (!Array.isArray(items)) {
            console.error(`ERROR | ${this.classname} | Function debug.ignore() requires a list of strings as an argument.`);
            return;
        }
        this.filter_items = items;
        this.filter_items.includes("*") ? (this.filter_items = ["*"]) : {};
        if (this.debug) console.log(`INFO | Debug | ${this.classname} ignored source(s) :`, this.filter_items.join(", "));
    };

    force = (items: string[]) => {
        if (!Array.isArray(items)) {
            console.error(`ERROR | ${this.classname} | Function debug.force() requires a list of strings as an argument.`);
            return;
        }
        this.filter_override = items;
        if (this.debug) console.log(`INFO | Debug | ${this.classname} forced source(s) :`, this.filter_override.join(", "));
    };

    is_filtered(source: string) {
        // console.log('XXX', source, this.filter_override, this.filter_items);

        if (this.filter_override.length && this.filter_override.includes(source)) return false;
        let result = true;
        this.filter_items.includes("*") ? result = true : result = this.filter_items.includes(source);
        // console.log('R', result, this.filter_items.includes(source));
        return result;
    }
};