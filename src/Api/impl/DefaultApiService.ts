
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
import ModelFromResponse from '../../ModelFromResponseBuilder/ModelFromResponse';
import ModelToDomain from "~/src/Transformer/ModelToDomain";
import DefaultModelToDomain from '../../Transformer/impl/DefaultModelToDomain';
import HtmlTagModelBuild from '../../ModelFromResponseBuilder/impl/HtmlTagModelBuild';
import CssPropertyFactoryFromName from '../../Factory/CssPropertyFactoryFromName';
import LayoutEl from "~/src/LayoutEl";
import TextNode from '../../Layout/TextNode';
import HtmlNode from "~/src/Layout/HtmlNode";
import CssResource from '../../Css/CssResource';
import CssValue from "~/src/Css/CssValue";

export default class DefaultApiService implements ApiService
{
    static HOST = 'http://localhost:8080'

    private domainToModelTransformer: DomainToModel
    private tagModelToResponse: ResponseFromModel<TagDto, HtmlTagResponse>
    
    private modelToDomainTransformer: ModelToDomain
    private responseToTagModel: ModelFromResponse<HtmlTagResponse, TagDto>


    private cssFromName: CssPropertyFactoryFromName


    constructor()
    {
        this.domainToModelTransformer = new DefaultDomainToModel()
        this.tagModelToResponse = new HtmlTagModelBuildResponse()

        this.cssFromName = new CssPropertyFactoryFromName()

    }
    

    getTreeTags(tag: HtmlTag): ResponseTreeTag {
        throw new Error("Method not implemented.");
    }
    
    appendTagToProject(tag: HtmlNode) {
        let model = this.domainToModelTransformer.transform(tag)
        let response = this.tagModelToResponse.build(model)
        Axios.post(DefaultApiService.HOST + `/api/html-project/${tag.projectId}/append-tag`, response).then(
            (res) => {
                let data: HtmlTagResponse = res.data
                tag.uuid = data.id
                for (const cssRes of data.cssStyleList) {
                    for (const cssDomain of tag.cssAccessor.all) {
                        if (cssDomain.getName() === cssRes.name) {
                            cssDomain.id = cssRes.id
                        }
                    }
                }

            },
            () => {
            
            },
        )

    }
    
    appendChild(tag: HtmlTag) {
        let model = this.domainToModelTransformer.transform(tag)
        let response = this.tagModelToResponse.build(model)
        var apiSuffix
        if (tag instanceof TextNode) {
            apiSuffix = 'append-text'
        } else if (tag instanceof HtmlTag) {
            apiSuffix = 'append-tag'
            
        }
        Axios.post(DefaultApiService.HOST + `/api/html-tag/${tag.parent.uuid}/${apiSuffix}`, response).then(
            (res) => {
                let data: HtmlTagResponse = res.data
                tag.uuid = data.id
                if (tag instanceof HtmlTag) {
                    for (const cssRes of data.cssStyleList) {
                        for (const cssDomain of tag.cssAccessor.all) {
                            if (cssDomain.getName() === cssRes.name) {
                                cssDomain.id = cssRes.id
                            }
                        }
                    }

                }
            },
            () => {
            
            },
        )

    }
    putTag(tag: HtmlTag) : Promise<any> {
        let model = this.domainToModelTransformer.transform(tag)
        let response = this.tagModelToResponse.build(model)

        return Axios.put(DefaultApiService.HOST + `/api/html-tag/${tag.uuid}`, response)

    }
    
    putText(tag: TextNode): Promise<any> {
        let model = this.domainToModelTransformer.transform(tag)
        let response = this.tagModelToResponse.build(model)
        return Axios.put(DefaultApiService.HOST + `/api/html-tag/text/${tag.uuid}`, response)
    }
    
    putCssStyle(css: CssResource): Promise<any> {
        // let model = this.domainToModelTransformer.transform(css)
        // let response = this.tagModelToResponse.build(model)
        let formData = new FormData()
        formData.append('file', css.getResourceFile())
        return Axios.post(DefaultApiService.HOST + `/api/css-style/${css.getId()}/resource`, formData)
    }

    deleteTag(tag: HtmlNode) : Promise<any> {
        return Axios.delete(DefaultApiService.HOST + `/api/html-tag/${tag.uuid}`)
    }

    deleteCssValue(val: CssValue): Promise<any> {
        return Axios.delete(DefaultApiService.HOST + `/api/css-style/value/${val.getId()}`)
    }
 
}