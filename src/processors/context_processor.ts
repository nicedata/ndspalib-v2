import { AbstractProcessor } from "./abstract_processor";
import { ND_EVENTS, NO_CONTEXT } from "../main/constants";
import { KEYWORDS } from "../syntax/syntax";
import { Logger } from "../modules/logger";
import { Util } from "../modules/util";

const logger = new Logger('Context');

type TKeys = 'show' | 'hide' | 'enable' | 'disable' | 'remove' | 'reset';
type TParameters = Record<TKeys, string>;



class Context {
    public name!: string;
    public source!: string;
    public params: TParameters = { show: '', hide: '', enable: '', disable: '', remove: '', reset: '' };

    constructor(element: HTMLElement) {
        this.source = element.outerHTML;
        const truncated_html = Util.truncate(this.source);

        for (const data in element.dataset) {
            if (data === 'name') {
                this.name = element.dataset[data] || '';
                if (!this.name)
                    logger.error(`No context name is defined on element ${truncated_html}.`);
            } else {
                if (data in this.params) {
                    this.params[data as TKeys] = element.dataset[data] ?? '';
                } else {
                    logger.warn(`Invalid context parameter '${data}' on element ${truncated_html}.`);
                }
            }
        }
    }
}

export class ContextProcessor extends AbstractProcessor {
    private active_context: string = NO_CONTEXT;
    private contexts: Context[] = [];

    constructor() {
        super();

        // Add an event listeners
        this.logger.info(`Adding a listener to handle '${ND_EVENTS.CONTEXT}' events.`);
        // document.addEventListener(ND_EVENTS.CONTEXT, this.#set_context);
        // document.addEventListener(ND_EVENTS.REFRESH_AFTER, this.#after_refresh);
        document.addEventListener(ND_EVENTS.CONTEXT, () => { });
        document.addEventListener(ND_EVENTS.REFRESH_AFTER, () => { });
    }

    private apply_context = () => {
        this.logger.info(`Applying context '${this.active_context}'.`);
        const context_names = this.active_context !== NO_CONTEXT ? [NO_CONTEXT, this.active_context] : [NO_CONTEXT];
        for (const name of context_names) {
            this.contexts.forEach(context => {
                if (context.name !== name) return;

                for (const key of Object.keys(context.params) as TKeys[]) {
                    const selector: string = context.params[key];
                    const targets = Util.get_targets(selector);

                    switch (key) {
                        case 'show':
                            targets.forEach(t => { t.hidden = false; });
                            break;
                        case 'hide':
                            targets.forEach(t => { t.hidden = true; });
                            break;
                        case 'enable':
                            targets.forEach(t => { (t as HTMLButtonElement).disabled = false; });
                            break;
                        case 'disable':
                            targets.forEach(t => { (t as HTMLButtonElement).disabled = true; });
                            break;
                        case 'remove':
                            targets.forEach(t => { t.remove(); });
                            break;
                        case 'reset':
                            targets.forEach(t => {
                                t instanceof HTMLFormElement ? t.reset() : {};
                                // t.dispatchEvent(new CustomEvent(ND_EVENTS.RESET));
                            });
                            break;
                    }
                }
            });
        }
    };

    public get_context = (): string => {
        return this.active_context;
    };

    public set_context = (name: string): void => {
        this.active_context = name;
        this.apply_context();
    };

    public process = (fragment: HTMLElement): void => {
        const elements = fragment.querySelectorAll(`[${KEYWORDS.CONTEXT.name}]`);
        // Add contexts
        elements.forEach((element: Element) => {
            const source = element.outerHTML;

            this.logger.info(`Processing '${KEYWORDS.CONTEXT.name}' on element`, Util.truncate(source));

            // If not already present, add !
            this.contexts.find((ctx) => ctx.source === source) ? {} : this.contexts.push(new Context(element as HTMLElement));
        });
    };


    public postprocess = (): void => {
        this.logger.info(`Postprocessing ${this.contexts.length} context(s).`);
        this.apply_context();
    };
};
