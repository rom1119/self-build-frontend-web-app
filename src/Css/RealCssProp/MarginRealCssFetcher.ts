import FetcherRealCssProp from '../../FetcherRealCssProp';
import MarginLeftCss from '../BoxModel/Margin/MarginLeftCss';
import HtmlTag from '~/src/Layout/HtmlTag';
import BaseMarginCss from '../BoxModel/BaseMarginCss';
import MarginRightCss from '../BoxModel/Margin/MarginRightCss';
import MarginTopCss from '../BoxModel/Margin/MarginTopCss';
import MarginBottomCss from '../BoxModel/Margin/MarginBottomCss';
import MarginCss from '../BoxModel/Margin/MarginCss';
import Unit from '../../Unit/Unit';
import UnitSize from '../../Unit/UnitSize';
export default class MarginRealCssFetcher implements FetcherRealCssProp
{

    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag

    }
    
    fetchPropValue(propName: string): string {
        switch (propName) {
            case MarginLeftCss.PROP_NAME:
                return this.getLeft()
            case MarginRightCss.PROP_NAME:
                return this.getRight()
            case MarginTopCss.PROP_NAME:
                return this.getTop()
            case MarginBottomCss.PROP_NAME:
                return this.getBottom()
                case MarginCss.PROP_NAME:
                    return this.getGlobal()
        }

        throw Error(`Can not fetch Default Margin from property name ${propName}`)

    }
    
    fetchUnit(propName: string): Unit {
        switch (propName) {
            case MarginLeftCss.PROP_NAME:
                return this.getLeftUnit()
            case MarginRightCss.PROP_NAME:
                return this.getRightUnit()
            case MarginTopCss.PROP_NAME:
                return this.getTopUnit()
            case MarginBottomCss.PROP_NAME:
                return this.getBottomUnit()
                case MarginCss.PROP_NAME:
                    return this.getGlobalUnit()
        }

        throw Error(`Can not fetch Default Margin Unit from property name ${propName}`)

    }

    private getLeft(): string
    {
        let propName = MarginLeftCss.PROP_NAME
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
        let propName = MarginRightCss.PROP_NAME
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
        let propName = MarginTopCss.PROP_NAME
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
        let propName = MarginBottomCss.PROP_NAME
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
        let propName = MarginLeftCss.PROP_NAME
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
        let propName = MarginRightCss.PROP_NAME
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
        let propName = MarginTopCss.PROP_NAME
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
        let propName = MarginBottomCss.PROP_NAME
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
    
    private getBaseProp(): BaseMarginCss
    {
        return <BaseMarginCss>this.htmlTag.cssAccessor.getProperty('margin')
    }
    
}