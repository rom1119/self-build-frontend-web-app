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
import KeyFrameSelector from './KeyFrameSelector';
import AnimationCss from '../Css/Animation/AnimationCss';
import BaseMediaQueryComponent from '../../components/BaseMediaQueryComponent';
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
        font.api = this.inst.api
        return font
    }

    public addAnimationOwnerToKeyFrame(keyFrame: KeyFrame,  animation: AnimationCss) {
        // console.log('addFontOwnerToFontFace');
        
        keyFrame.addAnimationOwnerToKeyFrame(animation)
    }
    
    public deleteAnimationOwnerFromKeyFrame(keyFrame: KeyFrame,  animation: AnimationCss) {
        // console.log('deleteFontOwnerFromFontFace');
        keyFrame.deleteAnimationOwnerFromKeyFrame(animation)

        // console.log(font);
        // console.log('deleteFontOwnerFromFontFace END');
    }

    public async addAndSave(font: KeyFrame)
    {
        font.setApi(this.api)
        font.projectId = this.projectId
        return new Promise((resolve, reject) => {
            font.api.postKeyFrame(font, this.projectId).then((res) => {
                this.addKeyFrame(font)
                font.uuid = res.data.id
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
                this.removeById(font.uuid)
            },
            () => {
                alert('Server err')
            })
        })
    }
    public updateKeyFrame(font: KeyFrame) {
        font.synchronize()
    }
    
    public addKeyFrame(font: KeyFrame)
    {
        font.setApi(this.api)
        font.projectId = this.projectId
        for (const src of font.selectorAccessor.all) {
            src.projectId = this.projectId
            src.setApi(this.api)
        }
        this.keyFrames.push(font)
    }

    public async addSelector(font: KeyFrame, src: KeyFrameSelector)
    {
        // return new Promise((resolve, reject) => {
        src.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)
        font.addSelector(src)

    }
    
    public async addSelectorAndSave(font: KeyFrame, src: KeyFrameSelector)
    {
        // return new Promise((resolve, reject) => {
        src.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)
        font.addSelectorAndSave(src)
    }
    
    public removeSelector(font: KeyFrame, src: KeyFrameSelector)
    {
        // return new Promise((resolve, reject) => {
        return font.removeSelector(src)
    }


    public removeById(id: string) {
        let propsIndex = null

        for (let i = 0; i < this.keyFrames.length; i++) {
            var el = this.keyFrames[i]
            if (el.uuid === id) {
                propsIndex = i
                break
            }
        }

        this.keyFrames.splice(propsIndex, 1);

    }


    public static getByIdStatic(id: string): KeyFrame {
        var accesor = KeyFrameAccessor.inst
        let propsIndex = null
        // console.log(accesor.fonts);

        for (let i = 0; i < accesor.keyFrames.length; i++) {
            var el = accesor.keyFrames[i]
            if (el.uuid === id) {
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

    public getById(id: string): KeyFrame
    {

        // console.log(this.getAll());

        for (const el of this.getAll()) {
            if (el.uuid === id) {
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
