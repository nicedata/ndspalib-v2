import { ATTRIBUTE } from "../syntax/syntax";
import { Source } from "../modules/source";
import { AbstractProcessor } from "./abstract_processor";

export class SourceProcessor extends AbstractProcessor {
    constructor() {
        super();
    }

    process = (fragment: Element) => {
        fragment.querySelectorAll(`[${ATTRIBUTE.MAIN.name}]`).forEach((element) => {
            new Source(element, ATTRIBUTE.MAIN);
        });
        fragment.querySelectorAll(`[${ATTRIBUTE.SOURCE.name}]`).forEach((element) => {
            new Source(element, ATTRIBUTE.SOURCE);
        });
    };

    postprocess = () => { };
};
