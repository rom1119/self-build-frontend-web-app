import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import ActiveElController from '../ActiveElController';
import SizeActivable from '../SizeActivable';
import ActiveToManageController from '../ActiveToManageController';
import ActivableTagToManage from '../ActivableTagToManage';
export default class DefaultActiveToManageController implements ActiveToManageController
{
    protected accualActiveEl: ActivableTagToManage


    public updateActiveTag(elToActive: ActivableTagToManage) 
    {
        if (this.accualActiveEl) {
            // @ts-ignore
            if (this.accualActiveEl.equals(elToActive)) {
                this.deactiveTag(elToActive)
                return
            }
            this.deactiveTag(elToActive)
        }

        this.accualActiveEl = elToActive
        this.accualActiveEl.changeAsActiveToManage()
    }

    public deactiveTag(val: ActivableTagToManage) {
        if (this.accualActiveEl) {
            this.accualActiveEl.changeAsNotActiveToManage()
            this.accualActiveEl = null
        }
    }
}