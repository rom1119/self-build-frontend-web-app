import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";

export default class StyleCssModelBuild implements ModelFromResponse<StyleCssResponse, StyleCssModel>{

    build(from: StyleCssResponse): StyleCssModel {
        let model = new StyleCssModel(from.name, from.value)
        model.id = from.id
        return model;
    }

}
