import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssValue from "~/src/Api/StyleCssValue";

export default class StyleCssModelBuild implements ModelFromResponse<StyleCssResponse, StyleCssModel>{

    build(from: StyleCssResponse): StyleCssModel {
        let model = new StyleCssModel(from.name, from.value, from.unitName)
        model.id = from.id
        model.setValueSecond(from.valueSecond)
        model.setValueThird(from.valueThird)
        model.setUnitNameSecond(from.unitNameSecond)
        model.setUnitNameThird(from.unitNameThird)
        model.setResourcePath(from.resourcePath)
        model.setResourceUrl(from.resourceUrl)

        
        if (from.multipleValue) {
            var values = []
            model.setAsMultiple()
            for (const cssValModel of from.cssValues) {
                let cssValue = new StyleCssValue(cssValModel.value, cssValModel.unitName)
                cssValue.id = cssValModel.id
                cssValue.setInset(cssValModel.inset)
                cssValue.setSpecialValGradient(cssValModel.specialValGradient)
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

            model.setValues(values)
        }

        if (from.children) {
            for (const childFrom of from.children) {
                var child = this.build(childFrom)
                model.getChildren().push(child)
            }
            
        }

        return model;
    }

}
