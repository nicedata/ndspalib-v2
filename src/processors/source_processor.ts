import { ATTR_NAME } from "../main/syntax";
import { Source } from "../modules/source";
import { AbstractProcessor } from "./abstract_processor";

export class SourceProcessor extends AbstractProcessor {
    static _instance: any;

    constructor() {
        // Singleton
        if (!!SourceProcessor._instance) {
            return SourceProcessor._instance;
        }
        super("SourceHandler");
        SourceProcessor._instance = this;
    }

    process = (fragment: Element) => {
        fragment.querySelectorAll(`[${ATTR_NAME.MAIN}]`).forEach((element) => {
            new Source(element, ATTR_NAME.MAIN);
        });
        fragment.querySelectorAll(`[${ATTR_NAME.SOURCE}]`).forEach((element) => {
            new Source(element, ATTR_NAME.SOURCE);
        });
    };

    postprocess = () => { };
};
