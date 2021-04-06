import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssValue from "~/src/Api/StyleCssValue";
import AssetModel from '~/types/AssetModel';
import AssetResponse from "~/types/response/AssetResponse";
import FontFaceModel from '../../../types/FontFaceModel';
import FontFaceResponse from '../../../types/response/FontFaceResponse';
import AssetModelBuild from "./AssetModelBuild";

export default class FontFaceModelBuild implements ModelFromResponse<FontFaceResponse, FontFaceModel>{

    protected assetModelBuilder: ModelFromResponse<AssetResponse, AssetModel>

    constructor() {
        this.assetModelBuilder = new AssetModelBuild()
    }
    build(from: FontFaceResponse): FontFaceModel {
        let model = new FontFaceModel()
        model.id = from.id
        model.version = from.version

        if (from.project) {
            model.projectId = from.project.id

        }
        model.name = from.name

        var srcList = []
        for (const srcEl of from.src) {
            let srcModel = this.assetModelBuilder.build(srcEl)
            
            srcList.push(srcModel)
        }

        model.src = srcList

        return model;
    }

}
