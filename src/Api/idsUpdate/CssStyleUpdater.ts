import HtmlTag from '~/src/Layout/HtmlTag';
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import IDSUpdater from '../IDSUpdater';
import StyleCssResponse from '../../../types/response/StyleCssResponse';
import BaseGradientCss from '~/src/Css/Gradient/BaseGradientCss';
import { BackgroundImage } from '~/src/Css';
import BasePropertyCss from '../../Css/BasePropertyCss';
export default class CssStyleUpdater implements IDSUpdater<BasePropertyCss, StyleCssResponse> {

    update(domain: BasePropertyCss, results: StyleCssResponse) {
        var cssRes: StyleCssResponse = results
        var cssDomain = domain
        if (cssDomain.getName() !== cssRes.name) {
            return
        }
        
        cssDomain.id = cssRes.id
        // @ts-ignore
        if (typeof cssDomain.getValues === 'function') {
            // @ts-ignore
            for (var i = 0; i < cssRes.cssValues.length; i++) {
                if (cssDomain instanceof BaseGradientCss) {
                    // @ts-ignore
                    if (cssRes.cssValues[i].specialValGradient) {

                        cssDomain.direction.id = cssRes.cssValues[i].id
                        continue
                    } else {
                        const cssValDomain = cssDomain.getValues()[i - 1]
                        cssValDomain.id = cssRes.cssValues[i].id
                    }
                }
                // @ts-ignore
                const cssValDomain = cssDomain.getValues()[i]
                cssValDomain.id = cssRes.cssValues[i].id
            }

        }

        if (cssDomain instanceof BackgroundImage) {
            for (var m = 0; m < cssRes.children.length; m++) {
                var cssRes = cssRes.children[m]
                // @ts-ignore
                var cssDomain = cssDomain.getGradients()[m]
                this.update(cssDomain, cssRes)
                
            }
        }
    }

}