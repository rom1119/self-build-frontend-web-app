import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import ResponseFromModel from "../ResponseFromModel";
import StyleCssValueResponse from "~/types/response/StyleCssValueResponse";
import KeyFrameModel from "~/types/KeyframeModel";
import KeyFrameResponse from "~/types/response/KeyFrameResponse";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModel from "~/types/SelectorModel";
import SelectorModelBuildResponse from "./SelectorModelBuildResponse";
import HtmlTagResponse from "~/types/response/HtmlTagResponse";
import HtmlTagModel from "~/types/HtmlTagModel";
import HtmlTagModelBuildResponse from "./HtmlTagModelBuildResponse";
import MediaQueryResponse from "~/types/response/MediaQueryResponse";
import MediaQueryModel from "~/types/MediaQueryModel";

export default class MediaQueryModelBuildResponse implements ResponseFromModel<MediaQueryModel, MediaQueryResponse>{

    protected selectorModelBuilderResponse: ResponseFromModel<SelectorModel, SelectorResponse>
    protected tagModelBuilderResponse: ResponseFromModel<HtmlTagModel, HtmlTagResponse>

    constructor()
    {

        this.selectorModelBuilderResponse = new SelectorModelBuildResponse()
        this.tagModelBuilderResponse = new HtmlTagModelBuildResponse()
    }

    build(from: MediaQueryModel ): MediaQueryResponse {
        let response = new MediaQueryResponse()
        response.id = from.id
        response.name = from.name
        response.version = from.version
        response.color = from.color
        response.colorUnitName = from.colorUnitName
        response.project = {
            "id": from.projectId,
            "version": 1
        }

        var values = []
        for (const cssValModel of from.values) {
            let responseCssValue = new StyleCssValueResponse()
            responseCssValue.id = cssValModel.id
            // responseCssValue.inset = cssValModel.getInset()
            // responseCssValue.specialValGradient = cssValModel.getSpecialValGradient()
            responseCssValue.value = cssValModel.getValue()
            responseCssValue.valueSecond = cssValModel.getValueSecond()
            responseCssValue.valueThird = cssValModel.getValueThird()
            responseCssValue.valueFourth = cssValModel.getValueFourth()
            responseCssValue.valueFifth = cssValModel.getValueFifth()
            responseCssValue.valueSixth = cssValModel.getValueSixth()
            responseCssValue.unitName = cssValModel.getUnitName()
            responseCssValue.unitNameSecond = cssValModel.getUnitNameSecond()
            responseCssValue.unitNameThird = cssValModel.getUnitNameThird()
            responseCssValue.unitNameFourth = cssValModel.getUnitNameFourth()
            responseCssValue.unitNameFifth = cssValModel.getUnitNameFifth()
            responseCssValue.unitNameSixth = cssValModel.getUnitNameSixth()
            responseCssValue.resourcePath = cssValModel.getResourcePath()

            values.push(responseCssValue)
        }

        response.cssValues = values

        var selectors = []
        // for (const cssValModel of from.selectors) {
        //     let responseCssValue = this.selectorModelBuilderResponse.build(cssValModel)
        //     selectors.push(responseCssValue)
        // }

        // response.selectors = selectors

        var tags = []
        // for (const tagM of from.tags) {
        //     let t = this.tagModelBuilderResponse.build(tagM)
        //     tags.push(t)
        // }

        // response.tags = tags


        return response;
    }

}
