import { AbstractNotification } from "./abstract_notification";


const HTML_TEMPLATE = `
<div nd-notification id="$id" class="nd-toast" role="alert">
    <div class="nd-content">
        <span nd-close class="nd-close">&times;</span>
        <h5 class="nd-toast-header">$title</h5>
        <div class="nd-toast-content">$message</div>
    </div>
</div>`;


export class Toast extends AbstractNotification {

    constructor(private title: string, private message: string) {
        super();
        this.html = HTML_TEMPLATE.replace('$id', this.uuid).replace('$title', this.title).replace('$message', this.message);
    }
}