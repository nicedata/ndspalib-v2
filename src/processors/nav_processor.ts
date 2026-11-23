import { AbstractProcessor } from "./abstract_processor";
import { KEYWORDS, check_fragment } from "../syntax/syntax";
import { CheckResult } from "../main";
import { Nav } from "../modules/nav";

export class NavProcessor extends AbstractProcessor {

    constructor() {
        super();
    }

    process(fragment: Element): void {
        const elements = fragment.querySelectorAll(`[${KEYWORDS.NAV.name}]`);

        // Process this fragment
        elements.forEach((element) => {
            this.logger.info(`Processing '${KEYWORDS.NAV.name}' on element`, element);
            if (check_fragment(element) == CheckResult.SUCCESS) {
                new Nav(element);
            }
        });

    }

    postprocess(): void { }
} 