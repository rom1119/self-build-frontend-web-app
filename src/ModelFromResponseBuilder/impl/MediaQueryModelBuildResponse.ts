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

export default class MediaQueryModelBuildResponse implements ResponseFromModel<MediaQueryModel, MediaQueryResponse>{

    protected selectorModelBuilderResponse: ResponseFromModel<SelectorModel, SelectorResponse>
    protected tagModelBuilderResponse: ResponseFromModel<HtmlTagModel, HtmlTagResponse>

    constructor()
    {

        this.selectorModelBuilderResponse = new SelectorModelBuildResponse()
        this.tagModelBuilderResponse = new HtmlTagModelBuildResponse()
    }

    build(from: MediaQueryModel ): MediaQueryResponse {
        let response = new MediaQueryResponse()
        response.id = from.id
        response.name = from.getName()
 

        var selectors = []
        for (const cssValModel of from.selectors) {
            let responseCssValue = this.selectorModelBuilderResponse.build(cssValModel)
            selectors.push(responseCssValue)
        }

        response.selectors = selectors
        
        var tags = []
        for (const tagM of from.tags) {
            let t = this.tagModelBuilderResponse.build(tagM)
            tags.push(t)
        }

        response.tags = tags
            
               
        return response;
    }

}
