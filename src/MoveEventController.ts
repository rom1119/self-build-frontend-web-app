import MouseMoveEventSource from "./Controller/MouseMoveEventSource"
import EventSourceLayout from "./Controller/EventSourceLayout"


export default abstract class MoveEventController<T extends EventSourceLayout>
{
    
    protected timeout
    protected mouseDown
    protected mouseDownTimeout = 400

    public abstract mouseDownHandler(ev: T)
    public abstract mouseUpHandler(ev: MouseEvent)
    public abstract mouseMoveHandler(ev: MouseEvent)

    // public setMouseDownTimeout(val: number)
    // {
    //     this.mouseDownTimeout = val
    // }

}