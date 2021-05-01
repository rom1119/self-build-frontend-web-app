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
import SelectorApiService from '../../Api/SelectorApiService';
import BaseSelector from '../../BaseSelector';

export default abstract class BaseSelectorSynchronizer implements Synchronizer
{

    protected isNowSynchronized
    protected isQueued = false
    protected selector: BaseSelector
    protected api: SelectorApiService
    protected apiSocket: SocketApi

    constructor(selector: BaseSelector, api: SelectorApiService)
    {
        this.apiSocket = new HtmlSocketApi()
        this.apiSocket.connect()
        // this.apiSocket.onGetMessage()
        this.selector = selector
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

                    this.updateCssIds(res.data.cssStyleList, this.selector.cssAccessor.all)

                    this.setAsNowReadyToSynchronize()
                    // this.apiSocket.sendMessage(this.selector.projectId)

                    this.trySynchronize()
                },
                (arg) => {
                    this.setAsNowReadyToSynchronize()
                    // console.log('error');
                    // console.log(arg);
                    this.trySynchronize()
                    // this.apiSocket.sendMessage(this.selector.projectId)


                }
            )

        }, 1000)
    }

    private updatePromise() : Promise<any>
    {

        return this.api.putSelector(this.selector)



        throw Error(`Not implementede update object ${this.selector}`)
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

    private updateCssIds(arrCss, domainArrCss)
    {
        for (const cssRes of arrCss) {
            for (const cssDomain of domainArrCss) {
                if (cssDomain.getName() !== cssRes.name) {
                    continue
                }
                cssDomain.id = cssRes.id
                // @ts-ignore
                if (typeof cssDomain.getValues === 'function') {
                    // @ts-ignore
                    for (var i = 0; i < cssDomain.getValues().length; i++) {
                        if (cssDomain instanceof BaseGradientCss) {
                            // @ts-ignore
                            if (cssDomain.getValues()[i].specialValGradient) {

                                cssDomain.direction.id = cssRes.cssValues[i].id
                                continue
                            }
                        }
                        // console.log(cssRes);
                        // console.log(cssDomain);

                        // @ts-ignore
                        const cssValDomain = cssDomain.getValues()[i]
                        cssValDomain.id = cssRes.cssValues[i].id
                    }

                }

                if (cssDomain instanceof BackgroundImage) {

                    this.updateCssIds(cssRes.children, cssDomain.getGradients())
                }
            }



        }
    }
}
