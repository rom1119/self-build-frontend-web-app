import FetcherRealCssProp from '../../FetcherRealCssProp';
import BorderLeftCss from '../Border/Left/BorderLeftCss';
import HtmlTag from '~/src/Layout/HtmlTag';
import BorderRightCss from '../Border/Right/BorderRightCss';
import BorderTopCss from '../Border/Top/BorderTopCss';
import BorderBottomCss from '../Border/Bottom/BorderBottomCss';
import Unit from '../../Unit/Unit';
import UnitSize from '../../Unit/UnitSize';
import BaseBorderCss from '../Border/BaseBorderCss';
import BorderGlobalCss from '../Border/Global/BorderGlobalCss';
export default class BorderRealCssFetcher implements FetcherRealCssProp
{

    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag

    }
    
    fetchPropValue(propName: string): string {
        switch (propName) {
            case BorderLeftCss.PROP_NAME:
                return this.getLeft()
            case BorderRightCss.PROP_NAME:
                return this.getRight()
            case BorderTopCss.PROP_NAME:
                return this.getTop()
            case BorderBottomCss.PROP_NAME:
                return this.getBottom()
                case BorderGlobalCss.PROP_NAME:
                    return this.getGlobal()
        }

        throw Error(`Can not fetch Default Border from property name ${propName}`)

    }
    
    fetchUnit(propName: string): Unit {
        switch (propName) {
            case BorderLeftCss.PROP_NAME:
                return this.getLeftUnit()
            case BorderRightCss.PROP_NAME:
                return this.getRightUnit()
            case BorderTopCss.PROP_NAME:
                return this.getTopUnit()
            case BorderBottomCss.PROP_NAME:
                return this.getBottomUnit()
                case BorderGlobalCss.PROP_NAME:
                    return this.getGlobalUnit()
        }

        throw Error(`Can not fetch Default Border Unit from property name ${propName}`)

    }

    private getLeft(): string
    {
        let propName = BorderLeftCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getClearValue()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.left
        }

        return ''
    }
    
    private getRight(): string
    {
        let propName = BorderRightCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getClearValue()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.right
        }

        return ''
    }
    
    private getTop(): string
    {
        let propName = BorderTopCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getClearValue()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.top
        }

        return ''
    }
    
    private getBottom(): string
    {
        let propName = BorderBottomCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getClearValue()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.bottom
        }

        return ''
    }
    
    private getGlobal(): string
    {
        var propBase = this.getBaseProp()
        if (propBase) {
            if (propBase.amountValues() == 1) {

                return propBase.getClearValue()
            }
        }

        return ''
    }

    private getLeftUnit(): UnitSize
    {
        let propName = BorderLeftCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getUnit()
        }

        return null
    }

    private getRightUnit(): UnitSize
    {
        let propName = BorderRightCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getUnit()
        }

        return null
    }
    
    private getTopUnit(): UnitSize
    {
        let propName = BorderTopCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getUnit()
        }

        return null
    }
    
    private getBottomUnit(): UnitSize
    {
        let propName = BorderBottomCss.PROP_NAME
        var prop = this.getProp(propName)
        if (prop) {
            return prop.getUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getUnit()
        }

        return null
    }
    
    private getGlobalUnit(): UnitSize
    {
        var propBase = this.getBaseProp()
        if (propBase) {
            if (propBase.amountValues() == 1) {

                return propBase.getUnit()
            }
        }

        return null
    }


    private getProp(propName)
    {
        return this.htmlTag.cssAccessor.getProperty(propName)
    }
    
    private getBaseProp(): BaseBorderCss
    {
        return <BaseBorderCss>this.htmlTag.cssAccessor.getProperty('border')
    }
    
}