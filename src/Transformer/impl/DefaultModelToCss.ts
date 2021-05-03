import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
import ModelToDomain from '../ModelToDomain';
import HtmlTagFactoryFromName from '~/src/Layout/HtmlTagFactoryFromName';
import ModelToCss from '../ModelToCss';
import BasePropertyCss from '../../Css/BasePropertyCss';
import StyleCss from '~/src/Api/StyleCss';
import CssPropertyFactoryFromName from '~/src/Factory/CssPropertyFactoryFromName';
import UnitCssPropertyFactoryFromName from '~/src/Factory/UnitCssPropertyFactoryFromName';
import CssDoubleValue from '~/src/Css/CssDoubleValue';
import CssTripleValue from '~/src/Css/CssTripleValue';
import BaseBorderCss from '~/src/Css/Border/BaseBorderCss';
import RGBA from '../../Unit/Color/RGBA';
import CssResource from '~/src/Css/CssResource';
import TextShadowCss, { TextShadowStruct } from '~/src/Css/Shadow/TextShadowCss';
import CssMultipleValue from '~/src/Css/CssMultipleValue';
import RGB from '~/src/Unit/Color/RGB';
import BoxShadowCss, { BoxShadowStruct } from '~/src/Css/Shadow/BoxShadowCss';
import StyleCssModel from '~/types/StyleCssModel';
import TransitionCss, { TransitionStruct } from '~/src/Css/Animation/TransitionCss';
import TimingFunctionFactoryFromName from '~/src/Factory/TimingFunctionFactoryFromName';
import { BackgroundImage } from '~/src/Css';
import BaseGradientCss from '../../Css/Gradient/BaseGradientCss';
import { RadialGradientStructVal, RadialGradientDirection } from '~/src/Css/Gradient/impl/RadialGradientCss';
import { LinearGradientStructVal, LinearGradientDirection } from '~/src/Css/Gradient/impl/LinearGradientCss';
import LinearGradientCss from '../../Css/Gradient/impl/LinearGradientCss';
import StyleCssValue from '~/src/Api/StyleCssValue';
import RadialGradientCss from '../../Css/Gradient/impl/RadialGradientCss';
import FontFamilyValDomain from '../../Fonts/FontFamilyValDomain';
import FontFamily from '../../Css/Text/FontFamily';
import FontFaceAccessor from '~/src/Fonts/FontFaceAccessor';
import { AnimationCssStruct } from '../../Css/Animation/AnimationCss';
import KeyFrameAccessor from '../../Animation/KeyFrameAccessor';
import AnimationCss from '../../Css/Animation/AnimationCss';
export default class DefaultModelToCss implements ModelToCss
{

    private cssFactoryFromName: CssPropertyFactoryFromName
    private unitCssFactoryFromName: UnitCssPropertyFactoryFromName
    private timingFunctionFactoryFromName: TimingFunctionFactoryFromName
    // private styleTransformer: ModelToCss

    constructor()
    {
        this.cssFactoryFromName = new CssPropertyFactoryFromName()
        this.unitCssFactoryFromName = new UnitCssPropertyFactoryFromName()
        this.timingFunctionFactoryFromName = new TimingFunctionFactoryFromName()
        // this.styleTransformer = new HtmlTagFactoryFromName()
    }

