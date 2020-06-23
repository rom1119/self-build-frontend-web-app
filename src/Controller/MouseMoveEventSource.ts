import EventSourceLayout from "./EventSourceLayout"

export default class MouseMoveEventSource implements EventSourceLayout {

    event: MouseEvent
    target: HTMLElement
}