import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import BaseComputedPropertyManager from '../computedPropertyManagers/BaseComputedPropertyManager'
import { BackgroundAttachment, BackgroundColor, BackgroundImage, BackgroundPosition, BackgroundRepeat, BackgroundSize } from '~/src/Css';
import AbstractManageComponent from './AbstractManageComponent';
import BackgroundColorProperty from '../computedPropertyManagers/impl/ComputedProperty/Background/BackgroundColorProperty'
import BackgroundImageProperty from '../computedPropertyManagers/impl/ComputedProperty/Background/BackgroundImageProperty'
import BackgroundPositionProperty from '../computedPropertyManagers/impl/ComputedProperty/Background/BackgroundPositionProperty'
import BackgroundRepeatProperty from '../computedPropertyManagers/impl/ComputedProperty/Background/BackgroundRepeatProperty'
import BackgroundSizeProperty from '../computedPropertyManagers/impl/ComputedProperty/Background/BackgroundSizeProperty'
import BackgroundAttachmentProperty from '../computedPropertyManagers/impl/ComputedProperty/Background/BackgrountAttachmentProperty'


export default abstract class BackgroundManage extends AbstractManageComponent
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

    init(val: HtmlTag){
        super.init(val)

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