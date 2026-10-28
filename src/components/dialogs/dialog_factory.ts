import { PARAMETER } from "../../syntax/syntax";
import { Logger } from "../../modules/logger";
import { DlgConfirm } from "./confirm_dialog";
import { DlgInfo } from "./info_dialog";
import { DlgSecureConfirm } from "./secure_confirm_dialog";


const logger = new Logger('DialogFactory');
const dialog_types = ['info', 'confirm', 'validate'];

export class DialogFactory {

    static create = (element: Element): DlgConfirm | DlgInfo | DlgSecureConfirm | null => {

        if (!element.hasAttribute(PARAMETER.DIALOG.name))
            return null;



        // Get the template id from th nd-dialog attribute
        const template_id = element.getAttribute(PARAMETER.DIALOG.name)?.trim();

        // No template, no dialog
        if (!template_id) {
            logger.error(`The dialog template must have a valid 'id'.`);
            return null;
        }


        // Get the template
        const template = document.getElementById(template_id) as HTMLTemplateElement;
        if (!template) {
            logger.error(`No template with id='${template_id}' found on page.`);
            return null;
        }

        // Get the dialog type
        const dialog_type = template.dataset['type'] as string;
        if (!dialog_type) {
            logger.error(`Template '${template_id}' has no 'data-type' attribute.`);
            return null;
        }


        // Check dialog type
        if (!(dialog_types.includes(dialog_type))) {
            logger.error(`Template '${template_id}', the dialog type must be one of '${dialog_types.join(', ')}'.`);
            return null;
        }

        switch (dialog_type) {
            case 'info': return new DlgInfo(element);
            case 'confirm': return new DlgConfirm(element);
            case 'validate': return new DlgSecureConfirm(element);
            default: return null;
        }
    };
}