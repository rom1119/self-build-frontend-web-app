import Synchronizer from "../Synchronizer";
import HtmlTag from '../../Layout/HtmlTag';
import ApiService from "~/src/Api/ApiService";
import SocketApi from "~/src/Api/SocketApi";
import HtmlSocketApi from "~/src/Api/impl/HtmlSocketApi";
import LayoutEl from '../../LayoutEl';
import HtmlNode from '../../Layout/HtmlNode';
import TextNode from '../../Layout/TextNode';
import PseudoSelector from '../../PseudoSelector/PseudoSelector';
import BaseGradientCss from "~/src/Css/Gradient/BaseGradientCss";
import { BackgroundImage } from "~/src/Css";
import MediaQueryCss from '../../MediaQuery/MediaQueryCss';
import MediaQueryApiService from "~/src/Api/MediaQueryApiService";
import FontFaceApiService from '../../Api/FontFaceApiService';
import FontFace from '../../Fonts/FontFace';

export default class FontFaceSynchronizer implements Synchronizer
{

    protected isNowSynchronized
    protected isQueued = false
    protected model: FontFace
    protected api: FontFaceApiService
    protected apiSocket: SocketApi

    constructor(selector: FontFace, api: FontFaceApiService)
    {
        this.apiSocket = new HtmlSocketApi()
        this.apiSocket.connect()
        // this.apiSocket.onGetMessage()
        this.model = selector
        this.api = api
        this.isNowSynchronized = false

    }

    synchronize()
    {
        if (!this.canSynchronize()) {
            this.isQueued = true
            return
        }
        this.isNowSynchronized = true

        return this.updateApi()

    }

    private setAsNowReadyToSynchronize()
    {
        setTimeout(() => {
            this.isNowSynchronized = false
            // console.log('qwerty');

        }, 1000)
    }

    private updateApi()
    {
        setTimeout(() => {

            // this.setAsNowReadyToSynchronize()
            this.updatePromise().then(
                (res) => {
                    // console.log('success');
                    // console.log(res);
                    var resValues = res.data.cssValues
                    // this.updateCssIds(res.data.cssStyleList, this.model.cssAccessor.all)
                    // if (typeof this.model.values === 'function') {
                    //     // @ts-ignore
                    //     for (var i = 0; i < this.model.getValues().length; i++) {

                    //         // console.log(cssRes);
                    //         // console.log(cssDomain);

                    //         // @ts-ignore
                    //         const cssValDomain = cssDomain.getValues()[i]
                    //         cssValDomain.id = resValues[i].id
                    //     }

                    // }

                    this.setAsNowReadyToSynchronize()
                    // this.apiSocket.sendMessage(this.model.projectId)

                    this.trySynchronize()
                },
                (arg) => {
                    this.setAsNowReadyToSynchronize()
                    // console.log('error');
                    // console.log(arg);
                    this.trySynchronize()
                    // this.apiSocket.sendMessage(this.model.projectId)


                }
            )

        }, 1000)
    }



    private updatePromise() : Promise<any>
    {

        return this.api.putFontFace(this.model)

    }



    private trySynchronize()
    {
        if (!this.isQueued) {
            return
        }
        this.isNowSynchronized = true

        this.updateApi()

        this.isQueued = false

    }

    private canSynchronize()
    {
        if (this.isNowSynchronized) {
            return false
        }

        return  true
    }

    
    
}
