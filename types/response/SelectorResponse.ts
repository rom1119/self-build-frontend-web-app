import ResponseObject from "~/types/response/ResponseObject";
import StyleCssValueResponse from "./StyleCssValueResponse";

export default class SelectorResponse extends ResponseObject{
     id
     value
     unitName
     name
     delimiter = ''
     mediaQueryId = null
     version
     project: any
     cssStyleList = []

}
