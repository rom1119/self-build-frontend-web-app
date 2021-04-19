import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import ActiveElController from '../ActiveElController';
import SizeActivable from '../SizeActivable';
import ActiveToController from '../ActiveToController';
import ActivableTagToPosition from '../ActivableTagToPosition';
import ActivableTagToAnimation from '../ActivableTagToAnimation';
export default class DefaultActiveToAnimationController implements ActiveToController<ActivableTagToAnimation>
{
    protected accualActiveEl: ActivableTagToAnimation


    public updateActiveTag(elToActive: ActivableTagToAnimation) 
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
        this.accualActiveEl.changeAsActiveToAnimation()
    }

    public deactiveTag() {
        if (this.accualActiveEl) {
            this.accualActiveEl.changeAsNotActiveToAnimation()
            this.accualActiveEl = null
        }
    }
}