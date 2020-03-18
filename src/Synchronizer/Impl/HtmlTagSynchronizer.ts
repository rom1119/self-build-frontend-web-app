import Synchronizer from "../Synchronizer";
import HtmlTag from '../../Layout/HtmlTag';
import ApiService from "~/src/Api/ApiService";
import SocketApi from "~/src/Api/SocketApi";
import DefaultSocketApi from "~/src/Api/impl/DefaultSocketApi";
import LayoutEl from '../../LayoutEl';
import HtmlNode from '../../Layout/HtmlNode';
import TextNode from '../../Layout/TextNode';

export default class HtmlTagSynchronizer implements Synchronizer
{

    protected isNowSynchronized 
    protected isQueued = false
    protected tag: HtmlNode
    protected api: ApiService
    protected apiSocket: SocketApi

    constructor(tag: HtmlNode, api: ApiService)
    {
        this.apiSocket = new DefaultSocketApi()
        this.apiSocket.connect()
        this.apiSocket.onGetMessage()
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
            
        }, 2000)
    }

    private updateApi()
    {
            setTimeout(() => { 
                this.apiSocket.sendMessage()

                this.setAsNowReadyToSynchronize()
                this.updatePromise().then(
                    (arg) => {
                        console.log('success');
                        console.log(arg);
                        this.trySynchronize()
                    },
                    (arg) => {
                        this.setAsNowReadyToSynchronize()
                        console.log('error');
                        console.log(arg);
                        this.trySynchronize()
    
                    }
                )

            }, 3000)
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
}