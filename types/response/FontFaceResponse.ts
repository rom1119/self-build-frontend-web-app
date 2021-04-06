import ResponseObject from "~/types/response/ResponseObject";
import AssetResponse from "./AssetResponse";
import StyleCssValueResponse from "./StyleCssValueResponse";

export default class FontFaceResponse extends ResponseObject{
     id
     project: any

     version
     name
     
     src: AssetResponse[]

}
