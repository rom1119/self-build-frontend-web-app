import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import ActiveElController from '../ActiveElController';
export default class AnimationController
{

    protected tag: HtmlTag


    public initAnimationForTag(tag: HtmlTag) {

        this.tag = tag
    }



}