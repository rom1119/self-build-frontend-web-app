import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import HtmlTagModel from "~/types/HtmlTagModel";
import StyleCssModelResponse from '~/types/StyleCssModel';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssModelBuild from "./StyleCssModelBuild";
import StyleCssResponse from "~/types/response/StyleCssResponse";
import ResponseFromModel from "../ResponseFromModel";
import StyleCssModelBuildResponse from "./StyleCssModelBuildResponse";
import SelectorModel from "~/types/SelectorModel";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModelBuildResponse from "./SelectorModelBuildResponse";

export default class HtmlTagModelBuildResponse implements ResponseFromModel<HtmlTagModel, HtmlTagResponse>{
    protected styleModelBuilderResponse: ResponseFromModel<StyleCssModel, StyleCssResponse>
    protected selectorModelBuilderResponse: ResponseFromModel<SelectorModel, SelectorResponse>

    constructor()
    {
        this.styleModelBuilderResponse = new StyleCssModelBuildResponse()
        this.selectorModelBuilderResponse = new SelectorModelBuildResponse()
    }

    build(from: HtmlTagModel, deep?: boolean): HtmlTagResponse {
        let response = new HtmlTagResponse()
        // response.id = from.id
        if (from.isTextNode) {
            response.text = from.text
            response.isTextNode = from.isTextNode
            response.className = 'com.SelfBuildApp.ddd.Project.domain.TextNode'
        } else {
            response.tagName = from.tagName
            response.className = 'com.SelfBuildApp.ddd.Project.domain.HtmlTag'

            response.closingTag = from.isClosingTag
            response.attrs = from.attrs
            if (from.styles) {
                for (const style of from.styles) {
                    let subModel = this.styleModelBuilderResponse.build(style)
                    response.cssStyleList.push(subModel)
                }
            }
            
            if (from.selectors) {
                for (const style of from.selectors) {
                    let subModel = this.selectorModelBuilderResponse.build(style)
                    response.pseudoSelectors.push(subModel)
                }
            }

            if (deep) {
                for (const child of from.children) {
                    var c = this.build(child, true)

                    response.children.push(c)
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
