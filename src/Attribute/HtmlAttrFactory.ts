
import UnableCreateCssPropertyFromName from '../Errors/UnableCreateCssPropertyFromName';
import * as libCss from "~/src/Attribute/";
import BasePropertyCss from '../Css/BasePropertyCss';
import HtmlAttr from './HtmlAttr';
import CustomAttr from '~/src/Attribute/html/CustomAttr';

export default class HtmlAttrFactory {

    // private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        // this.htmlTagFactory = new HtmlTagFactory()
    }

    create(nameArg: string) : HtmlAttr {
        var cssProps = libCss;
        var name = nameArg.replace(/\.?([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "")

        // console.log('FACTORY');
        // console.log(cssProps);
        
        for (const cssPropClass in cssProps) {
            // console.log(cssProps[cssPropClass].PROP_NAME);

            if (cssProps[cssPropClass].NAME === name) {
                return new cssProps[cssPropClass]
            }
        }

        var a = new CustomAttr(nameArg, '');
        return a
        
        throw new UnableCreateCssPropertyFromName(`Can not create html attribute from name ${name}`)
    }
    
}