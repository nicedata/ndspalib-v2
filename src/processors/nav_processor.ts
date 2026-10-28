import { AbstractProcessor } from "./abstract_processor";
import { ATTRIBUTE, check_fragment } from "../syntax/syntax";
import { CheckResult } from "../main";
import { Nav } from "../modules/nav";

export class NavProcessor extends AbstractProcessor {
    static readonly definition = ATTRIBUTE.NAV;

    constructor() {
        super();
    }

    process(fragment: Element): void {
        const elements = fragment.querySelectorAll(`[${NavProcessor.definition.name}]`);

        // Process this fragment
        elements.forEach((element) => {
            this.logger.info(`Processing '${NavProcessor.definition.name}' on element`, element);
            if (check_fragment(element) == CheckResult.SUCCESS) {
                new Nav(element);
            }
        });

    }

    postprocess(): void { }
}