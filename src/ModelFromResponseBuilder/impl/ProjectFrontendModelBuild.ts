import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";

import ProjectFrontendResponse from '~/types/response/ProjectFrontendResponse';
import ProjectFrontendModel from "~/types/ProjectFrontendModel";
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import HtmlTagModel from "~/types/HtmlTagModel";
import HtmlTagModelBuild from "./HtmlTagModelBuild";

export default class ProjectFrontendModelBuild implements ModelFromResponse<ProjectFrontendResponse, ProjectFrontendModel>{

    protected htmlTagModelBuilder: ModelFromResponse<HtmlTagResponse, HtmlTagModel>

    constructor()
    {
        this.htmlTagModelBuilder = new HtmlTagModelBuild()
    }

    build(from: ProjectFrontendResponse): ProjectFrontendModel {
        let model = new ProjectFrontendModel()
        model.id = from.id
        model.name = from.name
        model.pageUrl = from.pageUrl

        if (from.items) {

            var sortedChilderen = []
            sortedChilderen = from.items.sort( 
                ( childA, childB ) => {
                if ( childA.orderNumber < childB.orderNumber ){
                    return -1;
                }
                if ( childA.orderNumber > childB.orderNumber ){
                    return 1;
                }
                return 0;
                }
            );
            from.items = sortedChilderen

            for (const tag of from.items) {
                tag.project = {id: null}
                let subModel = this.htmlTagModelBuilder.build(tag)
                subModel.projectId = model.id
                model.htmlTags.push(subModel)
            }
        }

        return model;
    }

}
