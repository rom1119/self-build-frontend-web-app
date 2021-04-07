import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import ResponseFromModel from "../ResponseFromModel";
import StyleCssValueResponse from "~/types/response/StyleCssValueResponse";
import AssetModel from '~/types/AssetModel';
import AssetResponse from '~/types/response/AssetResponse';

export default class AssetModelBuildResponse implements ResponseFromModel<AssetModel, AssetResponse>{

    build(from: AssetModel ): AssetResponse {
        let response = new AssetResponse()
        response.id = from.id
        response.version = from.version
        response.project = {
            "id": from.projectId,
            "version": 1
        }
        
        response.fontFace = {
            "id": from.fontFaceId,
        }
        response.type = from.type
        response.format = from.format
        
        response.resourceUrl = from.resourceUrl
        // console.log(from);
        // console.log(response);
        return response;
    }

}
