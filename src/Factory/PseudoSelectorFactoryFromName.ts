
import UnableCreateCssPropertyFromName from '../Errors/UnableCreateCssPropertyFromName';
import * as libCss from "~/src/PseudoSelector/PseudoClass/index";
import * as libkeyFrame from "~/src/Animation/KeyFrameSelectors/index";
import BasePropertyCss from '../Css/BasePropertyCss';
import PseudoSelector from '../PseudoSelector/PseudoSelector';
import BaseSelector from '../BaseSelector';

export default class PseudoSelectorFactoryFromName {

    // private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        // this.htmlTagFactory = new HtmlTagFactory()
    }

    create(nameArg: string) : BaseSelector {
        var cssProps = libCss;
        var keyFrameLib = libkeyFrame;
        var name = nameArg.replace(/\.?([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "")
        
        for (const cssPropClass in cssProps) {

            if (cssProps[cssPropClass].NAME === name) {
                return new cssProps[cssPropClass]
            }
        }
        
        for (const cssPropClass in keyFrameLib) {

            if (keyFrameLib[cssPropClass].NAME === name) {
                return new keyFrameLib[cssPropClass]
            }
        }
        
        throw new UnableCreateCssPropertyFromName(`Can not create pseudo selector from name ${name}`)
    }
    
}