    transform(model: StyleCss): BasePropertyCss {
        var domain = this.cssFactoryFromName.create(model.getKey())
        var unit = this.unitCssFactoryFromName.create(model.getUnitName())
        // console.log(domain);

        var val
        if (unit instanceof RGBA || unit instanceof RGB) {
            val = JSON.parse(model.getValue())
        } else {
            val = model.getValue()
        }
        domain.setValue(val)
        domain.setUnit(unit)
        domain.id = model.id
        domain.mediaQueryId = model.mediaQueryId

        if (domain instanceof BackgroundImage) {

            var domainCastBackground: BackgroundImage = <BackgroundImage><unknown>domain

            if (model.getChildren().length > 0) {
                for (const gradient of model.getChildren()) {
                    var child = <BaseGradientCss>this.transform(gradient)
                    domainCastBackground.getGradients().push(child)
                }


                // let unitBorder = this.unitCssFactoryFromName.create(model.getUnitName())
                // domainCastBorder.setWidth(Number(model.getValue()), unitBorder)
                // // console.log(unitBorder);

                // domainCastBorder.setUnit(unitBorder)

            }
            domain = domainCastBackground
            //@ts-ignore
            domainCastBackground.setResource(model.getResourcePath())
            //@ts-ignore
            domainCastBackground.setResourceUrl(model.getResourceUrl())
        }

        // @ts-ignore
        if (typeof domain.getWidth === 'function') {

            var domainCastBorder: BaseBorderCss = <BaseBorderCss><unknown>domain
            let unitBorder = this.unitCssFactoryFromName.create(model.getUnitName())
            domainCastBorder.setWidth(Number(model.getValue()), unitBorder)
            // console.log(unitBorder);

            domainCastBorder.setUnit(unitBorder)
            domain = domainCastBorder

        }

        // @ts-ignore
        if (typeof domain.getResource === 'function') {

            var domainResource: CssResource = <CssResource><unknown>domain
            domainResource.setResource(model.getResourcePath())

            domain = <BasePropertyCss><unknown>domainResource

        }

        // @ts-ignore
        if (typeof domain.getSecondValue === 'function') {
            var domainCast: CssDoubleValue = <CssDoubleValue><unknown>domain
            domainCast.setSecondValue(model.getValueSecond())
            let unitSecond = this.unitCssFactoryFromName.create(model.getUnitNameSecond())
            domainCast.setSecondUnit(unitSecond)

            domain = <BaseBorderCss>domainCast
        }

        // @ts-ignore
        if (typeof domain.getThirdValue === 'function') {
            var domainCastThird: CssTripleValue = <CssTripleValue><unknown>domain
            let unitThird = this.unitCssFactoryFromName.create(model.getUnitNameThird())
            var val
            // console.trace(model)
            if (unitThird instanceof RGBA || unitThird instanceof RGB) {
                val = JSON.parse(model.getValueThird())
            } else {
                val = model.getValueThird()
            }
            domainCastThird.setThirdValue(val)
            domainCastThird.setThirdUnit(unitThird)

            domain = <BaseBorderCss>domainCastThird

        }

        // @ts-ignore
        if (typeof domain.getValues === 'function') {

            var newDominShadow
            var newDominTransition
            var newDominGradient
            var newDominFontFamily
            var newDominAnimation
            newDominShadow = <BasePropertyCss><unknown>this.transformShadows(domain, model)
            newDominTransition = <BasePropertyCss><unknown>this.transformTransition(domain, model)
            newDominGradient = <BasePropertyCss><unknown>this.transformGradient(domain, model)
            newDominFontFamily = <BasePropertyCss><unknown>this.transformFontFamily(domain, model)
            newDominAnimation = <BasePropertyCss><unknown>this.transformAnimation(domain, model)
            if (newDominShadow) {
                domain = newDominShadow
            } else if (newDominTransition) {
                domain = newDominTransition
            } else if (newDominGradient) {
                domain = newDominGradient
            } else if (newDominFontFamily) {
                domain = newDominFontFamily
            } else if (newDominAnimation) {
                domain = newDominAnimation
            }
            // console.log('domain', domain);
            
            // model.setAsMultiple()
            // model.setValues(values)
            // model.setValueSecond(domainCast.getSecondValue())
            // model.setUnitNameSecond(domainCast.getSecondUnit().name)
        }

        return domain

    }

