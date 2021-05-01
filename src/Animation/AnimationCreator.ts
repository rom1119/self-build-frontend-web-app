import HtmlTag from '../Layout/HtmlTag';
import KeyFrame from './KeyFrame';
import KeyFrameSelector from './KeyFrameSelector';
export default class AnimationCreator
{
    
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

    startManageAnimation() {
        if (!this.selectTag || !this.selectKeyFrame) {
            throw Error('To start manage animation , you need select HTML tag, Animation and Key Frame ')
        }

    }
    unselectTag() {
        this._selectedTag = null
        this.unselectKeyFrame(null)
    }

    unselectKeyFrame(keyFrame: KeyFrame) {
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
    canSelectSelector(selector: KeyFrameSelector) {
        if (!this.selectedKeyFrame) {
            return false
        }
        
        if (this.selectedKeyFrameSelector) {
            return false
        }

        return this.selectedKeyFrame.selectorAccessor.getSelectorById(selector.id) != null
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