

export default abstract class MoveEventController
{
    
    protected timeout
    protected mouseDown

    public abstract mouseDownHandler(ev: MouseEvent)
    public abstract mouseUpHandler(ev: MouseEvent)
    public abstract mouseMoveHandler(ev: MouseEvent)

}