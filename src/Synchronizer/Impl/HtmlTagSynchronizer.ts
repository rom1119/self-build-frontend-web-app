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

export default class HtmlTagSynchronizer implements Synchronizer
{

    protected isNowSynchronized 
    protected isQueued = false
    protected tag: HtmlNode
    protected api: ApiService
    protected apiSocket: SocketApi

    constructor(tag: HtmlNode, api: ApiService)
    {
        this.apiSocket = new HtmlSocketApi()
        this.apiSocket.connect()
        // this.apiSocket.onGetMessage()
        this.tag = tag
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
            console.log('qwerty');
            
        }, 1000)
    }

    private updateApi()
    {
        setTimeout(() => { 

            // this.setAsNowReadyToSynchronize()
            this.updatePromise().then(
                (res) => {
                    console.log('success');
                    console.log(res);

                    if (this.tag instanceof HtmlTag) {
                        this.updateCssIds(res.data.cssStyleList, this.tag.cssAccessor.all, false)
    
                    }
                    this.setAsNowReadyToSynchronize()
                    this.apiSocket.sendMessage(this.tag.projectId)

                    this.trySynchronize()
                },
                (arg) => {
                    this.setAsNowReadyToSynchronize()
                    // console.log('error');
                    // console.log(arg);
                    this.trySynchronize()
                    this.apiSocket.sendMessage(this.tag.projectId)


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

    private updateCssIds(arrCss, domainArrCss, isChildren)
    {

        for (var m = 0; m < arrCss.length; m++) {
            var cssRes = arrCss[m]
            var cssDomain = domainArrCss[m]
            if (cssDomain.getName() !== cssRes.name) {
                continue
            }
            if (isChildren) {

            }
            cssDomain.id = cssRes.id
            // @ts-ignore
            if (typeof cssDomain.getValues === 'function') {
                // @ts-ignore
                for (var i = 0; i < cssRes.cssValues.length; i++) {
                    if (cssDomain instanceof BaseGradientCss) {
                        // @ts-ignore
                        if (cssRes.cssValues[i].specialValGradient) {

                            cssDomain.direction.id = cssRes.cssValues[i].id
                            continue
                        }
                    }
                    // console.log(cssRes);
                    // console.log(cssDomain);
                    
                    // @ts-ignore
                    const cssValDomain = cssDomain.getValues()[i - 1]
                    cssValDomain.id = cssRes.cssValues[i].id
                }

            }

            if (cssDomain instanceof BackgroundImage) {

                this.updateCssIds(cssRes.children, cssDomain.getGradients(), true)
            }
            


            
        }
    }
}