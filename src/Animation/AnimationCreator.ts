import HtmlTag from '../Layout/HtmlTag';
import KeyFrame from './KeyFrame';
import KeyFrameSelector from './KeyFrameSelector';
import ActiveToAnimationController from '../ActiveToAnimationController';
import DefaultActiveToAnimationController from '../Controller/DefaultActiveToAnimationController';
export default class AnimationCreator
{
    reInit() {
        this._selectedKeyFrame = null
        this._selectedKeyFrameSelector = null
        if (this._selectedTag) {
            this._selectedTag.changeAsNotActiveToAnimation()
            this._selectedTag.changeAsNotReadyToAnimationCheck()
            this._selectedTag.changeAsStopAnimation()
            this._selectedTag = null
        }
    }

    protected activeAnimationController: DefaultActiveToAnimationController
    
    protected _selectedTag: HtmlTag = null
    protected _selectedKeyFrame: KeyFrame = null

    protected _selectedKeyFrameSelector: KeyFrameSelector = null

    protected static inst = null

    private constructor() {
    }

    public static getInstance(): AnimationCreator {
        if (!AnimationCreator.inst) {
            AnimationCreator.inst = new this()
        }
        return AnimationCreator.inst
    }

    setActiveController(arg: DefaultActiveToAnimationController) {
        this.activeAnimationController = arg
    }
    get selectedTag() {
        return this._selectedTag
    }

    selectTag(tag: HtmlTag) {
        this._selectedTag = tag
    }
    
    get selectedKeyFrame(): KeyFrame {
        return this._selectedKeyFrame
    }

    selectKeyFrame(keyFrame: KeyFrame) {
        this._selectedKeyFrame = keyFrame
    }
    
    get selectedKeyFrameSelector(): KeyFrameSelector {
        return this._selectedKeyFrameSelector
    }

    selectKeyFrameSelector(keyFrameSelector: KeyFrameSelector) {
        this._selectedKeyFrameSelector = keyFrameSelector
    }

    get animationIsStarted() {
        if (!this.isBasicConditionToManagaAnimation) {
            return false
        }

        return this.selectedTag.isReadyToStartAnimation()
    }

    get isBasicConditionToManagaAnimation() {
        if (!this.selectedTag || !this.selectedKeyFrame || !this.selectedKeyFrameSelector) {
            return false
        }

        return true
    }

    get canStartManageAnimation(): boolean {
        if (!this.isBasicConditionToManagaAnimation) {
            return false
        }

        return !this.selectedTag.isReadyToStartAnimation()
    }

    startManageAnimation() {
        if (!this.canStartManageAnimation) {
            throw Error('To start manage animation , you need select HTML tag, Animation and Key Frame ')
        }

        this._selectedKeyFrame.initTagToSelectors(this.selectedTag)
        this.selectedTag.clearSelectedSelectors()
        this.selectedTag.animationSelector = this.selectedKeyFrameSelector
        this.selectedTag.onChangeSelector()
        this.selectedTag.turnOffSynchronizer()
        this.selectedTag.changeAsStartAnimation()
        this.selectedTag.changeAsNotActiveToAnimation()
    }

    endManageAnimation() {
        if (!this.selectedTag ) {
            throw Error('To end manage animation , you need have a HTML tag, Animation and Key Frame ')
        }

        this.selectedTag.animationSelector = null
        this.selectedTag.onChangeSelector()
        this.selectedTag.turnOnSynchronizer()
        this.selectedTag.changeAsStopAnimation()
        this.selectedTag.changeAsNotActiveToAnimation()
        this.selectedTag.changeAsReadyToAnimationCheck()

        this.activeAnimationController.showAllTags()



        this.unselectTag()

    }

    protected unselectTag() {
        this._selectedTag = null
        this.unselectKeyFrame(null)
        this.unselectKeyFrameSelector(null)
    }

    unselectKeyFrame(keyFrame?: KeyFrame) {
        this._selectedKeyFrame = null
        this._selectedKeyFrameSelector = null
    }
    
    unselectKeyFrameSelector(selector: KeyFrameSelector) {
        this._selectedKeyFrameSelector = null
    }

    isSelectedKeyFrameToManage(keyFrame: KeyFrame): boolean {
        
        if (!this.selectedKeyFrame) {
            return false
        }
        return this.selectedKeyFrame.equals(keyFrame)
    }

    isSelectedSelectorToManage(selector: KeyFrameSelector) {
        // console.log('isSelectedSelectorToManage');
        
        if (!this.selectedKeyFrameSelector) {
            return false
        }
        // console.log('isSelectedSelectorToManage123');
        // console.log(selector);
        // console.log(this.selectedKeyFrameSelector);
        // console.log(this.selectedKeyFrameSelector.equals(selector));
        return this.selectedKeyFrameSelector.equals(selector)
    }
    canSelectSelector(selector?: KeyFrameSelector) {
        
        if (this.selectedKeyFrameSelector) {
            return false
        }
        
        if (!this.canSelectToManageAnimation) {
            return false
        }

        

        return true
    }

    get canSelectToManageAnimation(): boolean
    {
        // console.log('canSelectToManageAnimation');
        // console.log(this.selectedTag);
        // console.log(this.selectedKeyFrame);
        
        if (this._selectedTag && !this._selectedKeyFrame) {
            return true
        }
        
        return false
    }
}