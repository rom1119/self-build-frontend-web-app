import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import ResponseFromModel from "../ResponseFromModel";

export default class StyleCssModelBuildResponse implements ResponseFromModel<StyleCssModel, StyleCssResponse>{

    build(from: StyleCssModel ): StyleCssResponse {
        let response = new StyleCssResponse()
        response.id = from.id
        response.name = from.getKey()
        response.value = from.getValue()
        response.unitName = from.getUnitName()
        
        return response;
    }

}
