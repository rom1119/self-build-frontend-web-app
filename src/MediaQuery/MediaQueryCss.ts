import BaseSelector from '../BaseSelector';
import PseudoSelector from '../PseudoSelector/PseudoSelector';
import HtmlTag from '../Layout/HtmlTag';
import MediaFeature from './MediaFeature';
import MediaType from './MediaType';
import MediaQueryOperator from './MediaQueryOperator';
import CssMultipleValue from '../Css/CssMultipleValue';
import CssValue from '../Css/CssValue';
import Vue from 'vue';
import UnitSize from '../Unit/UnitSize';
import Pixel from '../Unit/Size/Pixel';
import Unit from '../Unit/Unit';
import CssWithoutValue from '../Errors/CssWithoutValue';
import MediaOrientation from './MediaOrientation';
import BaseMediaQueryCss, {MediaQueryStructVal} from './BaseMediaQueryCss';




export default class MediaQueryCss extends BaseMediaQueryCss
{


    constructor() {
        super();
        var defaultVal = new MediaQueryStructVal()
        defaultVal.mediaType = MediaQueryStructVal.DEFAULT_MEDIA_TYPE()
        defaultVal.featureVal = MediaQueryStructVal.DEFAULT_MEDIA_SIZE
        defaultVal.featureValUnit = MediaQueryStructVal.DEFAULT_MEDIA_SIZE_UNIT
        this.values.push(defaultVal)
    }
}
