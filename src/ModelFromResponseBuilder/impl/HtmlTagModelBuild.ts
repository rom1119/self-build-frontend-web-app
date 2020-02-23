import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import HtmlTagModelResponse from '~/types/HtmlTagModel';
import HtmlTagModel from "~/types/HtmlTagModel";
import StyleCssModelResponse from '~/types/StyleCssModel';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssModelBuild from "./StyleCssModelBuild";

export default class HtmlTagModelBuild implements ModelFromResponse<HtmlTagModelResponse, HtmlTagModel>{
    protected styleModelBuilder: ModelFromResponse<StyleCssModelResponse, StyleCssModel>

    constructor()
    {
        this.styleModelBuilder = new StyleCssModelBuild()
    }
    build(from: HtmlTagModelResponse): HtmlTagModel {
        let model = new HtmlTagModel
        model.id = from.id
        model.tagName = from.tagName

        if (from.styles) {
            for (const style of from.styles) {
                let subModel = this.styleModelBuilder.build(style)
                model.styles.push(subModel)
            }
        }

        return model;
    }

}
