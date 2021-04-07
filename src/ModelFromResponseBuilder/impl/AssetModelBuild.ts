import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssValue from "~/src/Api/StyleCssValue";
import AssetModel from '~/types/AssetModel';
import AssetResponse from "~/types/response/AssetResponse";

export default class AssetModelBuild implements ModelFromResponse<AssetResponse, AssetModel>{

    build(from: AssetResponse): AssetModel {
        let model = new AssetModel()
        model.id = from.id
        model.version = from.version

        if (from.project) {
            model.projectId = from.project.id

        }
        model.type = from.type
        model.format = from.format
        model.resourceUrl = from.resourceUrl
        model.resourcePath = from.resourcePath

        return model;
    }

}
