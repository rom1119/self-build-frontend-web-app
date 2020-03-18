import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import HtmlTagModel from "~/types/HtmlTagModel";
import StyleCssModelResponse from '~/types/StyleCssModel';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssModelBuild from "./StyleCssModelBuild";
import StyleCssResponse from "~/types/response/StyleCssResponse";
import ResponseFromModel from "../ResponseFromModel";
import StyleCssModelBuildResponse from "./StyleCssModelBuildResponse";

export default class HtmlTagModelBuildResponse implements ResponseFromModel<HtmlTagModel, HtmlTagResponse>{
    protected styleModelBuilderResponse: ResponseFromModel<StyleCssModel, StyleCssResponse>

    constructor()
    {
        this.styleModelBuilderResponse = new StyleCssModelBuildResponse()
    }

    build(from: HtmlTagModel): HtmlTagResponse {
        let response = new HtmlTagResponse()
        // response.id = from.id
        if (from.isTextNode) {
            response.text = from.text
            response.isTextNode = from.isTextNode

        } else {
            response.tagName = from.tagName
            if (from.styles) {
                for (const style of from.styles) {
                    let subModel = this.styleModelBuilderResponse.build(style)
                    response.cssStyleList.push(subModel)
                }
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
