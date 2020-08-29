import ResponseObject from "~/types/response/ResponseObject";
import StyleCssValueResponse from "./StyleCssValueResponse";

export default class StyleCssResponse extends ResponseObject{
     id
     name
     children: StyleCssResponse[]
     value
     cssValues: StyleCssValueResponse[]
     unitName
     valueSecond
     unitNameSecond
     valueThird
     unitNameThird
     multipleValue
     resourcePath
     resourceUrl

}
