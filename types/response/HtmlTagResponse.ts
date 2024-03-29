import ResponseObject from "~/types/response/ResponseObject";

export default class HtmlTagResponse extends ResponseObject{
     id
     shortUuid
     text
     isTextNode: boolean
     closingTag: boolean
     attrs: any
     version
     project: any
     tagName
     children = []
     cssStyleList = []
     pseudoSelectors = []
     className
     resourcePath
     resourceUrl
     svgContent
}
