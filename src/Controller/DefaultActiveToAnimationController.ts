import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import ActiveElController from '../ActiveElController';
import SizeActivable from '../SizeActivable';
import ActiveToController from '../ActiveToController';
import ActivableTagToPosition from '../ActivableTagToPosition';
import ActivableTagToAnimation from '../ActivableTagToAnimation';
import TextNode from '../Layout/TextNode';
export default class DefaultActiveToAnimationController implements ActiveToController<ActivableTagToAnimation>
{
    protected accualActiveEl: ActivableTagToAnimation

    protected readyToCheckEl: ActivableTagToAnimation

    protected allTreeTags: HtmlTag[] = []

    constructor(tree: HtmlTag[]) {
        this.allTreeTags = tree
    }

    protected hideAllTagsRecursive(tags: HtmlTag[]) {
    
        for (const child of tags) {
            if (child instanceof TextNode) {
                continue
            }
            child.hideElement()
            this.hideAllTagsRecursive(<HtmlTag[]>child.children)
        }
    }

    protected hideAllTags() {
        this.hideAllTagsRecursive(this.allTreeTags)
    }

    protected showAllTagsRecursive(tags: HtmlTag[]) {
    
        for (const child of tags) {
            if (child instanceof TextNode) {
                continue
            }
            child.showElement()
            this.showAllTagsRecursive(<HtmlTag[]>child.children)
        }
    }

    protected showAllTags() {
        this.showAllTagsRecursive(this.allTreeTags)
    }

    public updateActiveTag(elToActive: ActivableTagToAnimation) 
    {
        this.hideAllTags()

        this.accualActiveEl = elToActive
        this.accualActiveEl.changeAsActiveToAnimation()
        this.deactiveReadyToCheckTag()
    }

    public deactiveTag() {
        if (this.accualActiveEl) {
            this.accualActiveEl.changeAsNotActiveToAnimation()
            this.accualActiveEl = null
        }
    }

    public updateReadyToCheckTag(elToActive: ActivableTagToAnimation) 
    {
        if (this.readyToCheckEl) {
            // @ts-ignore
            // if (this.readyToCheckEl.equals(elToActive)) {
            //     this.deactiveReadyToCheckTag()
            //     return
            // }
            this.deactiveReadyToCheckTag()
        }

        this.readyToCheckEl = elToActive
        this.readyToCheckEl.changeAsReadyToAnimationCheck()
    }

    public deactiveReadyToCheckTag() {
        if (this.readyToCheckEl) {
            this.readyToCheckEl.changeAsNotReadyToAnimationCheck()
            this.readyToCheckEl = null
        }
    }
}