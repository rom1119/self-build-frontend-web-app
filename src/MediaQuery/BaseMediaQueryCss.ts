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
import MediaQueryApiService from '../Api/MediaQueryApiService';
import MediaQuerySynchronizer from '../Synchronizer/Impl/MediaQuerySynchronizer';
import Named from "~/src/Unit/Named";
import UnitColor from "~/src/Unit/UnitColor";
import {reject} from "~/node_modules/@types/q";
import CssOwner from '../CssOwner';


export class MediaQueryStructVal implements CssValue {
    id

    public static DEFAULT_MEDIA_SIZE = 500
    public static DEFAULT_MEDIA_SIZE_UNIT = new Pixel()

    public static DEFAULT_MEDIA_FEATURE = MediaFeature.NEW_MAX_WIDTH()
    public static DEFAULT_MEDIA_TYPE = MediaType.NEW_SCREEN()
    public static DEFAULT_MEDIA_QUERY_OPERATOR = MediaQueryOperator.NEW_AND()
    public static DEFAULT_MEDIA_QUERY_OPERATOR_FIRST = MediaQueryOperator.NEW_ONLY()


    protected _orientation: MediaOrientation

    protected _featureVal: number
    protected _featureValUnit: Unit

    protected _mediaFeature: MediaFeature
    protected _mediaType: MediaType
    protected _mediaQueryOperator: MediaQueryOperator
    protected _mediaQueryOperatorFirst: MediaQueryOperator


    getId(): number {
        return this.id
    }
    set orientation(val)
    {
        Vue.set(this, '_orientation', val)
    }

    get orientation()
    {
        return this._orientation
    }

    set mediaFeature(val)
    {
        Vue.set(this, '_mediaFeature', val)
    }

    get mediaFeature()
    {
        return this._mediaFeature
    }

    set mediaType(val)
    {
        Vue.set(this, '_mediaType', val)
    }

    get mediaType()
    {
        return this._mediaType
    }


    set mediaQueryOperator(val)
    {
        Vue.set(this, '_mediaQueryOperator', val)

    }

    get mediaQueryOperator()
    {
        return this._mediaQueryOperator
    }

    set mediaQueryOperatorFirst(val)
    {
        Vue.set(this, '_mediaQueryOperatorFirst', val)

    }

    get mediaQueryOperatorFirst()
    {
        return this._mediaQueryOperatorFirst
    }

    set featureVal(val)
    {
        Vue.set(this, '_featureVal', val)

    }

    get featureVal()
    {
        return this._featureVal
    }

    set featureValUnit(val)
    {
        Vue.set(this, '_featureValUnit', val)

    }

    get featureValUnit()
    {
        return this._featureValUnit
    }

    getFeatureValue(): string {
        if (this._featureValUnit) {
            return this._featureValUnit.getValue(this._featureVal)

        }

        return ''
    }

    getMediaFeatureValue(): string {
        if (this._mediaFeature) {
            return this._mediaFeature.getValue()

        }

        return ''
    }

    getMediaTypeValue(): string {
        return this._mediaType.getValue()
    }

    getMediaQueryOperatorValue(): string {
        return this._mediaQueryOperator.getValue()
    }

    getMediaQueryOperatorFirstValue(): string {
        return this._mediaQueryOperatorFirst.getValue()
    }

    getOrientationValue(): string {
        return this._orientation.getValue()
    }

    getFullValue(): string
    {
        var res = ''

        if (this.mediaQueryOperatorFirst) {
            res += `${this.getMediaQueryOperatorFirstValue()}`
        }

        if (this.getMediaTypeValue()) {
            res += ` ${this.getMediaTypeValue()}`
        }

        if (this.getMediaQueryOperatorValue()) {
            res += ` ${this.getMediaQueryOperatorValue()}`
        }

        res += ` (`
        res += `${this.getMediaFeatureValue()}`
        res += `: ${this.getFeatureValue()}`
        res += `)`


        if (this.orientation) {
            res += `and`
            res += ` (`
            res += `orientation: ${this.getOrientationValue()}`

            res += ` )`

        }




        if (res.trim().length == 0) {
            throw new CssWithoutValue('MediaQueryStructVal without set val')
        }
        return res
    }

}


export default abstract class BaseMediaQueryCss implements CssMultipleValue<MediaQueryStructVal>, CssOwner
{

    id
    projectId
    name = 'sm'
    color: any = 'red'
    colorUnit: UnitColor = new Named()
    version
    values: MediaQueryStructVal[] = []
    selectors: PseudoSelector[] = []
    tags: HtmlTag[] = []

    isSelected = false

    api: MediaQueryApiService
    synchronizer: MediaQuerySynchronizer


    activate() {
        this.isSelected = true
    }

    deactivate() {
        this.isSelected = false
    }

    public setApi(api: MediaQueryApiService)
    {
        this.api = api
        this.synchronizer = new MediaQuerySynchronizer(this, api)
    }

    public getColorValue()
    {
        if (!this.colorUnit) {
            return 'red'
        }

        return this.colorUnit.getValue(this.color)
    }

    get selectorsList() : any
    {
        let pseudoSelectors = {}

        for (const element of this.selectors) {

            pseudoSelectors[element.value] = element.cssAccessor.all

        }

        for (const tag of this.tags) {

            pseudoSelectors[tag.selectorLiteral] = tag.cssAccessor.all

        }

        // console.log('COMP-SELECTORS');
        // console.log(pseudoSelectors);

        return pseudoSelectors
    }

    getValueByIndex(index: number): MediaQueryStructVal {
        return this.values[index]
    }

    getValues(): MediaQueryStructVal[] {
        return this.values
    }
    addValue(val: MediaQueryStructVal) {
        Vue.set(this.values, this.values.length, val)

        // this.values.push(val)
    }
    removeValue(val: MediaQueryStructVal) {
        throw new Error("Method not implemented.");
    }

    getValue(): string
    {
        if (this.values.length == 0) {
            throw new CssWithoutValue(`Media Query ID ${this.id} not have value` )
        }
        // if (this.values[0].toString().length < 1) {
        //     throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )

        // }
        var val = '@media '
        // if (this.direction) {
        //     if (this.direction.getFullValue().trim().length > 0) {
        //         val += this.direction.getFullValue() + ', '
        //     }
        //
        // }

        this.values.forEach((element, key) => {
            val += element.getFullValue()
            if (key < this.values.length - 1) {
                val += ', '
            }
        });


        return val
    }

    public synchronize()
    {
        if (this.synchronizer) {
            this.synchronizer.synchronize()
        }
    }

    private savePromise() : Promise<any>
    {

        return this.api.appendMedia(this, this.projectId)
    }

    public saveApi()
    {

            // this.setAsNowReadyToSynchronize()
        return new Promise((resolve, reject) => {

            this.savePromise().then(
                (res) => {
                    // console.log('success');
                    // console.log(res);
                    var resValues = res.data.cssValues
                    this.id = res.data.id
                    // this.updateCssIds(res.data.cssStyleList, this.model.cssAccessor.all)
                    if (typeof this.values === 'function') {
                        // @ts-ignore
                        for (var i = 0; i < this.model.getValues().length; i++) {

                            // console.log(cssRes);
                            // console.log(cssDomain);

                            // @ts-ignore
                            const cssValDomain = cssDomain.getValues()[i]
                            cssValDomain.id = resValues[i].id
                        }

                    }

                    resolve(res)


                },
                (arg) => {
                    reject()
                    // console.log('error');
                    // console.log(arg);


                }
            )

        } )

    }
}
