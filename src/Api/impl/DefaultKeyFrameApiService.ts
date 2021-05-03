

import  Axios  from 'axios'

// import  SockJS   from '~/node_modules/sockjs-client/dist/sockjs.js';
// import  Stomp   from '~/node_modules/stomp-websocket';
import ResponseFromModel from "~/src/ModelFromResponseBuilder/ResponseFromModel";

import KeyFrameApiService from '../KeyFrameApiService';
import KeyFrame from '../../Animation/KeyFrame';
import KeyFrameResponse from '../../../types/response/KeyFrameResponse';
import KeyFrameModel from '../../../types/KeyFrameModel';
import KeyFrameModelBuildResponse from '../../ModelFromResponseBuilder/impl/KeyFrameModelBuildResponse';
import KeyFrameToModel from '../../Transformer/KeyFrameToModel';
import DefaultKeyFrameToModel from '../../Transformer/impl/DefaultKeyFrameToModel';
import KeyFrameUpdater from '../idsUpdate/KeyFrameUpdater';
import SelectorApiService from '../SelectorApiService';
import PseudoSelector from '~/src/PseudoSelector/PseudoSelector';
import SelectorResponse from '~/types/response/SelectorResponse';
import DefaultApiService from './DefaultApiService';
import SelectorToModel from '../../Transformer/SelectorToModel';
import Selector from '../Selector';
import BaseSelector from '../../BaseSelector';
import DefaultSelectorToModel from '../../Transformer/impl/DefaultSelectorToModel';
import SelectorModelBuildResponse from '../../ModelFromResponseBuilder/impl/SelectorModelBuildResponse';

export default class DefaultKeyFrameApiService implements KeyFrameApiService, SelectorApiService
{
    static HOST = 'http://localhost:8080'

    // private domainToModelTransformer: DomainToModel
    // private tagModelToResponse: ResponseFromModel<TagDto, HtmlTagResponse>

    private keyFrameDomainToModelTransformer: KeyFrameToModel
    private keyFrameModelToResponse: ResponseFromModel<KeyFrameModel, KeyFrameResponse>

    private selectorDomainToModelTransformer: SelectorToModel
    private selectorModelToResponse: ResponseFromModel<Selector, SelectorResponse>

    private idUpdater: KeyFrameUpdater



    // private cssFromName: CssPropertyFactoryFromName


    constructor()
    {

        this.keyFrameDomainToModelTransformer = new DefaultKeyFrameToModel()
        this.keyFrameModelToResponse = new KeyFrameModelBuildResponse()
        
        
        this.selectorDomainToModelTransformer = new DefaultSelectorToModel()
        this.selectorModelToResponse = new SelectorModelBuildResponse()


        this.idUpdater = new KeyFrameUpdater()


        // this.cssFromName = new CssPropertyFactoryFromName()

    }

    postKeyFrame(arg: KeyFrame, projectId: string): Promise<any> {
        let model = this.keyFrameDomainToModelTransformer.transform(arg)
        let response = this.keyFrameModelToResponse.build(model)

        return new Promise((resolve, reject) => {
            Axios.post(DefaultKeyFrameApiService.HOST + `/api/key-frame/project/${projectId}/append`, response).then(
                (res) => {
                    let data: KeyFrameResponse = res.data

                    this.idUpdater.update(arg, data)



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

    putKeyFrame(arg: KeyFrame) : Promise<any> {
        let model = this.keyFrameDomainToModelTransformer.transform(arg)
        let response = this.keyFrameModelToResponse.build(model)

        return Axios.put(DefaultKeyFrameApiService.HOST + `/api/key-frame/${arg.uuid}`, response)

    }



    deleteKeyFrame(arg: KeyFrame): Promise<any> {
        return Axios.delete(DefaultKeyFrameApiService.HOST + `/api/key-frame/${arg.uuid}`)
    }

    appendSelector(selector: BaseSelector): Promise<any> {
        let model = this.selectorDomainToModelTransformer.transform(selector)
        let response = this.selectorModelToResponse.build(model)
        // console.log('appendSelector');
        
        return new Promise((resolve, reject) => {
            // console.log('appendSelector Promise');
            // console.log(selector.owner);
            Axios.post(DefaultApiService.HOST + `/api/key-frame/${selector.getOwnerId()}/append-selector`, response).then(
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

    putSelector(selector: BaseSelector): Promise<any> {
        let model = this.selectorDomainToModelTransformer.transform(selector)
        let response = this.selectorModelToResponse.build(model)

        return Axios.put(DefaultApiService.HOST + `/api/pseudo-selector/${selector.id}`, response)

    }

    deleteSelector(selector: BaseSelector): Promise<any> {
        return Axios.delete(DefaultApiService.HOST + `/api/pseudo-selector/${selector.id}`)
    }


}
