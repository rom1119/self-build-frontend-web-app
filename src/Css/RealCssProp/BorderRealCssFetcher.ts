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
import BorderFetcherRealCssProp from '~/src/BorderFetcherRealCssProp';
import UnitColor from '../../Unit/UnitColor';
export default class BorderRealCssFetcher implements BorderFetcherRealCssProp
{

    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag

    }
    
    fetchPropWidth(propName: string): string {
        switch (propName) {
            case BorderLeftCss.PROP_NAME:
                return this.getLeftWidth()
            case BorderRightCss.PROP_NAME:
                return this.getRightWidth()
            case BorderTopCss.PROP_NAME:
                return this.getTopWidth()
            case BorderBottomCss.PROP_NAME:
                return this.getBottomWidth()
            case BorderGlobalCss.PROP_NAME:
                return this.getGlobalWidth()
        }

        throw Error(`Can not fetch Default Border width from property name ${propName}`)

    }
    
    fetchPropStyle(propName: string): string {
        switch (propName) {
            case BorderLeftCss.PROP_NAME:
                return this.getLeftStyle()
            case BorderRightCss.PROP_NAME:
                return this.getRightStyle()
            case BorderTopCss.PROP_NAME:
                return this.getTopStyle()
            case BorderBottomCss.PROP_NAME:
                return this.getBottomStyle()
            case BorderGlobalCss.PROP_NAME:
                return this.getGlobalStyle()
        }

        throw Error(`Can not fetch Default Border  style from property name ${propName}`)

    }
    
    fetchPropColor(propName: string): string {
        switch (propName) {
            case BorderLeftCss.PROP_NAME:
                return this.getLeftColor()
            case BorderRightCss.PROP_NAME:
                return this.getRightColor()
            case BorderTopCss.PROP_NAME:
                return this.getTopColor()
            case BorderBottomCss.PROP_NAME:
                return this.getBottomColor()
            case BorderGlobalCss.PROP_NAME:
                return this.getGlobalColor()
        }

        throw Error(`Can not fetch Default Border  Color from property name ${propName}`)

    }
    
    fetchUnitWidth(propName: string): UnitSize {
        switch (propName) {
            case BorderLeftCss.PROP_NAME:
                return this.getLeftUnitWidth()
            case BorderRightCss.PROP_NAME:
                return this.getRightUnitWidth()
            case BorderTopCss.PROP_NAME:
                return this.getTopUnitWidth()
            case BorderBottomCss.PROP_NAME:
                return this.getBottomUnitWidth()
            case BorderGlobalCss.PROP_NAME:
                return this.getGlobalUnitWidth()
        }

        throw Error(`Can not fetch Default Border Unit Width from property name ${propName}`)

    }

    fetchUnitStyle(propName: string): Unit {
        switch (propName) {
            case BorderLeftCss.PROP_NAME:
                return this.getLeftUnitStyle()
            case BorderRightCss.PROP_NAME:
                return this.getRightUnitStyle()
            case BorderTopCss.PROP_NAME:
                return this.getTopUnitStyle()
            case BorderBottomCss.PROP_NAME:
                return this.getBottomUnitStyle()
            case BorderGlobalCss.PROP_NAME:
                return this.getGlobalUnitStyle()
        }

        throw Error(`Can not fetch Default Border Unit  Style from property name ${propName}`)

    }
    
    fetchUnitColor(propName: string): UnitColor {
        switch (propName) {
            case BorderLeftCss.PROP_NAME:
                return this.getLeftUnitColor()
            case BorderRightCss.PROP_NAME:
                return this.getRightUnitColor()
            case BorderTopCss.PROP_NAME:
                return this.getTopUnitColor()
            case BorderBottomCss.PROP_NAME:
                return this.getBottomUnitColor()
            case BorderGlobalCss.PROP_NAME:
                return this.getGlobalUnitColor()
        }

        throw Error(`Can not fetch Default Border Unit  Color from property name ${propName}`)

    }

    private getLeftWidth(): string
    {
        let propName = BorderLeftCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearWidth()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearWidth()
        }

        return ''
    }
    
    private getRightWidth(): string
    {
        let propName = BorderRightCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearWidth()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearWidth()
        }

        return ''
    }
    
    private getTopWidth(): string
    {
        let propName = BorderTopCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearWidth()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearWidth()
        }

        return ''
    }
    
    private getBottomWidth(): string
    {
        let propName = BorderBottomCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearWidth()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearWidth()
        }

        return ''
    }
    
    private getGlobalWidth(): string
    {
        var propBase: BaseBorderCss = this.getBaseProp()
        if (propBase) {
            return propBase.getClearWidth()
        }

        return ''
    }

    private getLeftStyle(): string
    {
        let propName = BorderLeftCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearStyle()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearStyle()
        }

        return ''
    }
    
    private getRightStyle(): string
    {
        let propName = BorderRightCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearStyle()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearStyle()
        }

        return ''
    }
    
    private getTopStyle(): string
    {
        let propName = BorderTopCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearStyle()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearStyle()
        }

        return ''
    }
    
    private getBottomStyle(): string
    {
        let propName = BorderBottomCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearStyle()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearStyle()
        }

        return ''
    }
    
    private getGlobalStyle(): string
    {
        var propBase: BaseBorderCss = this.getBaseProp()
        if (propBase) {
            return propBase.getClearStyle()
        }

        return ''
    }

    private getLeftColor(): string
    {
        let propName = BorderLeftCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearColor()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearColor()
        }

        return ''
    }
    
    private getRightColor(): string
    {
        let propName = BorderRightCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearColor()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearColor()
        }

        return ''
    }
    
    private getTopColor(): string
    {
        let propName = BorderTopCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearColor()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearColor()
        }

        return ''
    }
    
    private getBottomColor(): string
    {
        let propName = BorderBottomCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getClearColor()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getClearColor()
        }

        return ''
    }
    
    private getGlobalColor(): string
    {
        var propBase: BaseBorderCss = this.getBaseProp()
        if (propBase) {
            return propBase.getClearColor()
        }

        return ''
    }

    private getLeftUnitWidth(): UnitSize
    {
        let propName = BorderLeftCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getWidthUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getWidthUnit()
        }

        return null
    }

    private getRightUnitWidth(): UnitSize
    {
        let propName = BorderRightCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getWidthUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getWidthUnit()
        }

        return null
    }
    
    private getTopUnitWidth(): UnitSize
    {
        let propName = BorderTopCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getWidthUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getWidthUnit()
        }

        return null
    }
    
    private getBottomUnitWidth(): UnitSize
    {
        let propName = BorderBottomCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getWidthUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getWidthUnit()
        }

        return null
    }
    
    private getGlobalUnitWidth(): UnitSize
    {
        let propName = BorderGlobalCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getWidthUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getWidthUnit()
        }

        return null
    }

    private getLeftUnitStyle(): Unit
    {
        let propName = BorderLeftCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getTypeUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getTypeUnit()
        }

        return null
    }

    private getRightUnitStyle(): Unit
    {
        let propName = BorderRightCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getTypeUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getTypeUnit()
        }

        return null
    }
    
    private getTopUnitStyle(): Unit
    {
        let propName = BorderTopCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getTypeUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getTypeUnit()
        }

        return null
    }
    
    private getBottomUnitStyle(): Unit
    {
        let propName = BorderBottomCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getTypeUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getTypeUnit()
        }

        return null
    }
    
    private getGlobalUnitStyle(): Unit
    {
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getTypeUnit()
        }

        return null
    }



    private getLeftUnitColor(): UnitColor
    {
        let propName = BorderLeftCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getColorUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getColorUnit()
        }

        return null
    }

    private getRightUnitColor(): UnitColor
    {
        let propName = BorderRightCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getColorUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getColorUnit()
        }

        return null
    }
    
    private getTopUnitColor(): UnitColor
    {
        let propName = BorderTopCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getColorUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getColorUnit()
        }

        return null
    }
    
    private getBottomUnitColor(): UnitColor
    {
        let propName = BorderBottomCss.PROP_NAME
        var prop: BaseBorderCss = <BaseBorderCss>this.getProp(propName)
        if (prop) {
            return prop.getColorUnit()
        }
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getColorUnit()
        }

        return null
    }
    
    private getGlobalUnitColor(): UnitColor
    {
        var propBase = this.getBaseProp()
        if (propBase) {
            return propBase.getColorUnit()
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