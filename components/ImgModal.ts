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
import SrcAttr from '../src/Attribute/html/SrcAttr';
import HtmlAttrManager from './computedPropertyManagers/HtmlAttrManager'
import SrcManager from './computedPropertyManagers/htmlAttr/SrcManager'
import { CustomAttr } from '~/src/Attribute'
import CustomAttrManager from './computedPropertyManagers/htmlAttr/CustomAttrManager'


export default abstract class ImgModal extends AbstractModal
{

    imgSrcManager: SrcManager

    constructor()
    {
        super()
        this.imgSrcManager = new SrcManager()
    }

    show(val: HtmlTag){
        super.show(val)

        this.imgSrcManager.setHtmlEl(val)   

        this.managers = []
        this.managers.push(this.imgSrcManager)


    }

    protected init(manager: HtmlAttrManager<any>) {
        manager.setHtmlEl(this.value)
        manager.init()

        this.managers.push(manager)
    }

    public reinit() {
        this.managers = []
        this.init(this.imgSrcManager)
        // this.init(this.customAttrManager)

        // console.log('ASDASD');
        // console.log(this.value.attributeAccessor.getAll());
        
        for (const attr of this.value.attributeAccessor.getAll()) {
            if (attr instanceof CustomAttr) {
                var c = new CustomAttrManager()
                c.attr = attr
                this.init(c)

            }
        }
    }

    
}