
import ApiService from "../ApiService";
import ResponseTreeTag from "../ResponseTreeTag";
import HtmlTag from "~/src/Layout/HtmlTag";

import  Axios  from 'axios'

import  SockJS   from '~/node_modules/sockjs-client/dist/sockjs.js';
import  Stomp   from '~/node_modules/stomp-websocket';
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
import SocketApi from "../SocketApi";

export default class DefaultSocketApi implements SocketApi
{
    static HOST = 'http://localhost:8080'

    private domainToModelTransformer: DomainToModel
    private tagModelToResponse: ResponseFromModel<TagDto, HtmlTagResponse>
    
    private modelToDomainTransformer: ModelToDomain
    private responseToTagModel: ModelFromResponse<HtmlTagResponse, TagDto>


    private cssFromName: CssPropertyFactoryFromName

    private stompClient: Stomp
    private socket: SockJS


    constructor()
    {
        this.domainToModelTransformer = new DefaultDomainToModel()
        this.tagModelToResponse = new HtmlTagModelBuildResponse()

        this.cssFromName = new CssPropertyFactoryFromName()

    }
    sendMessage() {
        this.stompClient.send("/app/hello", {}, 'params');
    }
    async connect() {
        this.socket = new SockJS('http://localhost:8080/gs-guide-websocket');
        this.stompClient = Stomp.over(this.socket);
        await this.stompClient.connect();
        // setTimeout(() => {
        //     console.log('ConnectedAAAAA: ');
            
        
        // }, 9000)
    }
    subscribeMsg(msg: string) {
        this.stompClient.subscribe(msg, function (greeting) {
            // this.showGreeting(JSON.parse(greeting.body).content);

            console.log('subscribe');
            console.log(JSON.parse(greeting.body).content);
            
        });
    }
    onGetMessage() {
        this.socket.onmessage = function(e) {
            console.log('messageAAAAAA++++++');
            console.log('message', e.data);
            console.log( e);
            console.log('messageAAAAAA=====');
            // sock.close();
        };
    }

    // getTreeTags(tag: HtmlTag): ResponseTreeTag {
    //     throw new Error("Method not implemented.");
    // }
    
    // appendTagToProject(tag: HtmlTag) {
    //     let model = this.domainToModelTransformer.transform(tag)
    //     let response = this.tagModelToResponse.build(model)
    //     Axios.post(DefaultApiService.HOST + `/api/html-project/${tag.projectId}/append-tag`, response).then(
    //         (res) => {
    //             let data: HtmlTagResponse = res.data
    //             tag.uuid = data.id
    //             for (const cssRes of data.cssStyleList) {
    //                 for (const cssDomain of tag.cssAccessor.all) {
    //                     if (cssDomain.getName() === cssRes.name) {
    //                         cssDomain.id = cssRes.id
    //                     }
    //                 }
    //             }

    //         },
    //         () => {
            
    //         },
    //     )

    // }
    
    // appendChild(tag: HtmlTag) {
    //     let model = this.domainToModelTransformer.transform(tag)
    //     let response = this.tagModelToResponse.build(model)
    //     Axios.post(DefaultApiService.HOST + `/api/html-tag/${tag.parent.uuid}/append-tag`, response).then(
    //         (res) => {
    //             let data: HtmlTagResponse = res.data
    //             tag.uuid = data.id
    //             for (const cssRes of data.cssStyleList) {
    //                 for (const cssDomain of tag.cssAccessor.all) {
    //                     if (cssDomain.getName() === cssRes.name) {
    //                         cssDomain.id = cssRes.id
    //                     }
    //                 }
    //             }
    //         },
    //         () => {
            
    //         },
    //     )

    // }

 


 
}