import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";
import StyleCssResponse from '~/types/response/StyleCssResponse';
import StyleCssModel from "~/types/StyleCssModel";
import ResponseFromModel from "../ResponseFromModel";
import StyleCssValueResponse from "~/types/response/StyleCssValueResponse";
import KeyFrameModel from "~/types/KeyframeModel";
import KeyFrameResponse from "~/types/response/KeyFrameResponse";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModel from "~/types/SelectorModel";
import SelectorModelBuildResponse from "./SelectorModelBuildResponse";
import HtmlTagResponse from "~/types/response/HtmlTagResponse";
import HtmlTagModel from "~/types/HtmlTagModel";
import HtmlTagModelBuildResponse from "./HtmlTagModelBuildResponse";
import MediaQueryResponse from "~/types/response/MediaQueryResponse";
import MediaQueryModel from "~/types/MediaQueryModel";
import ProjectFrontendModel from '../../../types/ProjectFrontendModel';
import ProjectFrontendResponse from '~/types/response/ProjectFrontendResponse';

export default class ProjectFrontendModelBuildResponse implements ResponseFromModel<ProjectFrontendModel, ProjectFrontendResponse>{

    // protected selectorModelBuilderResponse: ResponseFromModel<SelectorModel, SelectorResponse>
    // protected tagModelBuilderResponse: ResponseFromModel<HtmlTagModel, HtmlTagResponse>

    constructor()
    {

        // this.selectorModelBuilderResponse = new SelectorModelBuildResponse()
        // this.tagModelBuilderResponse = new HtmlTagModelBuildResponse()
    }

    build(from: ProjectFrontendModel ): ProjectFrontendResponse {
        let response = new ProjectFrontendResponse()
        response.id = from.id
        response.name = from.name
        response.version = from.version
        response.pageUrl = from.pageUrl
     
        return response;
    }

}
