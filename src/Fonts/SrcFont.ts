import AssetDomain from '../Assets/AssetDomain';
import FontFace from './FontFace';


export default class SrcFont extends AssetDomain {
    
    resourceError: string = null

    public clearErrors()
    {
        this.resourceError = null
    }
}