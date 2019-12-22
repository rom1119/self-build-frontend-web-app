import MouseMoveEventSource from "./Controller/MouseMoveEventSource"


export default abstract class MoveEventController
{
    
    protected timeout
    protected mouseDown
    protected mouseDownTimeout = 400

    public abstract mouseDownHandler(ev: MouseMoveEventSource)
    public abstract mouseUpHandler(ev: MouseEvent)
    public abstract mouseMoveHandler(ev: MouseEvent)

    // public setMouseDownTimeout(val: number)
    // {
    //     this.mouseDownTimeout = val
    // }

}