import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssValue from "~/src/Api/StyleCssValue";
import KeyFrameResponse from "~/types/response/KeyFrameResponse";
import KeyFrameModel from "~/types/KeyframeModel";
import SelectorModelBuild from "./SelectorModelBuild";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModel from "~/types/SelectorModel";
import MediaQueryModel from "~/types/MediaQueryModel";
import MediaQueryResponse from "~/types/response/MediaQueryResponse";
import HtmlTagResponse from "~/types/response/HtmlTagResponse";
import HtmlTagModel from "~/types/HtmlTagModel";
import HtmlTagModelBuild from "./HtmlTagModelBuild";

export default class MediaQueryModelBuild implements ModelFromResponse<MediaQueryResponse, MediaQueryModel>{

    selectorBuilder: ModelFromResponse<SelectorResponse, SelectorModel>
    tagBuilder: ModelFromResponse<HtmlTagResponse, HtmlTagModel>

    constructor()
    {
        this.selectorBuilder = new SelectorModelBuild()
        this.tagBuilder = new HtmlTagModelBuild()
    }

    build(from: MediaQueryResponse): MediaQueryModel {
        let model = new MediaQueryModel()
        model.id = from.id
        model.name = from.name
        model.version = from.version


        if (from.project) {
            model.projectId = from.project.id

        }

        var values = []
        for (const cssValModel of from.values) {
            let cssValue = new StyleCssValue(cssValModel.value, cssValModel.unitName)
            cssValue.id = cssValModel.id
            // cssValue.setInset(cssValModel.inset)
            // cssValue.setSpecialValGradient(cssValModel.specialValGradient)
            cssValue.setValue(cssValModel.value)
            cssValue.setValueSecond(cssValModel.valueSecond)
            cssValue.setValueThird(cssValModel.valueThird)
            cssValue.setValueFourth(cssValModel.valueFourth)
            cssValue.setValueFifth(cssValModel.valueFifth)
            cssValue.setUnitName(cssValModel.unitName)
            cssValue.setUnitNameSecond(cssValModel.unitNameSecond)
            cssValue.setUnitNameThird(cssValModel.unitNameThird)
            cssValue.setUnitNameFourth(cssValModel.unitNameFourth)
            cssValue.setUnitNameFifth(cssValModel.unitNameFifth)
            cssValue.setResourcePath(cssValModel.resourcePath)

            values.push(cssValue)
        }

        model.values = values
        
        var sels = []
        for (const cssValModel of from.selectors) {
            let cssValue = this.selectorBuilder.build(cssValModel)
            
            sels.push(cssValue)
        }

        model.selectors = sels
        
        var tags = []
        for (const tagModel of from.tags) {
            let tag = this.tagBuilder.build(tagModel)
            
            tags.push(tag)
        }

        model.tags = tags



        return model;
    }

}
