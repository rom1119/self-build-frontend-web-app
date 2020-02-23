import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssModelResponse from '~/types/StyleCssModel';
import StyleCssModel from "~/types/StyleCssModel";

export default class StyleCssModelBuild implements ModelFromResponse<StyleCssModelResponse, StyleCssModel>{
    build(from: StyleCssModelResponse): StyleCssModel {
        let model = new StyleCssModel(from.getKey(), from.getValue())

        return model;
    }

}
