import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import HtmlTagModel from "~/types/HtmlTagModel";
import StyleCssModelResponse from '~/types/StyleCssModel';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssModelBuild from "./StyleCssModelBuild";
import StyleCssResponse from "~/types/response/StyleCssResponse";

export default class HtmlTagModelBuild implements ModelFromResponse<HtmlTagResponse, HtmlTagModel>{
    protected styleModelBuilder: ModelFromResponse<StyleCssResponse, StyleCssModel>

    constructor()
    {
        this.styleModelBuilder = new StyleCssModelBuild()
    }

    build(from: HtmlTagResponse): HtmlTagModel {
        let model = this.buildRecursive(from, null)

        return model;
    }

    buildRecursive(from: HtmlTagResponse, parent: HtmlTagModel)
    {
        let model = new HtmlTagModel
        model.id = from.id
        model.text = from.text
        model.isTextNode = from.isTextNode
        model.tagName = from.tagName
        model.version = from.version
        if (parent) {
            parent.children.push(model)
            model.parent = parent
        }

        if (from.cssStyleList) {
            for (const style of from.cssStyleList) {
                let subModel = this.styleModelBuilder.build(style)
                model.styles.push(subModel)
            }
        }
        
        if (from.children) {
            for (const el of from.children) {
                this.buildRecursive(el, model)
            }
        }

        return model
    }

}
