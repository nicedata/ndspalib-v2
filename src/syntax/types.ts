import { Logger } from "../modules/logger";

export interface Keyword {
    readonly name: string; // Keyword name
    readonly tags: string[]; // Tags on which this keyword is allowed
}

export interface Parameter {
    readonly name: string; // Parameter name
    readonly standalone: boolean; // Parameter may appear on an HTML element with no nd-keyword
    readonly needsvalue: boolean; // Parameter needs a value
}

export interface Syntax {
    readonly keyword: Keyword; // The keyword
    readonly requires: Parameter[]; // Required parameters (may be one of them, see requires all)
    readonly requires_all: boolean; // True : all required parameters must be present, False: one of the parameters must be present
    readonly optional: Parameter[];
}

export class FragmentCheckResult {
    private static readonly logger = new Logger('FragmentCheck');
    private errors: string[] = [];
    private warnings: string[] = [];

    public add_error = (message: string): void => {
        this.errors.push(message);
    };

    public add_warning = (message: string): void => {
        this.warnings.push(message);
    };

    has_errors = (): boolean => {
        return this.errors.length > 0;
    };

    has_warnings = (): boolean => {
        return this.warnings.length > 0;
    };

    clear = (): void => {
        this.errors = [];
        this.warnings = [];
    };

    log_all = (): void => {
        this.errors.forEach(e => {
            FragmentCheckResult.logger.error(e);
        });

        this.warnings.forEach(e => {
            FragmentCheckResult.logger.warn(e);
        });
    };
}
