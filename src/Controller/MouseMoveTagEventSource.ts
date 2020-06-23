import MouseMoveEventSource from "./MouseMoveEventSource"
import HtmlTag from '../Layout/HtmlTag';
import EventSourceLayout from "./EventSourceLayout";

export default class MouseMoveTagEventSource implements EventSourceLayout {

    event: MouseEvent
    target: HtmlTag
}