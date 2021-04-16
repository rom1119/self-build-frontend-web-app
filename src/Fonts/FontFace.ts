import AssetDomain from '../Assets/AssetDomain';
import FontFaceApiService from '../Api/FontFaceApiService';
import FontFaceSynchronizer from '../Synchronizer/Impl/FontFaceSynchronizer';
import SrcFont from './SrcFont';
import DefaultFontFaceApiService from '../Api/impl/DefaultFontFaceApiService';
import FontFaceOwner from './FontFaceOwner';


export default class FontFace
{
    id: number = null
    projectId: string

    version: number = 0

    name: string = ''
    src: SrcFont[]
    owners:  { [key: number]: number[]}

    api: DefaultFontFaceApiService
    synchronizer: FontFaceSynchronizer

    protected _countOwners: number = 0
    constructor()
    {
        this.src = []
        this.owners = {}
    }

    isUsedInFontFamily() {
        return this.countOwners > 0
    }

    public updateCountOwners() {
        var size = 0,
        key;
        for (key in this.owners) {
            if (this.owners.hasOwnProperty(key)) size++;
        }
        this._countOwners = size
    }
    get countOwners(): number {
        
        return this._countOwners;
    
    }
    // set countOwners(arg) {
        
    //     this._countOwners = arg;
    
    // }

    public setApi(api: DefaultFontFaceApiService)
    {
        this.api = api
        this.synchronizer = new FontFaceSynchronizer(this, api)
        for (const el of this.src) {
            el.setApi(api)
        }
    }

    public getSrcById(id): SrcFont
    {
        for (var el of this.src) {
            if (id === el.id) {
                return el
            }
        }

        return null
    }

    public initSrc(src: SrcFont) {
        src.setApi(this.api)
        src.type = SrcFont.TYPES.FONT
        src.font = this
        src.projectId = this.projectId

    }
    public addSrc(src: SrcFont) {
        this.initSrc(src)
        this.src.push(src)

    }

    public addSrcAndSave(src: SrcFont)
    {
        this.initSrc(src)
        this.api.postAsset(src).then(
            (res) => {
                this.addSrc(src)
                src.id = res.data.id                
            },
            (err) => {
                
            }
        )
    }
    
    
    public updateSrc(src: SrcFont)
    {

        this.api.putAsset(src)
    }
    
    public removeSrcAndSave(src: SrcFont)
    {

        this.api.deleteAsset(src).then(
            (res) => {
                var indx = null
                for (let i = 0; i < this.src.length; i++) {
                    var el = this.src[i]
                    if (src.id === el.id) {
                        indx = i
                        break
                    }
                }
                if (indx != null) {
                    this.src.splice(indx, 1)
                }
                
            },
            (err) => {
                
            }
        )
    }
    
    public updateSrcFile(src: SrcFont)
    {
        return this.api.postFontFaceSrcResource(this, src)
    }
    
    public updateSrcResurceUrl(src: SrcFont)
    {
        
        this.api.putAsset(src)
    }
    
    public deleteSrcFile(src: SrcFont)
    {
        this.api.deleteFontFaceSrcResource(this, src).then(() => {
            src.file = null
            src.resource = null
        })
    }

    public synchronize()
    {
        if (this.synchronizer) {
            this.synchronizer.synchronize()
        }
    }

    private savePromise() : Promise<any>
    {

        return this.api.postFontFace(this, this.projectId)
    }

    public saveApi()
    {

            // this.setAsNowReadyToSynchronize()
        return new Promise((resolve, reject) => {

            this.savePromise().then(
                (res) => {
                    // console.log('success');
                    // console.log(res);
                    var resValues = res.data.cssValues
                    this.id = res.data.id
                    // this.updateCssIds(res.data.cssStyleList, this.model.cssAccessor.all)
                

                    resolve(res)


                },
                (arg) => {
                    reject()
                    // console.log('error');
                    // console.log(arg);


                }
            )

        } )

    }

    
}