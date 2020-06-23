import HtmlTag from '../Layout/HtmlTag';
import PositionCss from '../Css/Display/PositionCss';
import LayoutFinder from '../LayoutFinder';


export default class NearTagWithPositionalFinder implements LayoutFinder<HtmlTag>
{

    protected tag: HtmlTag

    constructor(tag: HtmlTag)
    {
        this.tag = tag
    }

    public find(): HtmlTag
    {
        return this.findRecursive(this.tag)
    }
    protected findRecursive(tag: HtmlTag) {
        if (!tag.parent) {
            return
        }
        
        if (tag.parent.cssAccessor.hasCssProperty(PositionCss.PROP_NAME)) {
            return tag.parent
        }
        
        if (tag.parent) {
            return this.findRecursive(tag.parent)
        }
        return null
    }
}