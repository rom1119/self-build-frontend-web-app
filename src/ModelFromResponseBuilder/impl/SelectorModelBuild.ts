import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import HtmlTagModel from "~/types/HtmlTagModel";
import StyleCssModelResponse from '~/types/StyleCssModel';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssModelBuild from "./StyleCssModelBuild";
import StyleCssResponse from "~/types/response/StyleCssResponse";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModel from "~/types/SelectorModel";

export default class SelectorModelBuild implements ModelFromResponse<SelectorResponse, SelectorModel>{
    protected styleModelBuilder: ModelFromResponse<StyleCssResponse, StyleCssModel>

    constructor()
    {
        this.styleModelBuilder = new StyleCssModelBuild()
    }

    build(from: SelectorResponse): SelectorModel {
        let model = this.buildModel(from)

        return model;
    }

    buildModel(from: SelectorResponse): SelectorModel
    {
        let model = new SelectorModel
        model.id = from.id
        model.name = from.name
        model.value = from.value
        model.delimiter = from.delimiter
        model.version = from.version

        model.version = from.version
        if (from.project) {
            model.projectId = from.project.id

        }

        if (from.cssStyleList) {
            for (const style of from.cssStyleList) {
                let subModel = this.styleModelBuilder.build(style)
                model.styles.push(subModel)
            }
        }

        return model
    }

}
