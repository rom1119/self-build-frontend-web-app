import ResponseObject from "~/types/response/ResponseObject";
import StyleCssValueResponse from "./StyleCssValueResponse";

export default class StyleCssResponse extends ResponseObject{
     id
     name
     mediaQuery: {[id: string]: number}
     children: StyleCssResponse[]
     value
     cssValues: StyleCssValueResponse[]
     unitName
     valueSecond
     unitNameSecond
     valueThird
     unitNameThird

     valueFourth
     unitNameFourth
     
     valueFifth
     unitNameFifth
     multipleValue
     resourcePath
     resourceUrl

}
