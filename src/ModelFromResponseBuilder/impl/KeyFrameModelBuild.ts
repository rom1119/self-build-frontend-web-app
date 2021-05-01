import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssValue from "~/src/Api/StyleCssValue";
import KeyFrameResponse from "~/types/response/KeyFrameResponse";
import KeyFrameModel from "~/types/KeyFrameModel";
import SelectorModelBuild from "./SelectorModelBuild";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModel from "~/types/SelectorModel";

export default class KeyFrameModelBuild implements ModelFromResponse<KeyFrameResponse, KeyFrameModel>{

    selectorBuilder: ModelFromResponse<SelectorResponse, SelectorModel>

    constructor()
    {
        this.selectorBuilder = new SelectorModelBuild()
    }

    build(from: KeyFrameResponse): KeyFrameModel {
        let model = new KeyFrameModel()
        model.id = from.id
        model.version = from.version
        model.name = from.name
        model.shortUuid = from.shortUuid
        
        if (from.project) {
            model.projectId = from.project.id

        }

        
        var sels = []
        for (const cssValModel of from.selectorList) {
            let cssValue = this.selectorBuilder.build(cssValModel)
            

            sels.push(cssValue)
        }

        model.selectors = sels



        return model;
    }

}
