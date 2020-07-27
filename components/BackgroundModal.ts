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
import { BackgroundImage, BackgroundPosition, BackgroundSize, BackgroundRepeat, BackgroundAttachment } from '~/src/Css'
import BackgroundColor from '../src/Css/Background/BackgroundColor';
import BackgroundColorProperty from './computedPropertyManagers/impl/ComputedProperty/Background/BackgroundColorProperty'
import BackgroundPositionProperty from './computedPropertyManagers/impl/ComputedProperty/Background/BackgroundPositionProperty'
import BackgroundSizeProperty from './computedPropertyManagers/impl/ComputedProperty/Background/BackgroundSizeProperty'
import BackgroundAttachmentProperty from './computedPropertyManagers/impl/ComputedProperty/Background/BackgrountAttachmentProperty'
import BackgroundRepeatProperty from './computedPropertyManagers/impl/ComputedProperty/Background/BackgroundRepeatProperty'


export default abstract class BackgroundModal extends AbstractModal
{

    backgroundImageManager: BaseComputedPropertyManager<BackgroundImage>
    backgroundColorManager: BaseComputedPropertyManager<BackgroundColor>
    backgroundPositionManager: BaseComputedPropertyManager<BackgroundPosition>
    backgroundSizeManager: BaseComputedPropertyManager<BackgroundSize>
    backgroundRepeatManager: BaseComputedPropertyManager<BackgroundRepeat>
    backgroundAttachmentManager: BaseComputedPropertyManager<BackgroundAttachment>

    constructor()
    {
        super()
        this.backgroundImageManager = new BackgroundImageProperty()
        this.backgroundColorManager = new BackgroundColorProperty()
        this.backgroundPositionManager = new BackgroundPositionProperty()
        this.backgroundSizeManager = new BackgroundSizeProperty()
        this.backgroundRepeatManager = new BackgroundRepeatProperty()
        this.backgroundAttachmentManager = new BackgroundAttachmentProperty()
    }

    show(val: HtmlTag){
        super.show(val)

        this.backgroundImageManager.setHtmlEl(val)
        this.backgroundColorManager.setHtmlEl(val)
        this.backgroundPositionManager.setHtmlEl(val)
        this.backgroundSizeManager.setHtmlEl(val)
        this.backgroundRepeatManager.setHtmlEl(val)
        this.backgroundAttachmentManager.setHtmlEl(val)

        this.backgroundImageManager.init()   
        this.backgroundColorManager.init()   
        this.backgroundPositionManager.init()   
        this.backgroundSizeManager.init()   
        this.backgroundRepeatManager.init()   
        this.backgroundAttachmentManager.init()   

        this.managers = []
        this.managers.push(this.backgroundImageManager)
        this.managers.push(this.backgroundColorManager)
        this.managers.push(this.backgroundPositionManager)
        this.managers.push(this.backgroundSizeManager)
        this.managers.push(this.backgroundRepeatManager)
        this.managers.push(this.backgroundAttachmentManager)


    }

    
}