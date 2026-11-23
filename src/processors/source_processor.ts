import { KEYWORDS } from "../syntax/syntax";
import { Source } from "../modules/source";
import { AbstractProcessor } from "./abstract_processor";

export class SourceProcessor extends AbstractProcessor {
    constructor() {
        super();
    }

    process = (fragment: Element) => {
        fragment.querySelectorAll(`[${KEYWORDS.MAIN.name}],[${KEYWORDS.SOURCE.name}]`).forEach((element) => {
            new Source(element);
        });
    };

    postprocess = () => { };
};
