import HtmlTag from '../Layout/HtmlTag';

import SelectorOwner from '../SelectorOwner';
import Vue from 'vue';
import DefaultMediaQueryApiService from '../Api/impl/DefaultMediaQueryApiService';
import MediaQueryApiService from '../Api/MediaQueryApiService';
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import SubscriberMediaAccessor from "~/src/MediaQuery/SubscriberMediaAccessor";
import DefaultFontFaceApiService from '../Api/impl/DefaultFontFaceApiService';
import FontFaceApiService from '../Api/FontFaceApiService';
import AssetDomain from '../Assets/AssetDomain';
import FontFamily from '../Css/Text/FontFamily';
import KeyFrame from './KeyFrame';
import DefaultKeyFrameApiService from '../Api/impl/DefaultKeyFrameApiService';
import KeyFrameApiService from '../Api/KeyFrameApiService';
export default class KeyFrameAccessor
{
    
    protected projectId: string = ''
    keyFrames: KeyFrame[] = []
    protected api: DefaultKeyFrameApiService

    protected static inst: KeyFrameAccessor = null

    private constructor(projectId) {
        // this.tag = val
        Vue.set(this, 'keyFrames', [])
        // Vue.set(this, 'subscribers', [])
        this.projectId = projectId
        this.api = new DefaultKeyFrameApiService()

    }

    
    public static getInstance(): KeyFrameAccessor {

        return this.inst
    }
    public static createInstance(projectId: string): KeyFrameAccessor {
        this.inst = new KeyFrameAccessor(projectId)
        

        return this.getInstance()
    }

  

    public static NEW_DEFAULT_INSTANCE(): KeyFrame{
        var font = new KeyFrame()
        font.name = 'test_animation'
        return font
    }

    public async addAndSave(font: KeyFrame)
    {
        font.setApi(this.api)
        font.projectId = this.projectId
        return new Promise((resolve, reject) => {
            font.api.postKeyFrame(font, this.projectId).then((res) => {
                this.addFont(font)
                font.id = res.data.id
                // console.log('addFontAndSave');
                // console.log(res.data);
                
            },
            () => {
                alert('Server err')
            })
        })
    }
    


    public removeKeyFrame(font: KeyFrame) {
        return new Promise((resolve, reject) => {
            font.api.deleteKeyFrame(font).then(() => {
                this.removeById(font.id)
            },
            () => {
                alert('Server err')
            })
        })
    }
    public updateKeyFrame(font: KeyFrame) {
        font.synchronize()
    }
    
    public addFont(font: KeyFrame)
    {
        font.setApi(this.api)
        font.projectId = this.projectId
        for (const src of font.selectorAccessor.all) {
            src.projectId = this.projectId
        }
        this.keyFrames.push(font)
    }


    public removeById(id: number) {
        let propsIndex = null

        for (let i = 0; i < this.keyFrames.length; i++) {
            var el = this.keyFrames[i]
            if (el.id === id) {
                propsIndex = i
                break
            }
        }

        this.keyFrames.splice(propsIndex, 1);

    }


    public static getFontByIdStatic(id: number): KeyFrame {
        var accesor = KeyFrameAccessor.inst
        let propsIndex = null
        // console.log(accesor.fonts);

        for (let i = 0; i < accesor.keyFrames.length; i++) {
            var el = accesor.keyFrames[i]
            if (el.id === id) {
                return el
            }
        }
    }

    protected getFontById(id: number) {
        let propsIndex = null

        for (let i = 0; i < this.keyFrames.length; i++) {
            var el = this.keyFrames[i]
            if (el.id === id) {
                return el
            }
        }
    }

    public getApi(): KeyFrameApiService
    {
        return this.api
    }

    public getAll(): KeyFrame[]
    {
        return this.keyFrames
    }

    get all(): KeyFrame[]
    {
        return this.keyFrames
    }

    public getById(id: number): KeyFrame
    {

        // console.log(this.getAll());

        for (const el of this.getAll()) {
            if (el.id === id) {
                return el
            }
        }

        return null
    }

    public replaceAll(newCssList: KeyFrame[])
    {
        this.keyFrames = newCssList
    }
}
