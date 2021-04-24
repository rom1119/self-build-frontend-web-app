
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
import PseudoSelector from "~/src/PseudoSelector/PseudoSelector";
import Selector from "../Selector";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModelBuildResponse from "~/src/ModelFromResponseBuilder/impl/SelectorModelBuildResponse";
import DefaultSelectorToModel from "~/src/Transformer/impl/DefaultSelectorToModel";
import SelectorToModel from "~/src/Transformer/SelectorToModel";
import { BaseGradientStructVal } from "~/src/Css/Gradient/BaseGradientCss";
import NodeUpdater from "../idsUpdate/NodeUpdater";
import TagResource from "~/src/Css/TagResource";
import SelectorApiService from '../SelectorApiService';

export default class DefaultApiService implements ApiService, SelectorApiService
{
    static HOST = 'http://localhost:8080'

    private domainToModelTransformer: DomainToModel
    private tagModelToResponse: ResponseFromModel<TagDto, HtmlTagResponse>

    private selectorDomainToModelTransformer: SelectorToModel
    private selectorModelToResponse: ResponseFromModel<Selector, SelectorResponse>

    private modelToDomainTransformer: ModelToDomain
    private responseToTagModel: ModelFromResponse<HtmlTagResponse, TagDto>

    private cssFromName: CssPropertyFactoryFromName
    private idUpdater: NodeUpdater

    constructor()
    {
        this.domainToModelTransformer = new DefaultDomainToModel()
        this.tagModelToResponse = new HtmlTagModelBuildResponse()

        this.selectorDomainToModelTransformer = new DefaultSelectorToModel()
        this.selectorModelToResponse = new SelectorModelBuildResponse()

        this.cssFromName = new CssPropertyFactoryFromName()

        this.idUpdater = new NodeUpdater()

    }
    

    getTreeTags(tag: HtmlTag): ResponseTreeTag {
        throw new Error("Method not implemented.");
    }

    appendTagToProject(tag: HtmlNode) {
        let model = this.domainToModelTransformer.transform(tag, true)
        let response = this.tagModelToResponse.build(model, true)
        console.log('tag');
        console.log(tag);
        console.log('model');
        console.log(model);
        console.log('response');
        console.log(response);

        Axios.post(DefaultApiService.HOST + `/api/html-project/${tag.projectId}/append-tag`, response).then(
            (res) => {
                this.idUpdater.update(tag, res.data)
            },
            () => {

            },
        )
    }

    appendChild(tag: HtmlTag): Promise<any> {
        let model = this.domainToModelTransformer.transform(tag)
        let response = this.tagModelToResponse.build(model)
        var apiSuffix
        if (tag instanceof TextNode) {
            apiSuffix = 'append-text'
        } else if (tag instanceof HtmlTag) {
            apiSuffix = 'append-tag'

        }
        return new Promise((resolve, reject) => {

            Axios.post(DefaultApiService.HOST + `/api/html-tag/${tag.parent.uuid}/${apiSuffix}`, response).then(
                (res) => {
                    this.idUpdater.update(tag, res.data)
                    resolve(res)
                },
                () => {
                    reject()
                },
            )
        })
    }

    appendChildDeep(tag: HtmlTag): Promise<any> {
        let model = this.domainToModelTransformer.transform(tag, true)
        let response = this.tagModelToResponse.build(model, true)
        var apiSuffix
        if (tag instanceof TextNode) {
            apiSuffix = 'append-text'
        } else if (tag instanceof HtmlTag) {
            apiSuffix = 'append-tag'

        }
        return new Promise((resolve, reject) => {

            Axios.post(DefaultApiService.HOST + `/api/html-tag/${tag.parent.uuid}/${apiSuffix}`, response).then(
                (res) => {
                    this.idUpdater.update(tag, res.data)
                    resolve(res)
                },
                () => {
                    reject()
                },
            )
        })
    }

    appendSelector(selector: PseudoSelector): Promise<any> {
        let model = this.selectorDomainToModelTransformer.transform(selector)
        let response = this.selectorModelToResponse.build(model)

        return new Promise((resolve, reject) => {
            Axios.post(DefaultApiService.HOST + `/api/html-tag/${selector.owner.uuid}/append-selector`, response).then(
                (res) => {
                    let data: SelectorResponse = res.data
                    selector.id = data.id
                    for (const cssRes of data.cssStyleList) {
                        for (const cssDomain of selector.cssAccessor.all) {
                            if (cssDomain.getName() === cssRes.name) {
                                cssDomain.id = cssRes.id
                            }
                        }
                    }

                    resolve(res)


                },
                () => {
                    reject()

                },
            )

        })

    }

    putTag(tag: HtmlTag) : Promise<any> {
        let model = this.domainToModelTransformer.transform(tag)
        let response = this.tagModelToResponse.build(model)

        return Axios.put(DefaultApiService.HOST + `/api/html-tag/${tag.uuid}`, response)

    }

    putSelector(selector: PseudoSelector): Promise<any> {
        let model = this.selectorDomainToModelTransformer.transform(selector)
        let response = this.selectorModelToResponse.build(model)

        return Axios.put(DefaultApiService.HOST + `/api/pseudo-selector/${selector.id}`, response)

    }

    putText(tag: TextNode): Promise<any> {
        let model = this.domainToModelTransformer.transform(tag)
        let response = this.tagModelToResponse.build(model)
        return Axios.put(DefaultApiService.HOST + `/api/html-tag/text/${tag.uuid}`, response)
    }

    putCssStyleResource(css: CssResource): Promise<any> {
        // let model = this.domainToModelTransformer.transform(css)
        // let response = this.tagModelToResponse.build(model)
        let formData = new FormData()
        formData.append('file', css.getResourceFile())
        return Axios.post(DefaultApiService.HOST + `/api/css-style/${css.getId()}/resource`, formData)
    }

    putTagResource(arg: TagResource): Promise<any> {
        let formData = new FormData()
        formData.append('file', arg.getResourceFile())
        return Axios.post(DefaultApiService.HOST + `/api/html-tag/${arg.getId()}/resource`, formData)
    }

    deleteCssStyleResource(css: CssResource): Promise<any> {
        // let model = this.domainToModelTransformer.transform(css)
        // let response = this.tagModelToResponse.build(model)
        return Axios.delete(DefaultApiService.HOST + `/api/css-style/${css.getId()}/resource`)
    }

    deleteTagResource(css: TagResource): Promise<any> {
        // let model = this.domainToModelTransformer.transform(css)
        // let response = this.tagModelToResponse.build(model)
        return Axios.delete(DefaultApiService.HOST + `/api/html-tag/${css.getId()}/resource`)
    }

    deleteTag(tag: HtmlNode) : Promise<any> {
        return new Promise((resolve, reject) => {
             Axios.delete(DefaultApiService.HOST + `/api/html-tag/${tag.uuid}`).then(
                 (res) => {

                     resolve(tag)


                 },
                 (rej) => {
                     reject(rej)

                 },
             )

        })
    }

    deleteSelector(selector: PseudoSelector): Promise<any> {
        return Axios.delete(DefaultApiService.HOST + `/api/pseudo-selector/${selector.id}`)
    }

    deleteCssValue(val: CssValue): Promise<any> {
        return Axios.delete(DefaultApiService.HOST + `/api/css-style/value/${val.getId()}`)
    }



}
