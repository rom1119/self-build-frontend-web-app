import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import MoveEventController from '~/src/MoveEventController'
import DefaultMoveEventController from '../src/Controller/DefaultMoveEventController';
import UnitSize from '~/src/Unit/UnitSize'
import Unit from '../src/Unit/Unit';
import AbstractModal from './AbstractModal'
import Pixel from '~/src/Unit/Size/Pixel'
import BasePaddingCss from '~/src/Css/BoxModel/BasePaddingCss'
import PaddingLeftCss from '~/src/Css/BoxModel/Padding/PaddingLeftCss'
import PaddingCss from '~/src/Css/BoxModel/Padding/PaddingCss'
import FetcherRealCssProp from '~/src/FetcherRealCssProp'
import PaddingRightCss from '~/src/Css/BoxModel/Padding/PaddingRightCss'
import PaddingTopCss from '~/src/Css/BoxModel/Padding/PaddingTopCss'
import PaddingBottomCss from '~/src/Css/BoxModel/Padding/PaddingBottomCss'
import BaseMarginCss from '~/src/Css/BoxModel/BaseMarginCss'
import MarginLeftCss from '~/src/Css/BoxModel/Margin/MarginLeftCss'
import MarginRightCss from '~/src/Css/BoxModel/Margin/MarginRightCss'
import MarginTopCss from '~/src/Css/BoxModel/Margin/MarginTopCss'
import MarginBottomCss from '~/src/Css/BoxModel/Margin/MarginBottomCss'
import MarginCss from '~/src/Css/BoxModel/Margin/MarginCss'
import DirectionComputedPropertyManager from './computedPropertyManagers/DirectionComputedPropertyManager'
import PaddingComputedPropertyManager from './computedPropertyManagers/impl/PaddingComputedPropertyManager';
import MarginComputedPropertyManager from './computedPropertyManagers/impl/MarginComputedPropertyManager'
import BorderComputedPropertyManager from './computedPropertyManagers/impl/BorderComputedPropertyManager'
import BaseBorderCss from '~/src/Css/Border/BaseBorderCss'
import BorderFetcherRealCssProp from '~/src/BorderFetcherRealCssProp'
import BackgroundImageProperty from './computedPropertyManagers/impl/ComputedProperty/Background/BackgroundImageProperty'
import BaseComputedPropertyManager from './computedPropertyManagers/BaseComputedPropertyManager'
import { BackgroundImage } from '~/src/Css'
import BackgroundColor from '../src/Css/Background/BackgroundColor';
import BackgroundColorProperty from './computedPropertyManagers/impl/ComputedProperty/Background/BackgroundColorProperty'


export default abstract class BackgroundModal extends AbstractModal
{

    backgroundImageManager: BaseComputedPropertyManager<BackgroundImage>
    backgroundColorManager: BaseComputedPropertyManager<BackgroundColor>

    constructor()
    {
        super()
        this.backgroundImageManager = new BackgroundImageProperty()
        this.backgroundColorManager = new BackgroundColorProperty()
    }

    show(val: HtmlTag){
        super.show(val)

        this.backgroundImageManager.setHtmlEl(val)
        this.backgroundColorManager.setHtmlEl(val)

        this.backgroundImageManager.init()   
        this.backgroundColorManager.init()   

    }

    
}