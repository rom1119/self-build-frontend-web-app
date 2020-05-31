import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import ResponseFromModel from "../ResponseFromModel";
import StyleCssValueResponse from "~/types/response/StyleCssValueResponse";

export default class StyleCssModelBuildResponse implements ResponseFromModel<StyleCssModel, StyleCssResponse>{

    build(from: StyleCssModel ): StyleCssResponse {
        let response = new StyleCssResponse()
        response.id = from.id
        response.name = from.getKey()
        response.value = from.getValue()
        response.unitName = from.getUnitName()
        response.valueSecond = from.getValueSecond()
        response.valueThird = from.getValueThird()
        response.unitNameSecond = from.getUnitNameSecond()
        response.unitNameThird = from.getUnitNameThird()
        response.resourceUrl = from.getResourceUrl()

        var values = []
        if (from.isMultiple()) {
            response.multipleValue = true
            for (const cssValModel of from.getValues()) {
                let responseCssValue = new StyleCssValueResponse()
                responseCssValue.id = cssValModel.id
                responseCssValue.inset = cssValModel.getInset()
                responseCssValue.value = cssValModel.getValue()
                responseCssValue.valueSecond = cssValModel.getValueSecond()
                responseCssValue.valueThird = cssValModel.getValueThird()
                responseCssValue.valueFourth = cssValModel.getValueFourth()
                responseCssValue.valueFifth = cssValModel.getValueFifth()
                responseCssValue.unitName = cssValModel.getUnitName()
                responseCssValue.unitNameSecond = cssValModel.getUnitNameSecond()
                responseCssValue.unitNameThird = cssValModel.getUnitNameThird()
                responseCssValue.unitNameFourth = cssValModel.getUnitNameFourth()
                responseCssValue.unitNameFifth = cssValModel.getUnitNameFifth()
                responseCssValue.resourcePath = cssValModel.getResourcePath()

                values.push(responseCssValue)
            }

            response.cssValues = values
        }
        // response.resourcePath = from.getResourcePath()
        
        return response;
    }

}
