import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import HtmlTagModel from "~/types/HtmlTagModel";
import StyleCssModelResponse from '~/types/StyleCssModel';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssModelBuild from "./StyleCssModelBuild";
import StyleCssResponse from "~/types/response/StyleCssResponse";
import ResponseFromModel from "../ResponseFromModel";
import StyleCssModelBuildResponse from "./StyleCssModelBuildResponse";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModel from "~/types/SelectorModel";

export default class SelectorModelBuildResponse implements ResponseFromModel<SelectorModel, SelectorResponse>{
    protected styleModelBuilderResponse: ResponseFromModel<StyleCssModel, StyleCssResponse>

    constructor()
    {
        this.styleModelBuilderResponse = new StyleCssModelBuildResponse()
    }

    build(from: SelectorModel): SelectorResponse {
        let response = new SelectorResponse()
        // response.id = from.id
            response.name = from.name
            response.delimiter = from.delimiter

            response.value = from.value
            response.version = from.version
            if (from.styles) {
                for (const style of from.styles) {
                    let subModel = this.styleModelBuilderResponse.build(style)
                    response.cssStyleList.push(subModel)
                }
            }

        response.version = from.version
        response.project = {
            "id": from.projectId,
            "version": 1
        }


        return response;
    }

    // buildRecursive(from: HtmlTagResponse, parent: HtmlTagModel)
    // {
    //     let model = new HtmlTagModel
    //     model.id = from.id
    //     model.tagName = from.tagName
    //     if (parent) {
    //         parent.children.push(model)
    //         model.parent = parent
    //     }

    //     if (from.cssStyleList) {
    //         for (const style of from.cssStyleList) {
    //             let subModel = this.styleModelBuilder.build(style)
    //             model.styles.push(subModel)
    //         }
    //     }
        
    //     // if (from.children) {
    //     //     for (const el of from.children) {
    //     //         this.buildRecursive(el, model)
    //     //     }
    //     // }

    //     return model
    // }

}
