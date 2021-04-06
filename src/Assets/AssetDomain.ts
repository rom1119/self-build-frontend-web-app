import AggregateRoot from '../../types/AggregateRoot';
import AssetResource from './AssetResource';
import AssetApiService from '../Api/AssetApiService';
import FontFace from '../Fonts/FontFace';


export default class AssetDomain extends AggregateRoot implements AssetResource{

    public static TYPES = {
        FONT: 1,
        IMG: 2,
        CSS: 3,
        JS: 4,
    }
    projectId: string
    version: number
    format: string

    font: FontFace

    resource: string;
    file: File;
    type: number;
    api: AssetApiService

    protected _resourceUrl: string = ''

    public setApi(api: AssetApiService)
    {
        this.api = api
    }

    getId() {
        return this.id
    }
    getResourceFile(): File {
        return this.file
    }
    getResource(): string {
        return this.resource
    }
    setResource(val: string) {
        this.resource = val
    }

    get resourceUrl()
    {
        return this._resourceUrl
    }
    
    set resourceUrl(arg)
    {
        this._resourceUrl = arg
    }
    
    getResourceUrl(): string {
        return this._resourceUrl
    }
    setResourceUrl(val: string) {
        this._resourceUrl = val
    }

}