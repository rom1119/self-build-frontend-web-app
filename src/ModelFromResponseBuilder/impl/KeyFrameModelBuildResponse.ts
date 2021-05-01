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

export default class KeyFrameModelBuildResponse implements ResponseFromModel<KeyFrameModel, KeyFrameResponse>{

    protected selectorModelBuilderResponse: ResponseFromModel<SelectorModel, SelectorResponse>

    constructor()
    {

        this.selectorModelBuilderResponse = new SelectorModelBuildResponse()
    }

    build(from: KeyFrameModel ): KeyFrameResponse {
        let response = new KeyFrameResponse()
        response.id = from.id
        response.name = from.getName()
        response.shortUuid = from.shortUuid
 

        response.version = from.version
        response.project = {
            "id": from.projectId,
            "version": 1
        }

        var selectors = []
        for (const cssValModel of from.getSelectors()) {
            let responseCssValue = this.selectorModelBuilderResponse.build(cssValModel)
            selectors.push(responseCssValue)
        }

        response.selectorList = selectors
            
               
        return response;
    }

}
