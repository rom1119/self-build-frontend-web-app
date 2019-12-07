

export default abstract class SizeElController
{
    
    protected timeout
    protected mouseDown

    public abstract mouseDownHandler(source: any)
    public abstract mouseUpHandler(ev: MouseEvent)
    public abstract mouseMoveHandler(ev: MouseEvent)
    public abstract hasActiveEl() : boolean

}