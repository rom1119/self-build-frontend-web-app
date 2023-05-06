
import UnableCreateCssPropertyFromName from '../Errors/UnableCreateCssPropertyFromName';
import * as libCss from "~/src/Css/";
import BasePropertyCss from '../Css/BasePropertyCss';

export default class CssPropertyFactoryFromName {

    // private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        // this.htmlTagFactory = new HtmlTagFactory()
    }

    create(nameArg: string) : BasePropertyCss {
        var cssProps = libCss;
        var name = nameArg.replace(/\.?([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "")

        var excluded_css = [
            'clip',
            'break-after',
            'white-space',
            'object-fit',
            'text-overflow',
            'webkit-border-horizontal-spacing',
        ]

        if (excluded_css.includes(name)) {
            return null
        }
        // console.log(name);
        
        for (const cssPropClass in cssProps) {
            // console.log(cssProps[cssPropClass].PROP_NAME);

            if (cssProps[cssPropClass].PROP_NAME === name) {
                return new cssProps[cssPropClass]
            }
        }
        
        throw new UnableCreateCssPropertyFromName(`Can not create css property from name ${name}`)
    }
    
}