import { AbstractNotification } from "./abstract_notification";
import { AlertSeverity } from "../../main/types";


const HTML_TEMPLATE = `
<div nd-notification id="$id" class="nd-notification bg-$severity-subtle">
    <div class="nd-content">
        <span nd-close class="nd-close">&times;</span>
        $message
    </div>
</div>`;


export class Alert extends AbstractNotification {

    constructor(private severity: AlertSeverity, private message: string) {
        super();
        this.html = HTML_TEMPLATE.replace('$id', this.uuid).replace('$severity', this.severity).replace('$message', this.message);
    }
}