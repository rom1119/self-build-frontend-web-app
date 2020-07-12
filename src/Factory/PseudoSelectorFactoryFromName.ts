
import UnableCreateCssPropertyFromName from '../Errors/UnableCreateCssPropertyFromName';
import * as libCss from "~/src/PseudoSelector";
import BasePropertyCss from '../Css/BasePropertyCss';
import PseudoSelector from '../PseudoSelector/PseudoSelector';

export default class PseudoSelectorFactoryFromName {

    // private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        // this.htmlTagFactory = new HtmlTagFactory()
    }

    create(nameArg: string) : PseudoSelector {
        var cssProps = libCss;
        var name = nameArg.replace(/\.?([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "")

        // console.log(name);
        
        for (const cssPropClass in cssProps) {
            // console.log(cssProps[cssPropClass].PROP_NAME);

            if (cssProps[cssPropClass].NAME === name) {
                return new cssProps[cssPropClass]
            }
        }
        
        throw new UnableCreateCssPropertyFromName(`Can not create pseudo selector from name ${name}`)
    }
    
}