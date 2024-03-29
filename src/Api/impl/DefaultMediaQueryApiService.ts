
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

import Selector from "../Selector";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModelBuildResponse from "~/src/ModelFromResponseBuilder/impl/SelectorModelBuildResponse";
import DefaultSelectorToModel from "~/src/Transformer/impl/DefaultSelectorToModel";
import SelectorToModel from "~/src/Transformer/SelectorToModel";
import { BaseGradientStructVal } from "~/src/Css/Gradient/BaseGradientCss";
import MediaQueryApiService from "../MediaQueryApiService";
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import MediaQueryToModel from "~/src/Transformer/MediaQueryToModel";
import MediaQueryResponse from "~/types/response/MediaQueryResponse";
import DefaultMediaQueryToModel from "~/src/Transformer/impl/DefaultMediaQueryToModel";
import MediaQueryModelBuildResponse from "~/src/ModelFromResponseBuilder/impl/MediaQueryModelBuildResponse";
import MediaQuery from "../MediaQuery";
import SelectorApiService from '../SelectorApiService';
import PseudoSelector from '../../PseudoSelector/PseudoSelector';
import DefaultApiService from './DefaultApiService';

export default class DefaultMediaQueryApiService implements MediaQueryApiService, SelectorApiService
{
    static HOST = 'http://localhost:8080'

    // private domainToModelTransformer: DomainToModel
    // private tagModelToResponse: ResponseFromModel<TagDto, HtmlTagResponse>

    private mediaQueryDomainToModelTransformer: MediaQueryToModel
    private mediaQueryModelToResponse: ResponseFromModel<MediaQuery, MediaQueryResponse>


    private selectorDomainToModelTransformer: SelectorToModel
    private selectorModelToResponse: ResponseFromModel<Selector, SelectorResponse>


    private cssFromName: CssPropertyFactoryFromName


    constructor()
    {

        this.mediaQueryDomainToModelTransformer = new DefaultMediaQueryToModel()
        this.mediaQueryModelToResponse = new MediaQueryModelBuildResponse()

        this.selectorDomainToModelTransformer = new DefaultSelectorToModel()
        this.selectorModelToResponse = new SelectorModelBuildResponse()

        this.cssFromName = new CssPropertyFactoryFromName()

    }

    appendMedia(arg: MediaQueryCss, projectId: string): Promise<any> {
        let model = this.mediaQueryDomainToModelTransformer.transform(arg)
        let response = this.mediaQueryModelToResponse.build(model)

        return new Promise((resolve, reject) => {
            Axios.post(DefaultMediaQueryApiService.HOST + `/api/media-query/project/${projectId}/append`, response).then(
                (res) => {
                    let data: MediaQueryResponse = res.data
                    arg.id = data.id


                    // for (const cssRes of data.cssStyleList) {
                    //     for (const cssDomain of selector.cssAccessor.all) {
                    //         if (cssDomain.getName() === cssRes.name) {
                    //             cssDomain.id = cssRes.id
                    //         }
                    //     }
                    // }

                    resolve(res)


                },
                () => {
                    reject()

                },
            )

        })

    }

    putMedia(arg: MediaQueryCss) : Promise<any> {
        let model = this.mediaQueryDomainToModelTransformer.transform(arg)
        let response = this.mediaQueryModelToResponse.build(model)

        return Axios.put(DefaultMediaQueryApiService.HOST + `/api/media-query/${arg.id}`, response)

    }



    deleteMedia(arg: MediaQueryCss): Promise<any> {
        return Axios.delete(DefaultMediaQueryApiService.HOST + `/api/media-query/${arg.id}`)
    }

    appendSelector(selector: PseudoSelector): Promise<any> {
        let model = this.selectorDomainToModelTransformer.transform(selector)
        let response = this.selectorModelToResponse.build(model)

        return new Promise((resolve, reject) => {
            Axios.post(DefaultApiService.HOST + `/api/media-query/${selector.getMediaQueryId()}/append-selector/for-tag/${selector.owner.uuid}`, response).then(
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



    putSelector(selector: PseudoSelector): Promise<any> {
        let model = this.selectorDomainToModelTransformer.transform(selector)
        let response = this.selectorModelToResponse.build(model)

        return Axios.put(DefaultApiService.HOST + `/api/pseudo-selector/${selector.id}`, response)

    }

    deleteSelector(selector: PseudoSelector): Promise<any> {
        return Axios.delete(DefaultApiService.HOST + `/api/pseudo-selector/${selector.id}`)
    }

}
