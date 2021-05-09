
import UnableCreateCssPropertyFromName from '../Errors/UnableCreateCssPropertyFromName';
import * as libCss from "~/src/Css/ThreeDimensional/TransformTypes";
import BasePropertyCss from '../Css/BasePropertyCss';
import TransformType from '../Css/ThreeDimensional/TransformType';

export default class TransformTypeFactoryFromName {

    // private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        // this.htmlTagFactory = new HtmlTagFactory()
    }

    createAll(): TransformType[] {
        var res = []
        var cssProps = libCss;

        // console.log('cssProps', cssProps);
        for (const cssPropClass in cssProps) {
            // console.log(cssProps[cssPropClass].PROP_NAME);
            var el = new cssProps[cssPropClass]
            res.push(el)
        }
        return res
    }
    create(nameArg: string) : TransformType {
        var cssProps = libCss;
        var name = nameArg.replace(/\.?([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "")

        // console.log(name);
        
        for (const cssPropClass in cssProps) {
            // console.log(cssProps[cssPropClass].PROP_NAME);

            if (cssProps[cssPropClass].PROP_NAME === name) {
                return new cssProps[cssPropClass]
            }
        }
        
        throw new UnableCreateCssPropertyFromName(`Can not create Transform Type from name ${name}`)
    }
    
}