
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
import FontFaceApiService from "../FontFaceApiService";
import FontFace from "~/src/Fonts/FontFace";
import FontFaceToModel from "~/src/Transformer/FontFaceToModel";
import FontFaceResponse from "~/types/response/FontFaceResponse";
import DefaultFontFaceToModel from "~/src/Transformer/impl/DefaultFontFaceToModel";
import FontFaceModelBuildResponse from "~/src/ModelFromResponseBuilder/impl/FontFaceModelBuildResponse";
import DomainResource from "~/src/DomainResource";
import FontFaceModel from '../../../types/FontFaceModel';
import AssetDomain from '../../Assets/AssetDomain';
import SrcFont from '../../Fonts/SrcFont';
import AssetToModel from '../../Transformer/AssetToModel';
import AssetModel from '../../../types/AssetModel';
import AssetResponse from '../../../types/response/AssetResponse';
import DefaultAssetToModel from '../../Transformer/impl/DefaultAssetToModel';
import AssetModelBuildResponse from '../../ModelFromResponseBuilder/impl/AssetModelBuildResponse';
import AssetApiService from '../AssetApiService';

export default class DefaultAssetApiService implements AssetApiService
{
    static HOST = 'http://localhost:8080'

    // private domainToModelTransformer: DomainToModel
    // private tagModelToResponse: ResponseFromModel<TagDto, HtmlTagResponse>

    private assetDomainToModelTransformer: AssetToModel
    private assetModelToResponse: ResponseFromModel<AssetModel, AssetResponse>



    // private cssFromName: CssPropertyFactoryFromName


    constructor()
    {

        this.assetDomainToModelTransformer = new DefaultAssetToModel()

        this.assetModelToResponse = new AssetModelBuildResponse()

        // this.cssFromName = new CssPropertyFactoryFromName()

    }


    // postFontFaceSrcResource(arg: FontFace, asset: SrcFont): Promise<any> {
    //     let formData = new FormData()
    //     formData.append('file', asset.getResourceFile())
    //     return Axios.post(DefaultFontFaceApiService.HOST + `/api/font-face/${arg.id}/resource/${asset.id}`, formData)
    // }

    // deleteFontFaceSrcResource(arg: FontFace, asset: SrcFont): Promise<any> {
    //     return Axios.delete(DefaultFontFaceApiService.HOST + `/api/font-face/${arg.id}/resource/${asset.id}`)

    // }

    postAsset(arg: AssetDomain): Promise<any> {
        let model = this.assetDomainToModelTransformer.transform(arg)
        let response = this.assetModelToResponse.build(model)

        return Axios.post(DefaultAssetApiService.HOST + `/api/assets`, response)
    }
    
    putAsset(arg: AssetDomain): Promise<any> {
        let model = this.assetDomainToModelTransformer.transform(arg)
        let response = this.assetModelToResponse.build(model)

        return Axios.put(DefaultAssetApiService.HOST + `/api/assets/${arg.getId()}`, response)
    }

    deleteAsset(arg: AssetDomain): Promise<any> {
        // let model = this.domainToModelTransformer.transform(css)
        // let response = this.tagModelToResponse.build(model)
        return Axios.delete(DefaultAssetApiService.HOST + `/api/assets/${arg.getId()}`)

    }


}
