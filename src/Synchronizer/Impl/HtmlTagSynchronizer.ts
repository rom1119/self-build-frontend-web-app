import Synchronizer from "../Synchronizer";
import HtmlTag from '../../Layout/HtmlTag';
import ApiService from "~/src/Api/ApiService";
import SocketApi from "~/src/Api/SocketApi";
import HtmlSocketApi from "~/src/Api/impl/HtmlSocketApi";
import LayoutEl from '../../LayoutEl';
import HtmlNode from '../../Layout/HtmlNode';
import TextNode from '../../Layout/TextNode';
import BackgroundImage from '../../Css/Background/BackgroundImage';
import BaseGradientCss from '../../Css/Gradient/BaseGradientCss';
import CssStyleUpdater from "~/src/Api/idsUpdate/CssStyleUpdater";

export default class HtmlTagSynchronizer implements Synchronizer
{
    turnOn() {
        this.isEnabled = true
    }
    turnOff() {
        this.isEnabled = false
    }

    protected isNowSynchronized
    protected isQueued = false
    protected tag: HtmlNode
    protected api: ApiService
    protected apiSocket: SocketApi
    protected cssUpdater: CssStyleUpdater

    protected isEnabled = true
    protected isFirstTrying = true

    constructor(tag: HtmlNode, api: ApiService)
    {
        this.apiSocket = new HtmlSocketApi()
        this.cssUpdater = new CssStyleUpdater()
        this.apiSocket.connect()
        // this.apiSocket.onGetMessage()
        this.tag = tag
        this.api = api
        this.isNowSynchronized = false

    }

    synchronize()
    {
        if (!this.isEnabled) {
            return
        }
        
        if (this.isFirstTrying) {
            this.isFirstTrying = false
            return
        }
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

                    if (this.tag instanceof HtmlTag) {
                        this.updateCssIds(res.data.cssStyleList, this.tag)

                    }
                    this.setAsNowReadyToSynchronize()
                    // this.apiSocket.sendMessage(this.tag.projectId)

                    this.trySynchronize()
                },
                (arg) => {
                    this.setAsNowReadyToSynchronize()
                    // console.log('error');
                    // console.log(arg);
                    this.trySynchronize()
                    // this.apiSocket.sendMessage(this.tag.projectId)


                }
            )

        }, 1000)
    }

    private updatePromise() : Promise<any>
    {
        if (this.tag instanceof HtmlTag) {
            return this.api.putTag(this.tag)
        }

        if (this.tag instanceof TextNode) {
            return this.api.putText(this.tag)
        }

        throw Error(`Not implementede update object ${this.tag}`)
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

    private updateCssIds(arrCss, tag: HtmlTag)
    {

        var tagCssIndex = 0
        var mediaQueryCssIndex = 0
        for (var m = 0; m < arrCss.length; m++) {
            var cssRes = arrCss[m]
            if (cssRes.mediaQuery) {
                var cssDomain = tag.cssListMediaOwner.getPropertyForMedia(cssRes.name, cssRes.mediaQuery.id)
                this.cssUpdater.update(cssDomain, cssRes)

            } else {
                var cssDomain = tag.cssAccessor.all[tagCssIndex]
                this.cssUpdater.update(cssDomain, cssRes)
                tagCssIndex++
            }

        }
    }
}
