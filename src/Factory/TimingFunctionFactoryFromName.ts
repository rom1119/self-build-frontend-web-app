
import UnableCreateCssPropertyFromName from '../Errors/UnableCreateCssPropertyFromName';
import * as libCss from "~/src/Animation/timingFunction";
import Unit from '../Unit/Unit';
import UnableCreateTimingFunctionFromName from '../Errors/UnableCreateTimingFunctionFromName';
import TimingFunction from '../Animation/timingFunction/TimingFunction';
import CubicBezier from '../Animation/timingFunction/impl/CubicBezier';

export default class TimingFunctionFactoryFromName {

    // private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        // this.htmlTagFactory = new HtmlTagFactory()
    }

    create(nameArg: string) : TimingFunction {
        var cssProps = libCss;
        var name = nameArg
        
        // console.error(nameArg);
        if (nameArg.indexOf('cubic-bezier') > -1) {
            return CubicBezier.CREATE_FROM_VAL(nameArg)
        }

        // console.log(name);
        
        for (const cssPropClass in cssProps) {
            // console.log(cssProps[cssPropClass].PROP_NAME);

            if (cssProps[cssPropClass].PROP_NAME === name) {
                return new cssProps[cssPropClass]
            }
        }
        
        throw new UnableCreateTimingFunctionFromName(`Can not create timing function from name ${name}`)
    }
    
}