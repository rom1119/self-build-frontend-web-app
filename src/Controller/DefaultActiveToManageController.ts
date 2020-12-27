import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import ActiveElController from '../ActiveElController';
import SizeActivable from '../SizeActivable';
import ActiveToController from '../ActiveToController';
import ActivableTagToManage from '../ActivableTagToManage';
export default class DefaultActiveToManageController implements ActiveToController<ActivableTagToManage>
{
    protected accualActiveEl: ActivableTagToManage


    public updateActiveTag(elToActive: ActivableTagToManage)
    {
        if (this.accualActiveEl) {
            // @ts-ignore
            if (this.accualActiveEl.equals(elToActive)) {
                this.deactiveTag()
                return
            }
            this.deactiveTag()
        }

        this.accualActiveEl = elToActive
        this.accualActiveEl.changeAsActiveToManage()
    }

    public deactiveTag() {
        if (this.accualActiveEl) {
            this.accualActiveEl.changeAsNotActiveToManage()
            this.accualActiveEl = null
        }
    }
}
