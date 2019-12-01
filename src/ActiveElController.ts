import SizeActivable from './SizeActivable';


export default abstract class ActiveElController
{
    
    private accualActiveEl: SizeActivable
    protected timeout
    protected mouseDown

    public updateActiveEl(elToActive: SizeActivable) 
    {
        if (this.accualActiveEl) {
            // @ts-ignore
            if (this.accualActiveEl.equals(elToActive)) {
                return
            }
            this.deactiveEl(elToActive)
        }

        this.accualActiveEl = elToActive
        this.accualActiveEl.changeAsActiveSize()
    }

    public deactiveEl(val: SizeActivable) {
        if (this.accualActiveEl) {
            this.accualActiveEl.changeAsDeactiveSize()
            // this.accualActiveEl = null
        }
    }

    public abstract mouseDownHandler(source: any)
    public abstract mouseUpHandler(ev: MouseEvent)
    public abstract mouseMoveHandler(ev: MouseEvent)
    public abstract hasActiveEl() : boolean

}