    private transformFontFamily(domain: BasePropertyCss, model: StyleCssModel)
    {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<FontFamilyValDomain>
        if (domain instanceof FontFamily) {
            domainCastMultiplyVal = <CssMultipleValue<FontFamilyValDomain>><unknown>domain
            domain.clearValue()
            // console.log('instanceOF TEXT_SHADOW TO-CSS');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            // console.log('modelTOCss');
            for (const valCss of model.getValues()) {
                let el = new FontFamilyValDomain(valCss.getValue(), valCss.getValueSecond())
                el.id = valCss.id
                el.fontFace = FontFaceAccessor.getFontByIdStatic(Number(valCss.getValueThird()))
                // console.log(el.id);
                // console.log(el.fontFace);


                domainCastMultiplyVal.addValue(el)
            }

            return domainCastMultiplyVal
        }
    }
    private transformShadows(domain: BasePropertyCss, model: StyleCssModel)
    {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<TextShadowStruct>
        var domainCastMultiplyValBoxShadow: CssMultipleValue<BoxShadowStruct>
        if (domain instanceof TextShadowCss) {
            domainCastMultiplyVal = <CssMultipleValue<TextShadowStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-CSS');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            for (const valCss of model.getValues()) {
                
                let el = new TextShadowStruct()
                    el.id = valCss.id
                    el.offsetX = parseInt(valCss.getValue())
                    el.offsetY = parseInt(valCss.getValueSecond())
                    el.blur = parseInt(valCss.getValueThird())

                    var unitOffX = this.unitCssFactoryFromName.create(valCss.getUnitName())
                    var unitOffY = this.unitCssFactoryFromName.create(valCss.getUnitNameSecond())
                    var unitBlur = this.unitCssFactoryFromName.create(valCss.getUnitNameThird())
                    var unitColor = this.unitCssFactoryFromName.create(valCss.getUnitNameFourth())

                    var val
                    if (unitColor instanceof RGBA || unitColor instanceof RGB) {
                        el.color = JSON.parse(valCss.getValueFourth())
                    } else {
                        el.color = valCss.getValueFourth()
                    }

                    el.offsetXUnit = unitOffX
                    el.offsetYUnit = unitOffY
                    el.blurUnit = unitBlur
                    el.colorUnit = unitColor
                    // console.log(el);


                    domainCastMultiplyVal.addValue(el)
            }

            return domainCastMultiplyVal

        } else if (domain instanceof BoxShadowCss) {
            domainCastMultiplyValBoxShadow = <CssMultipleValue<BoxShadowStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-CSS');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            for (const valCss of model.getValues()) {
                    
                let el = new BoxShadowStruct()
                    el.id = valCss.id
                    el.inset = valCss.getInset()
                    el.offsetX = parseInt(valCss.getValue())
                    el.offsetY = parseInt(valCss.getValueSecond())
                    el.blur = parseInt(valCss.getValueThird())
                    el.spread = parseInt(valCss.getValueFourth())

                    var unitOffX = this.unitCssFactoryFromName.create(valCss.getUnitName())
                    var unitOffY = this.unitCssFactoryFromName.create(valCss.getUnitNameSecond())
                    var unitBlur = this.unitCssFactoryFromName.create(valCss.getUnitNameThird())
                    var unitSpread = this.unitCssFactoryFromName.create(valCss.getUnitNameFourth())
                    var unitColor = this.unitCssFactoryFromName.create(valCss.getUnitNameFifth())

                    var val
                    if (unitColor instanceof RGBA || unitColor instanceof RGB) {
                        el.color = JSON.parse(valCss.getValueFifth())
                    } else {
                        el.color = valCss.getValueFifth()
                    }

                    el.offsetXUnit = unitOffX
                    el.offsetYUnit = unitOffY
                    el.blurUnit = unitBlur
                    el.spreadUnit = unitSpread
                    el.colorUnit = unitColor
                    // console.log(el)

                    domainCastMultiplyValBoxShadow.addValue(el)
            }

