import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import ActiveElController from '../ActiveElController';
import SizeActivable from '../SizeActivable';
import ActiveToController from '../ActiveToController';
import ActivableTagToPosition from '../ActivableTagToPosition';
export default class DefaultActiveToPositionController implements ActiveToController<ActivableTagToPosition>
{
    protected accualActiveEl: ActivableTagToPosition


    public updateActiveTag(elToActive: ActivableTagToPosition) 
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
        this.accualActiveEl.changeAsActiveToPosition()
    }

    public deactiveTag() {
        if (this.accualActiveEl) {
            this.accualActiveEl.changeAsNotActiveToPosition()
            this.accualActiveEl = null
        }
    }
}