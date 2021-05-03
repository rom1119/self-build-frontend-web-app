import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import ActiveElController from '../ActiveElController';
import SizeActivable from '../SizeActivable';
import ActiveToController from '../ActiveToController';
import ActivableTagToPosition from '../ActivableTagToPosition';
import ActivableTagToAnimation from '../ActivableTagToAnimation';
import TextNode from '../Layout/TextNode';
import ActiveToAnimationController from '../ActiveToAnimationController';
import AnimationCreator from '../Animation/AnimationCreator';
export default class DefaultActiveToAnimationController implements ActiveToAnimationController<HtmlTag>
{
    protected readyToCheckEl: ActivableTagToAnimation

    protected allTreeTags: HtmlTag[] = []
    protected animationCreator: AnimationCreator

    constructor(tree: HtmlTag[], animationCreator: AnimationCreator) {
        this.allTreeTags = tree
        this.animationCreator = animationCreator
    }
    updateStartAnimation(elToActive: HtmlTag) {
        elToActive.changeAsStartAnimation()
    }
    deactiveStartAnimation() {
        if (this.animationCreator.selectedTag) {
            this.animationCreator.selectedTag.changeAsStopAnimation()
        }
    }


    public updateActiveTag(elToActive: HtmlTag) 
    {
        this.hideAllTags()
        // console.log('updateActiveTag');
        this.animationCreator.selectTag(elToActive)
        elToActive.changeAsActiveToAnimation()
        // console.log(elToActive);
        this.deactiveReadyToCheckTag()
    }

    public deactiveTag() {
        // console.log('deactiveTag');
        if (this.animationCreator.selectedTag) {
            // console.log('showAllTags');
            
            this.animationCreator.endManageAnimation()
        }
    }

    public updateReadyToCheckTag(elToActive: HtmlTag) 
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
}