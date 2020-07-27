import ResponseObject from "~/types/response/ResponseObject";
import StyleCssValueResponse from "./StyleCssValueResponse";

export default class SelectorResponse extends ResponseObject{
     id
     value
     name
     version
     project: any
     cssStyleList = []

}