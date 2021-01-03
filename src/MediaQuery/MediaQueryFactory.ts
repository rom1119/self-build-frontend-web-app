import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import MediaQueryApiService from "~/src/Api/MediaQueryApiService";

export default class MediaQueryFactory {

    protected api: MediaQueryApiService

    constructor(api: MediaQueryApiService) {
        this.api = api;
    }

    public create() : BaseMediaQueryCss{
        var domain = new MediaQueryCss()

        domain.setApi(this.api)
        return domain
    }
}
