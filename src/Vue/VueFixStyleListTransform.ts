import HtmlTag from '../Layout/HtmlTag';
import BasePropertyCss from '../Css/BasePropertyCss';
import { Width, Height, PaddingRightCss, PaddingBottomCss, PaddingTopCss, BorderGlobalCss, BorderLeftCss, BorderRightCss, BorderTopCss, BorderBottomCss, MarginCss, MarginLeftCss, MarginRightCss, MarginTopCss, MarginBottomCss, BorderRadiusTopLeft, BorderRadiusTopRight, BorderRadiusBottomLeft, BorderRadiusBottomRight } from '../Css';
import PaddingCss from '../Css/BoxModel/Padding/PaddingCss';
import PaddingLeftCss from '../Css/BoxModel/Padding/PaddingLeftCss';
import BorderRadiusGlobal from '../Css/Border/Radius/BorderRadiusGlobal';
import TransitionCss from '../Css/Animation/TransitionCss';
export class VueFixStyleListTransform
{

    private tag: HtmlTag
    private rand: number
    private replacedCss: any
    private allImportant: boolean = false

    constructor(tag: HtmlTag)
    {
        this.tag = tag
    }


    setAllImportant(value: boolean) {
        this.allImportant = value;
    }

    setReplacedCss(replacedCss: any) {
        this.replacedCss = replacedCss
    }

    addReplacedCss(replacedCss: any) {
        for (const cssProp in replacedCss) {

        }
        this.replacedCss = replacedCss
    }

    public transform(styleList: BasePropertyCss[]): Object
    {
        var css = {}
        var allStyles = styleList

        this.rand = Math.floor(Math.random() * 100);


        for (const cssProp of allStyles) {

            if (!cssProp.injectable) {
                continue
            }

            var val  = this.setCssPropValue(cssProp, this.tag)

            // if (this.allImportant) {
            //     css[cssProp.getName()] = val + ' !important'
            //
            // } else {
            //
            // }
            css[cssProp.getName()] = val



            // if (cssProp instanceof TransitionCss) {

            // }

            // console.log(cssProp.getName());

        }

        // console.log('VueFixStyleListTransform START');
        // console.log(css);
        css = this.replaceValues(css)


        this.checkBorders(css)
        this.checkPaddings(css)
        this.checkMargins(css)
        this.checkBorderRadius(css)

        // console.log(css);
        // console.log('VueFixStyleListTransform END');
        // for (const key in css) {
        //     if (css.hasOwnProperty(key)) {
        //         const element = css[key];

        //     }
        // }
        return css
    }

    setCssPropValue(css: BasePropertyCss, tag: HtmlTag) {
        var cssName = css.getName()
        var cssVal = css.value
        if (cssName.indexOf('-') > -1) {
            cssVal += ` /* ${this.rand} */`
        }
        if (css instanceof Width) {
            return  this.tag.getWidthValue()
        } else if (css instanceof Height) {
            return  this.tag.getHeightValue()
        }
        return cssVal
    }
    replaceValues(css: {}) {
        if (!this.replacedCss) {
            return css
        }
        for (const cssProp in css) {

            if (this.replacedCss[cssProp]) {
                var prop = ''

                prop += this.replacedCss[cssProp]
                prop += ` /* ${this.rand} */`
                css[cssProp] = this.replacedCss[cssProp]
            }
        }

        this.replacedCss = {}

        return css

    }
    checkMargins(css: {}) {
        if (css[MarginCss.PROP_NAME]) {
            if (css[MarginLeftCss.PROP_NAME] ||
                css[MarginRightCss.PROP_NAME] ||
                css[MarginTopCss.PROP_NAME] ||
                css[MarginBottomCss.PROP_NAME]
            ) {

                delete css[MarginCss.PROP_NAME]

                if (!css[MarginLeftCss.PROP_NAME]) {
                    css[MarginLeftCss.PROP_NAME] = this.composeMarginProperty(MarginLeftCss.PROP_NAME)
                }

                if (!css[MarginRightCss.PROP_NAME]) {
                    css[MarginRightCss.PROP_NAME] = this.composeMarginProperty(MarginRightCss.PROP_NAME)
                }

                if (!css[MarginTopCss.PROP_NAME]) {
                    css[MarginTopCss.PROP_NAME] = this.composeMarginProperty(MarginTopCss.PROP_NAME)
                }

                if (!css[MarginBottomCss.PROP_NAME]) {
                    css[MarginBottomCss.PROP_NAME] = this.composeMarginProperty(MarginBottomCss.PROP_NAME)
                }
            }
        }
    }

