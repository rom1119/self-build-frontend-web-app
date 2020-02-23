import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";

import ProjectFrontendModelResponse from '~/types/ProjectFrontendModel';
import ProjectFrontendModel from "~/types/ProjectFrontendModel";
import HtmlTagModelResponse from '~/types/HtmlTagModel';
import HtmlTagModel from "~/types/HtmlTagModel";
import HtmlTagModelBuild from "./HtmlTagModelBuild";

export default class ProjectFrontendModelBuild implements ModelFromResponse<ProjectFrontendModelResponse, ProjectFrontendModel>{

    protected htmlTagModelBuilder: ModelFromResponse<HtmlTagModelResponse, HtmlTagModel>

    constructor()
    {
        this.htmlTagModelBuilder = new HtmlTagModelBuild()
    }

    build(from: ProjectFrontendModelResponse): ProjectFrontendModel {
        let model = new ProjectFrontendModel()
        model.id = from.id
        model.name = from.name

        if (from.htmlTags) {
            for (const tag of from.htmlTags) {
                let subModel = this.htmlTagModelBuilder.build(tag)
                model.htmlTags.push(subModel)
            }
        }

        return model;
    }

}
