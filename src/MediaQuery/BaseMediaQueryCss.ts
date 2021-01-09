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


export class MediaQueryStructVal implements CssValue {
    id

    public static DEFAULT_MEDIA_SIZE = 500
    public static DEFAULT_MEDIA_SIZE_UNIT = new Pixel()

    public static DEFAULT_MEDIA_FEATURE = MediaFeature.NEW_MAX_WIDTH
    public static DEFAULT_MEDIA_TYPE = MediaType.NEW_SCREEN
    public static DEFAULT_MEDIA_QUERY_OPERATOR = MediaQueryOperator.NEW_ONLY


    protected _orientation: MediaOrientation

    protected _featureVal: number
    protected _featureValUnit: Unit

    protected _mediaFeature: MediaFeature
    protected _mediaType: MediaType
    protected _mediaQueryOperator: MediaQueryOperator


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

    getOrientationValue(): string {
        return this._orientation.getValue()
    }

    getFullValue(): string
    {
        var res = ''

        if (this.getMediaQueryOperatorValue()) {
            res += `${this.getMediaQueryOperatorValue()}`
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
        res += `: `


        if (this.getOrientationValue()) {
            res += `and`
            res += ` (`
            res += `orientation: ${this.getOrientationValue()}`

            res += ` (`

        }


        if (res.trim().length == 0) {
            throw new CssWithoutValue('MediaQueryStructVal without set val')
        }
        return res
    }

}


export default abstract class BaseMediaQueryCss implements CssMultipleValue<MediaQueryStructVal>
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

    public synchronize()
    {
        if (this.synchronizer) {
            this.synchronizer.synchronize()
        }
    }
}
