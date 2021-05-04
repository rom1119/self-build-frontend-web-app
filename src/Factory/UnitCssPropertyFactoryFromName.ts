
import UnableCreateCssPropertyFromName from '../Errors/UnableCreateCssPropertyFromName';
import * as libCss from "~/src/Unit/";
import BasePropertyCss from '../Css/BasePropertyCss';
import Unit from '../Unit/Unit';

export default class UnitCssPropertyFactoryFromName {

    // private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        // this.htmlTagFactory = new HtmlTagFactory()
    }

    create(nameArg: string) : Unit {
        var cssProps = libCss;
        var name = nameArg

        // console.log(name);
        
        for (const cssPropClass in cssProps) {
            // console.log(cssProps[cssPropClass].PROP_NAME);

            if (cssProps[cssPropClass].PROP_NAME === name) {
                return new cssProps[cssPropClass]
            }
        }
        
        throw new UnableCreateCssPropertyFromName(`Can not create UNIT from name ${name}`)
    }
    
}