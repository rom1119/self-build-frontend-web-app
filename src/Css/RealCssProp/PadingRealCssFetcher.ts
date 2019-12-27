import FetcherRealCssProp from '../../FetcherRealCssProp';
import PaddingLeftCss from '../BoxModel/Padding/PaddingLeftCss';
import HtmlTag from '~/src/Layout/HtmlTag';
import BasePaddingCss from '../BoxModel/BasePaddingCss';
import PaddingRightCss from '../BoxModel/Padding/PaddingRightCss';
import PaddingTopCss from '../BoxModel/Padding/PaddingTopCss';
import PaddingBottomCss from '../BoxModel/Padding/PaddingBottomCss';
import PaddingCss from '../BoxModel/Padding/PaddingCss';
export default class PaddingRealCssFetcher implements FetcherRealCssProp
{

    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag

    }
    
    fetchPropValue(propName: string): string {
        switch (propName) {
            case PaddingLeftCss.PROP_NAME:
                return this.getLeft()
            case PaddingRightCss.PROP_NAME:
                return this.getRight()
            case PaddingTopCss.PROP_NAME:
                return this.getTop()
            case PaddingBottomCss.PROP_NAME:
                return this.getBottom()
                case PaddingCss.PROP_NAME:
                    return this.getGlobal()
        }

        throw Error(`Can not create Default Padding from property name ${propName}`)

    }

    private getLeft(): string
    {
        let propName = PaddingLeftCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getClearValue()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.left
        }

        return 0 + ''
    }
    
    private getRight(): string
    {
        let propName = PaddingRightCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getClearValue()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.right
        }

        return 0 + ''
    }
    
    private getTop(): string
    {
        let propName = PaddingTopCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getClearValue()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.top
        }

        return 0 + ''
    }
    
    private getBottom(): string
    {
        let propName = PaddingBottomCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getClearValue()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.bottom
        }

        return 0 + ''
    }
    
    private getGlobal(): string
    {
        var propBase = this.getBaseProp()
        if (propBase) {
            if (propBase.amountValues() == 1) {

                return propBase.getClearValue()
            }
        }

        return 0 + ''
    }


    private getProp(propName)
    {
        return this.htmlTag.cssAccessor.getProperty(propName)
    }
    
    private getBaseProp(): BasePaddingCss
    {
        return <BasePaddingCss>this.htmlTag.cssAccessor.getProperty('padding')
    }
    
}