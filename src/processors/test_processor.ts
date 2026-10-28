import { CheckResult } from "../main/types";
import { Parameter } from "../modules/parameter";
import { Logger } from "../modules/logger";
import { ATTRIBUTE, check_fragment, PARAMETER } from "../syntax/syntax";
import { AbstractProcessor } from "./abstract_processor";

const logger = new Logger('Test');



export class TestProcessor extends AbstractProcessor {
    static readonly definition = ATTRIBUTE.TEST;

    constructor() {
        super();
    }

    process(fragment: Element): void {
        const elements = fragment.querySelectorAll(`[${TestProcessor.definition.name}]`);

        // Process this fragment
        elements.forEach((element) => {
            this.logger.info(`Processing '${TestProcessor.definition.name}' on element`, element);
            if (check_fragment(element) == CheckResult.SUCCESS) {
                new Parameter(element);
            }
        });

    }

    postprocess(): void { }
}