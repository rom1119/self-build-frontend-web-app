import SizeActivable from './SizeActivable';


export default class ActiveElController
{
    
    private accualActiveEl: SizeActivable

    public updateActiveEl(elToActive: SizeActivable) 
    {
        if (this.accualActiveEl) {
            this.accualActiveEl.changeAsDeactiveSize()
        }

        this.accualActiveEl = elToActive
        this.accualActiveEl.changeAsActiveSize()
    }

    public deactiveEl(val: SizeActivable) {
        this.accualActiveEl.changeAsDeactiveSize()
    }

}