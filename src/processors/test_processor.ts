import { CheckResult } from "../main/types";
import { Parameter } from "../modules/parameter";
import { Logger } from "../modules/logger";
import { KEYWORDS, check_fragment, } from "../syntax/syntax";
import { AbstractProcessor } from "./abstract_processor";

const logger = new Logger('Test');



export class TestProcessor extends AbstractProcessor {
    constructor() {
        super();
    }

    process(fragment: Element): void {
        const elements = fragment.querySelectorAll(`[${KEYWORDS.TEST.name}]`);

        // Process this fragment
        elements.forEach((element) => {
            this.logger.info(`Processing '${KEYWORDS.TEST.name}' on element`, element);
            if (check_fragment(element) == CheckResult.SUCCESS) {
                new Parameter(element);
            }
        });

    }

    postprocess(): void { }
}