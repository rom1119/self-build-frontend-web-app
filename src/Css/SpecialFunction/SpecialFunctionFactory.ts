import * as libCss from "~/src/Css/SpecialFunction";

import SpecialFunctionComponent from './SpecialFunctionComponent';
import UnableCreateSpecialFunction from "./UnableCreateSpecialFunction";
export default class SpecialFunctionFactory
{
    createFromName(nameArg: string): SpecialFunctionComponent
    {
        var cssProps = libCss;
        var name = nameArg
        // console.log(name);
        
        for (const cssPropClass in cssProps) {
            // console.log(cssProps[cssPropClass].PROP_NAME);

            if (cssProps[cssPropClass].PROP_NAME === name) {
                return new cssProps[cssPropClass]
            }
        }

        throw new UnableCreateSpecialFunction(`Can not create css special function from name ${name}`)

        
    }

}
