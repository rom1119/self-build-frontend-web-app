import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";

export default class StyleCssModelBuild implements ModelFromResponse<StyleCssResponse, StyleCssModel>{

    build(from: StyleCssResponse): StyleCssModel {
        let model = new StyleCssModel(from.name, from.value, from.unitName)
        model.id = from.id
        model.setValueSecond(from.valueSecond)
        model.setValueThird(from.valueThird)
        model.setUnitNameSecond(from.unitNameSecond)
        model.setUnitNameThird(from.unitNameThird)
        model.setResourcePath(from.resourcePath)
        return model;
    }

}
