
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
import Vue from 'vue'


export default class HtmlSocketApi implements SocketApi
{
    static HOST = 'http://localhost:8080'
    static IS_CONNECTED = false
    static CURRENT_SESSION_ID = {value: null}

    private domainToModelTransformer: DomainToModel
    private tagModelToResponse: ResponseFromModel<TagDto, HtmlTagResponse>

    private modelToDomainTransformer: ModelToDomain
    private responseToTagModel: ModelFromResponse<HtmlTagResponse, TagDto>


    private cssFromName: CssPropertyFactoryFromName

    private static stompClient: Stomp
    private static socket: SockJS

    protected projectId

    protected type = 'normal'

    constructor()
    {
        // Vue.set(HtmlSocketApi.CURRENT_SESSION_ID, 'value', '')

        this.domainToModelTransformer = new DefaultDomainToModel()
        this.tagModelToResponse = new HtmlTagModelBuildResponse()

        this.cssFromName = new CssPropertyFactoryFromName()
        // this.projectId = projectID


    }

    setCodeType(type) {
        this.type = type
    }

    sendMessage(projectId) {
        if (projectId) {
            HtmlSocketApi.stompClient.send("/app/update/html-code", {}, JSON.stringify({ 'projectId': projectId, 'type': this.type }));

        }
    }
    async connect() {
        if (HtmlSocketApi.IS_CONNECTED) {
            return
        }
        HtmlSocketApi.IS_CONNECTED = true
        HtmlSocketApi.socket = new SockJS(HtmlSocketApi.HOST + '/gs-guide-websocket');
        HtmlSocketApi.stompClient = Stomp.over(HtmlSocketApi.socket);
        await HtmlSocketApi.stompClient.connect('guest', 'guest', () => {
            // HtmlSocketApi.CURRENT_SESSION_ID = this.getSessionId()
            // @ts-ignore
            // state.sessionId = HtmlSocketApi.CURRENT_SESSION_ID

            // mapMutations.setSessionId(HtmlSocketApi.CURRENT_SESSION_ID)
            // console.log(getters);
            HtmlSocketApi.CURRENT_SESSION_ID.value = this.getSessionId()
            // Vue.set(, 'value', )

            // var a = {...mapMutations({
            //     asd: 'globals/setSessionId'
            // })}
            // a.asd('aefsdd')
            // Vue.store.commit('globals/setSessionId', HtmlSocketApi.CURRENT_SESSION_ID)
        });
        // setTimeout(() => {
        //     console.log('ConnectedAAAAA: ');


        // }, 9000)
    }
    subscribeMsg(msg: string) {

        HtmlSocketApi.stompClient.subscribe(msg, function (greeting) {
            // this.showGreeting(JSON.parse(greeting.body).content);

            console.log('subscribe');
            console.log(JSON.parse(greeting.body).content);

        });
    }
    onGetMessage(fn) {
        HtmlSocketApi.socket.onmessage = function(e) {
            // console.log('messageAAAAAA++++++');
            // console.log('message', e.data);
            // console.log( e);
            // console.log('messageAAAAAA=====');
            fn(e)
            // sock.close();
        };
    }

    private getSessionId()
    {
        var url = HtmlSocketApi.stompClient.ws._transport.url;
        console.log("Your current session is: " + url);
        url = url.replace(
          "ws://localhost:8080/gs-guide-websocket/",  "");
        url = url.replace("/websocket", "");
        url = url.replace(/^[0-9]+\//, "");
        console.log("Your current session is: " + url);
        return url;
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
