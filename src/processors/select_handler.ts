import { AbstractProcessor } from "./abstract_processor";
import { Select } from "../modules/select";
import { Util } from "../modules/util";
import { check_fragment, KEYWORDS } from "../syntax/syntax";

export class SelectHandler extends AbstractProcessor {
    constructor() {
        super();
    }

    process = (fragment: Element) => {
        fragment.querySelectorAll(`[${KEYWORDS.SELECT.name}]`).forEach((element) => {
            this.logger.info(`Processing element ${Util.truncate(element.outerHTML, 80)}`);
            const xx = new Select(element as HTMLSelectElement);
        });
    };

    postprocess = () => { };
};
