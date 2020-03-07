import Synchronizer from "../Synchronizer";
import HtmlTag from '../../Layout/HtmlTag';
import ApiService from "~/src/Api/ApiService";

export default class HtmlTagSynchronizer implements Synchronizer
{

    protected isNowSynchronized 
    protected isQueued = false
    protected tag: HtmlTag
    protected api: ApiService

    constructor(tag: HtmlTag, api: ApiService)
    {
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

                this.api.putTag(this.tag).then(
                    (arg) => {
                        this.setAsNowReadyToSynchronize()
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

            }, 1000)
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