import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import AbstractModal from '../AbstractModal'
import BaseComputedPropertyManager from '../computedPropertyManagers/BaseComputedPropertyManager'
import { FontWeight } from '~/src/Css';
import TextAlign from '../../src/Css/Text/TextAlign';
import FontSize from '../../src/Css/Text/FontSize';
import FontColor from '../../src/Css/Text/FontColor';
import FontStyle from '../../src/Css/Text/FontStyle';
import TextAlignProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/TextAlignProperty'
import FontSizeProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontSizeProperty'
import FontColorProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontColorProperty'
import FontWeightProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontWeightProperty'
import FontStyleProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontStyleProperty'
import FontStretch from '../../src/Css/Text/FontStretch';
import LineHeight from '../../src/Css/Text/LineHeight';
import LineHeightProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/LineHeightProperty'
import FontStretchProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontStretchProperty'
import FontFamilyProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontFamilyProperty'
import AbstractManageComponent from './AbstractManageComponent';
import TransformStyle from '../../src/Css/ThreeDimensional/TransformStyle';
import TransformStyleProperty from '../computedPropertyManagers/impl/ComputedProperty/ThreeDimensional/TransformStyleProperty';
import BackfaceVisibility from '../../src/Css/ThreeDimensional/BackfaceVisibility';
import BackfaceVisibilityProperty from '../computedPropertyManagers/impl/ComputedProperty/ThreeDimensional/BackfaceVisibilityProperty';
import Perspective from '../../src/Css/ThreeDimensional/Perspective';
import PerspectiveProperty from '../computedPropertyManagers/impl/ComputedProperty/ThreeDimensional/PerspectiveProperty';
import PerspectiveOrigin from '../../src/Css/ThreeDimensional/PerspectiveOrigin';
import PerspectiveOriginProperty from '../computedPropertyManagers/impl/ComputedProperty/ThreeDimensional/PerspectiveOriginProperty';


export default abstract class ThreeDimensionalManage extends AbstractManageComponent
{
    transformStyleManager: BaseComputedPropertyManager<TransformStyle>
    backfaceVisibilityManager: BaseComputedPropertyManager<BackfaceVisibility>
    perspectiveManager: BaseComputedPropertyManager<Perspective>
    perspectiveOriginManager: BaseComputedPropertyManager<PerspectiveOrigin>



    constructor()
    {
        super()
        this.transformStyleManager = new TransformStyleProperty()
        this.backfaceVisibilityManager = new BackfaceVisibilityProperty()
        this.perspectiveManager = new PerspectiveProperty()
        this.perspectiveOriginManager = new PerspectiveOriginProperty()


    }

    init(val: HtmlTag){
        super.init(val)
        // this.paddingRealFetcher = this.value.paddingRealFetcher
        // this.marginRealFetcher = this.value.marginRealFetcher
        // this.borderRealFetcher = this.value.borderRealFetcher

        this.transformStyleManager.setHtmlEl(val)
        this.backfaceVisibilityManager.setHtmlEl(val)
        this.perspectiveManager.setHtmlEl(val)
        this.perspectiveOriginManager.setHtmlEl(val)


        // this.paddingManager.setFetcher(this.paddingRealFetcher)
        // this.marginManager.setFetcher(this.marginRealFetcher)
        // this.borderManager.setFetcher(this.borderRealFetcher)

        this.transformStyleManager.init()
        this.backfaceVisibilityManager.init()
        this.perspectiveManager.init()
        this.perspectiveOriginManager.init()


     
    }
}