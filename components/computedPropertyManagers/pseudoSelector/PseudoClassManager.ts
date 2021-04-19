import Unit from "~/src/Unit/Unit";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import HtmlTag from "~/src/Layout/HtmlTag";
import Pixel from "~/src/Unit/Size/Pixel";
import DirectionComputedPropertyManager, { DirectionsProperty } from "../DirectionComputedPropertyManager";
import BaseBorderCss from "~/src/Css/Border/BaseBorderCss";
import _ from 'lodash'
import FetcherRealCssProp from '../../../src/FetcherRealCssProp';
import BorderLeftCss from "~/src/Css/Border/Left/BorderLeftCss";
import BorderRightCss from "~/src/Css/Border/Right/BorderRightCss";
import BorderTopCss from "~/src/Css/Border/Top/BorderTopCss";
import BorderBottomCss from "~/src/Css/Border/Bottom/BorderBottomCss";
import BorderCss from "~/src/Css/Border/Global/BorderGlobalCss";
import MarginSizeCalculator from "~/src/Calculator/Size/MarginSizeCalculator";
import MarginOffsetSizeCalculator from "~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator";
import BorderSizeCalculator from "~/src/Calculator/Size/BorderSizeCalculator";
import BorderOffsetSizeCalculator from "~/src/Calculator/OffsetSize/BorderOffsetSizeCalculator";
import { Named } from "~/src/Unit";
import BorderFetcherRealCssProp from "~/src/BorderFetcherRealCssProp";
import BaseBorderRadiusCss from "~/src/Css/Border/BaseBorderRadiusCss";
import BorderRadiusBottomLeft from "~/src/Css/Border/Radius/BorderRadiusBottomLeft";
import BorderRadiusBottomRight from "~/src/Css/Border/Radius/BorderRadiusBottomRight";
import BorderRadiusTopRight from "~/src/Css/Border/Radius/BorderRadiusTopRight";
import BorderRadiusTopLeft from "~/src/Css/Border/Radius/BorderRadiusTopLeft";
import BorderRadiusGlobal from "~/src/Css/Border/Radius/BorderRadiusGlobal";
import BorderRecalculate from '../../../src/Recalculator/HtmlTagImpl/BorderRecalculate';
import HtmlTagRecalculator from '../../../src/Recalculator/HtmlTagRecalculator';
import MarginRecalculate from "~/src/Recalculator/HtmlTagImpl/MarginRecalculate";
import Hover from '../../../src/PseudoSelector/PseudoClass/Hover';
import PseudoSelector from '../../../src/PseudoSelector/PseudoSelector';
import PseudoClass from "~/src/PseudoSelector/PseudoClass";
import BaseMediaQueryComponent from '../../BaseMediaQueryComponent';

export default class PseudoClassManager
{
    protected value: HtmlTag

    readonly
    pseudoClass: PseudoClass

    constructor( arg: PseudoClass )
    {
        this.pseudoClass = arg
        // @ts-ignore
        this.value = arg.owner
    }

    // public setHtmlEl(val: HtmlTag)
    // {
    //     this.value = val
    // }

    // public setSelector(val: PseudoClass)
    // {
    //     this.pseudoClass = val
    // }




    protected getPropertyCssFromModel(prop: string): PseudoClass
    {
        if (!this.value) {
            return null
        }
        return <PseudoClass>this.value.pseudoClassAccessor.getSelectorByName(prop)
    }

    protected setTmpPropertyToModel(newCssProp: BasePropertyCss)
    {
        if (!this.value) {
            return false
        }
        if (!this.value.tmpCssAccessor.hasCssProperty(newCssProp.getName())) {
            this.value.tmpCssAccessor.addNewProperty(newCssProp)
        } else {
            this.value.tmpCssAccessor.setNewPropertyValue(newCssProp.getName(), newCssProp)

        }
        // this.value.updateModelComponent()

    }


    private initProperty(propertyArg: PseudoClass): PseudoClass
    {
        var prop: PseudoClass = <PseudoClass> this.getPropertyCssFromModel(propertyArg.getName())
        if (prop) {
            propertyArg = prop
            propertyArg.setActive(true)

            return prop
        }

        propertyArg.setActive(false)
        let copy = _.cloneDeep(propertyArg)
        propertyArg = copy
        this.setTmpPropertyToModel(copy)

        return propertyArg

    }
    init() {
        this.pseudoClass  = this.initProperty(this.pseudoClass)

    }


    activateSelector() {
        var prop = this.pseudoClass

        // this.pseudoClass.id = null
        this.pseudoClass.selectedByOwner = true
        // console.log(this.pseudoClass);
        this.value.pseudoClassAccessor.selectedSelector = this.pseudoClass

        // this.value.recalculateRealComputedProperties()

    }

    deactivateSelector() {
        var prop = this.pseudoClass

        // this.pseudoClass.id = null
        this.pseudoClass.selectedByOwner = false
        console.log(this.pseudoClass);
        this.value.pseudoClassAccessor.selectedSelector = null

        // this.value.recalculateRealComputedProperties()


    }

    addSelector()
    {
        var prop = this.pseudoClass

        if (this.value.pseudoClassAccessor.getSelectorById(prop.id)) {
            return

        }
        console.log('activr');
        prop.setApi(this.value.api)
        prop.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)

        this.value.api.appendSelector(prop).then(
            () => {
                this.value.pseudoClassAccessor.addNewSelector(prop)


                this.value.synchronize()
                this.value.recalculateRealComputedProperties()

                this.value.notifyPositionalTag()
            },
            () => {
                console.error('Problem API width append selector');

            }
        )

        return prop
    }

    removeSelector() {
        var prop = this.pseudoClass


        this.value.api.deleteSelector(prop).then(
            () => {
                this.value.pseudoClassAccessor.removeById(prop.id)

                if (this.value.pseudoClassAccessor.selectedSelector) {
                    if (this.value.pseudoClassAccessor.selectedSelector.id == prop.id) {
                        this.value.pseudoClassAccessor.selectedSelector = null
                    }
                }
                prop.id = null
                prop.active = false
                this.value.synchronize()
                this.value.recalculateRealComputedProperties()

                this.value.notifyPositionalTag()
            },
            () => {
                console.error('Problem API width delete selector');

            }
        )



        return null
    }





}
