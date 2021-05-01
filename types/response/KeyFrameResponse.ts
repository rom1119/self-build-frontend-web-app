import ResponseObject from "~/types/response/ResponseObject";
import StyleCssValueResponse from "./StyleCssValueResponse";
import SelectorResponse from "./SelectorResponse";

export default class KeyFrameResponse extends ResponseObject{
     id
     version
     name
     shortUuid
     value
     project: any
     selectorList: SelectorResponse[]
}
