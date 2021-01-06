import ResponseObject from "~/types/response/ResponseObject";
import StyleCssValueResponse from "./StyleCssValueResponse";
import HtmlTagResponse from "./HtmlTagResponse";
import SelectorResponse from "./SelectorResponse";

export default class MediaQueryResponse extends ResponseObject{
     id
     name
     value
     version
     color
     colorUnitName
     project: any
     tags: HtmlTagResponse[]
     selectors: SelectorResponse[]
     cssValues: StyleCssValueResponse[]

}
