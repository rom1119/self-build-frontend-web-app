import ResponseObject from "~/types/response/ResponseObject";

export default class HtmlTagResponse extends ResponseObject{
     id
     version
     project: any
     tagName
     children
     cssStyleList = []

}