            return domainCastMultiplyValBoxShadow
        } else {
            // throw Error('Not implemented method transform CssValue for object ' + domain)
        }

    }

    private transformGradient(domain: BasePropertyCss, model: StyleCssModel)
    {
        var values = []
        var domainCastMultiplyVal: LinearGradientCss
        var domainCastMultiplyValBoxShadow: RadialGradientCss
        if (domain instanceof LinearGradientCss) {
            domainCastMultiplyVal = <LinearGradientCss><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-CSS');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            let direc = <LinearGradientDirection>domainCastMultiplyVal.direction
            var directionVal = this.findDirectionModel(model.getValues())
            if (directionVal) {
                direc.id = directionVal.id
                direc.direction = directionVal.getValue()
                direc.directionUnit = this.unitCssFactoryFromName.create(directionVal.getUnitName())

            }

            for (const valCss of model.getValues()) {
                if (valCss.getSpecialValGradient() === true) {
                    continue
                }
                let el = new LinearGradientStructVal()
                    el.id = valCss.id
                    el.size = parseInt(valCss.getValueSecond())

                    var unitSize = this.unitCssFactoryFromName.create(valCss.getUnitNameSecond())
                    var unitColor = this.unitCssFactoryFromName.create(valCss.getUnitName())

                    var val
                    if (unitColor instanceof RGBA || unitColor instanceof RGB) {
                        el.color = JSON.parse(valCss.getValue())
                    } else {
                        el.color = valCss.getValue()
                    }

                    el.sizeUnit = unitSize
                    el.colorUnit = unitColor
                    // console.log(el);


                    domainCastMultiplyVal.addValue(el)
            }

            return domainCastMultiplyVal

        } else if (domain instanceof RadialGradientCss) {
            domainCastMultiplyValBoxShadow = <RadialGradientCss><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-CSS');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            let direc = <RadialGradientDirection>domainCastMultiplyValBoxShadow.direction
            var directionVal = this.findDirectionModel(model.getValues())
            if (directionVal) {
                direc.id = directionVal.id
                direc.shape = directionVal.getValue()
                direc.size = directionVal.getValueSecond()
                direc.xPos = directionVal.getValueThird()
                direc.yPos = directionVal.getValueFourth()
                direc.shapeUnit = this.unitCssFactoryFromName.create(directionVal.getUnitName())
                direc.sizeUnit = this.unitCssFactoryFromName.create(directionVal.getUnitNameSecond())
                direc.xPosUnit = this.unitCssFactoryFromName.create(directionVal.getUnitNameThird())
                direc.yPosUnit = this.unitCssFactoryFromName.create(directionVal.getUnitNameFourth())

            }

            for (const valCss of model.getValues()) {
                if (valCss.getSpecialValGradient()) {
                    continue
                }
                let el = new RadialGradientStructVal()
                    el.id = valCss.id
                    el.size = parseInt(valCss.getValueSecond())

                    var unitSize = this.unitCssFactoryFromName.create(valCss.getUnitNameSecond())
                    var unitColor = this.unitCssFactoryFromName.create(valCss.getUnitName())

                    var val
                    if (unitColor instanceof RGBA || unitColor instanceof RGB) {
                        el.color = JSON.parse(valCss.getValue())
                    } else {
                        el.color = valCss.getValue()
                    }

                    el.sizeUnit = unitSize
                    el.colorUnit = unitColor
                    // console.log(el);


                    domainCastMultiplyValBoxShadow.addValue(el)
            }

            console.log('NEW_DOMAIN');
            console.log(domainCastMultiplyValBoxShadow);


            return domainCastMultiplyValBoxShadow
        } else {
            // throw Error('Not implemented method transform CssValue for object ' + domain)
        }

    }

    findDirectionModel(arg: StyleCssValue[]) : StyleCssValue {

        for (const model of arg) {
            if (model.getSpecialValGradient() === true) {
                return model
            }
        }

        return null
    }

    private transformAnimation(domain: BasePropertyCss, model: StyleCssModel) {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<AnimationCssStruct>
        if (domain instanceof AnimationCss) {
            domainCastMultiplyVal = <CssMultipleValue<AnimationCssStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-CSS');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            for (const valCss of model.getValues()) {
                valCss
                let el = new AnimationCssStruct()
                el.id = valCss.id
                el.keyFrame = KeyFrameAccessor.getByIdStatic(valCss.getValueNinth())

                el.duration = Number(valCss.getValueSecond())
                el.timingFunction = this.timingFunctionFactoryFromName.create(valCss.getValueThird())
                el.delay = Number(valCss.getValueFourth())
                el.iterationCount = valCss.getValueFifth()
                el.direction = valCss.getValueSixth()
                el.fillMode = valCss.getValueSeventh()
                el.playState = valCss.getValueEighth()

                var unitDuration = this.unitCssFactoryFromName.create(valCss.getUnitNameSecond())
                var unitDelay = this.unitCssFactoryFromName.create(valCss.getUnitNameFourth())
                // var unitBlur = this.unitCssFactoryFromName.create(valCss.getUnitNameThird())
                // var unitColor = this.unitCssFactoryFromName.create(valCss.getUnitNameFourth())

                el.durationUnit = unitDuration
                el.delayUnit= unitDelay
                // el.offsetYUnit = unitOffY
                // el.blurUnit = unitBlur
                // el.colorUnit = unitColor
                // console.log(el);


                domainCastMultiplyVal.addValue(el)
            }

            return domainCastMultiplyVal

        }
    }

    private transformTransition(domain: BasePropertyCss, model: StyleCssModel) {
        var values = []
        var domainCastMultiplyVal: CssMultipleValue<TransitionStruct>
        if (domain instanceof TransitionCss) {
            domainCastMultiplyVal = <CssMultipleValue<TransitionStruct>><unknown>domain
            // console.log('instanceOF TEXT_SHADOW TO-CSS');
            // console.log(domainCastMultiplyVal instanceof TextShadowCss);

            for (const valCss of model.getValues()) {
                valCss
                let el = new TransitionStruct()
                el.id = valCss.id
                if (valCss.getValue().toLowerCase() == 'all') {
                    el.all = true

                } else {
                    el.propertyName = valCss.getValue()

                }

                el.duration = Number(valCss.getValueSecond())
                el.timingFunction = this.timingFunctionFactoryFromName.create(valCss.getValueThird())
                el.delay = Number(valCss.getValueFourth())

                // var unitOffX = this.unitCssFactoryFromName.create(valCss.getUnitName())
                // var unitOffY = this.unitCssFactoryFromName.create(valCss.getUnitNameSecond())
                // var unitBlur = this.unitCssFactoryFromName.create(valCss.getUnitNameThird())
                // var unitColor = this.unitCssFactoryFromName.create(valCss.getUnitNameFourth())

                // el.offsetXUnit = unitOffX
                // el.offsetYUnit = unitOffY
                // el.blurUnit = unitBlur
                // el.colorUnit = unitColor
                // console.log(el);


                domainCastMultiplyVal.addValue(el)
            }

            return domainCastMultiplyVal

        }
    }
}
