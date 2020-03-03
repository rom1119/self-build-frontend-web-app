
import ApiService from "../ApiService";
import ResponseTreeTag from "../ResponseTreeTag";
import HtmlTag from "~/src/Layout/HtmlTag";

import  Axios  from 'axios'

// import  SockJS   from '~/node_modules/sockjs-client/dist/sockjs.js';
// import  Stomp   from '~/node_modules/stomp-websocket';
import Form from '../../../components/forms/Form';
import DomainToModel from "~/src/Transformer/DomainToModel";
import ResponseFromModel from "~/src/ModelFromResponseBuilder/ResponseFromModel";
import TagDto from '../TagDto';
import HtmlTagResponse from '../../../types/response/HtmlTagResponse';
import DefaultDomainToModel from '../../Transformer/impl/DefaultDomainToModel';
import HtmlTagModelBuildResponse from '../../ModelFromResponseBuilder/impl/HtmlTagModelBuildResponse';

export default class DefaultApiService implements ApiService
{
    static HOST = 'http://localhost:8080'

    private domainToModelTransformer: DomainToModel
    private tagModelToResponse: ResponseFromModel<TagDto, HtmlTagResponse>


    constructor()
    {
        this.domainToModelTransformer = new DefaultDomainToModel()
        this.tagModelToResponse = new HtmlTagModelBuildResponse()

    }

    getTreeTags(tag: HtmlTag): ResponseTreeTag {
        throw new Error("Method not implemented.");
    }
    
    appendTag(tag: HtmlTag) {
        let model = this.domainToModelTransformer.transform(tag)
        let response = this.tagModelToResponse.build(model)
        Axios.post(DefaultApiService.HOST + `/api/html-project/${tag.projectId}/append-tag`, response)


    }
    putTag(tag: HtmlTag) {
        throw new Error("Method not implemented.");
    }
    deleteTag(tag: HtmlTag) {
        throw new Error("Method not implemented.");
    }

 


 
}