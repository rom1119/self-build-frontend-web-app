import ResponseObject from "~/types/response/ResponseObject";

export default class HtmlTagResponse extends ResponseObject{
     id
     text
     isTextNode
     version
     project: any
     tagName
     children
     cssStyleList = []

}
