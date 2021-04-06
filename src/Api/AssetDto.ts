import HtmlTag from "../Layout/HtmlTag";
import StyleCss from "./StyleCss";
import AggregateRoot from "~/types/AggregateRoot";

export default class AssetDto extends AggregateRoot
{
    projectId = ''
    type

    fontFaceId
    resourcePath
    resourceUrl

    version = 1

    getResourcePath(): string {
        return this.resourcePath
    }
    setResourcePath(val: string) {
        this.resourcePath = val
    }
    
    getResourceUrl(): string {
        return this.resourceUrl
    }
    setResourceUrl(val: string) {
        this.resourceUrl = val
    }

}