    checkPaddings(css: {}) {
        if (css[PaddingCss.PROP_NAME]) {
            if (css[PaddingLeftCss.PROP_NAME] ||
                css[PaddingRightCss.PROP_NAME] ||
                css[PaddingTopCss.PROP_NAME] ||
                css[PaddingBottomCss.PROP_NAME]
            ) {

                delete css[PaddingCss.PROP_NAME]

                if (!css[PaddingLeftCss.PROP_NAME]) {
                    css[PaddingLeftCss.PROP_NAME] = this.composePaddingProperty(PaddingLeftCss.PROP_NAME)
                }

                if (!css[PaddingRightCss.PROP_NAME]) {
                    css[PaddingRightCss.PROP_NAME] = this.composePaddingProperty(PaddingRightCss.PROP_NAME)
                }

                if (!css[PaddingTopCss.PROP_NAME]) {
                    css[PaddingTopCss.PROP_NAME] = this.composePaddingProperty(PaddingTopCss.PROP_NAME)
                }

                if (!css[PaddingBottomCss.PROP_NAME]) {
                    css[PaddingBottomCss.PROP_NAME] = this.composePaddingProperty(PaddingBottomCss.PROP_NAME)
                }
            }
        }
    }

    checkBorders(css: {}) {
        if (css[BorderGlobalCss.PROP_NAME]) {
            if (css[BorderLeftCss.PROP_NAME] ||
                css[BorderRightCss.PROP_NAME] ||
                css[BorderTopCss.PROP_NAME] ||
                css[BorderBottomCss.PROP_NAME]
            ) {
                delete css[BorderGlobalCss.PROP_NAME]

                if (!css[BorderLeftCss.PROP_NAME]) {
                    css[BorderLeftCss.PROP_NAME] = this.composeBorderProperty(BorderLeftCss.PROP_NAME)
                }

                if (!css[BorderRightCss.PROP_NAME]) {
                    css[BorderRightCss.PROP_NAME] = this.composeBorderProperty(BorderRightCss.PROP_NAME)
                }

                if (!css[BorderTopCss.PROP_NAME]) {
                    css[BorderTopCss.PROP_NAME] = this.composeBorderProperty(BorderTopCss.PROP_NAME)
                }

                if (!css[BorderBottomCss.PROP_NAME]) {
                    css[BorderBottomCss.PROP_NAME] = this.composeBorderProperty(BorderBottomCss.PROP_NAME)
                }

            }
        }
    }

    checkBorderRadius(css: {}) {
        if (css[BorderRadiusGlobal.PROP_NAME]) {
            if (css[BorderRadiusTopLeft.PROP_NAME] ||
                css[BorderRadiusTopRight.PROP_NAME] ||
                css[BorderRadiusBottomLeft.PROP_NAME] ||
                css[BorderRadiusBottomRight.PROP_NAME]
            ) {
                delete css[BorderRadiusGlobal.PROP_NAME]

                if (!css[BorderRadiusTopLeft.PROP_NAME]) {
                    css[BorderRadiusTopLeft.PROP_NAME] = this.composeBorderRadiusProperty(BorderRadiusTopLeft.PROP_NAME)
                }

                if (!css[BorderRadiusTopRight.PROP_NAME]) {
                    css[BorderRadiusTopRight.PROP_NAME] = this.composeBorderRadiusProperty(BorderRadiusTopRight.PROP_NAME)
                }

                if (!css[BorderRadiusBottomLeft.PROP_NAME]) {
                    css[BorderRadiusBottomLeft.PROP_NAME] = this.composeBorderRadiusProperty(BorderRadiusBottomLeft.PROP_NAME)
                }

                if (!css[BorderRadiusBottomRight.PROP_NAME]) {
                    css[BorderRadiusBottomRight.PROP_NAME] = this.composeBorderRadiusProperty(BorderRadiusBottomRight.PROP_NAME)
                }

            }
        }
    }

    composeBorderProperty(propName: string): string
    {
        var prop = ''
        prop += this.tag.borderRealFetcher.fetchUnitWidth(propName).getValue(this.tag.borderRealFetcher.fetchPropWidth(propName))
        prop += ' '
        prop += this.tag.borderRealFetcher.fetchUnitStyle(propName).getValue(this.tag.borderRealFetcher.fetchPropStyle(propName))
        prop += ' '
        prop += this.tag.borderRealFetcher.fetchUnitColor(propName).getValue(this.tag.borderRealFetcher.fetchPropColor(propName))
        prop += ` /* ${this.rand} */`

        return prop
    }

    composeBorderRadiusProperty(propName: string): string
    {
        var prop = ''
        prop += this.tag.cssAccessor.getProperty(BorderRadiusGlobal.PROP_NAME).getValue()
        prop += ` /* ${this.rand} */`

        return prop
    }

    composePaddingProperty(propName: string): string
    {
        var prop = ''
        prop += this.tag.paddingRealFetcher.fetchUnit(propName).getValue(this.tag.paddingRealFetcher.fetchPropValue(propName))
        prop += ` /* ${this.rand} */`

        return prop
    }

    composeMarginProperty(propName: string): string
    {
        var prop = ''
        prop += this.tag.marginRealFetcher.fetchUnit(propName).getValue(this.tag.marginRealFetcher.fetchPropValue(propName))
        prop += ` /* ${this.rand} */`


        return prop
    }
}
