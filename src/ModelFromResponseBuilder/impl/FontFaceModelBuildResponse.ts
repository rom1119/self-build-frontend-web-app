import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import ResponseFromModel from "../ResponseFromModel";
import StyleCssValueResponse from "~/types/response/StyleCssValueResponse";
import AssetModel from '~/types/AssetModel';
import AssetResponse from '~/types/response/AssetResponse';
import FontFaceModel from '../../../types/FontFaceModel';
import FontFaceResponse from '../../../types/response/FontFaceResponse';
import AssetModelBuildResponse from "./AssetModelBuildResponse";

export default class FontFaceModelBuildResponse implements ResponseFromModel<FontFaceModel, FontFaceResponse>{

    protected assetModelBuilderResponse: ResponseFromModel<AssetModel, AssetResponse>

    constructor() {
        this.assetModelBuilderResponse = new AssetModelBuildResponse()
    }
    build(from: FontFaceModel ): FontFaceResponse {
        let response = new FontFaceResponse()
        response.id = from.id
        response.version = from.version
        response.project = {
            "id": from.projectId,
            "version": 1
        }
        response.name = from.name
        
        var srcList = []
        for (const srcEl of from.src) {
            let srcModel = this.assetModelBuilderResponse.build(srcEl)
            
            srcList.push(srcModel)
        }

        response.src = srcList

        return response;
    }

}
