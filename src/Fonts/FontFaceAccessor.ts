import HtmlTag from '../Layout/HtmlTag';

import SelectorOwner from '../SelectorOwner';
import Vue from 'vue';
import DefaultMediaQueryApiService from '../Api/impl/DefaultMediaQueryApiService';
import MediaQueryApiService from '../Api/MediaQueryApiService';
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import SubscriberMediaAccessor from "~/src/MediaQuery/SubscriberMediaAccessor";
import FontFace from './FontFace';
import DefaultFontFaceApiService from '../Api/impl/DefaultFontFaceApiService';
import FontFaceApiService from '../Api/FontFaceApiService';
import AssetDomain from '../Assets/AssetDomain';
import SrcFont from './SrcFont';
export default class FontFaceAccessor
{
    
    protected projectId: string = ''
    protected fonts: FontFace[] = []
    protected api: DefaultFontFaceApiService

    protected static inst: FontFaceAccessor

    private constructor(projectId) {
        // this.tag = val
        Vue.set(this, 'fonts', [])
        // Vue.set(this, 'subscribers', [])
        this.projectId = projectId
        this.api = new DefaultFontFaceApiService()

    }

    
    public static getInstance(projectId: string): FontFaceAccessor {
        if (this.inst == null) {
            this.inst = new FontFaceAccessor(projectId)
        }

        return this.inst
    }

    updateSrcResurceUrl(font: FontFace, src: SrcFont) {
        font.updateSrcResurceUrl(src)
    }
    updateResource(font: FontFace, src: SrcFont) {
        // super.updateCssProp(newProp)
        // @ts-ignore
        if (src.file) {
            return font.updateSrcFile(src)

        }


    }

    public deleteResource(font: FontFace, src: SrcFont) {
        font.deleteSrcFile(src)
    }

    public static NEW_DEFAULT_INSTANCE(): FontFace{
        var font = new FontFace()
        font.name = 'test name font'
        return font
    }

    public async addFontAndSave(font: FontFace)
    {
        font.setApi(this.api)
        font.projectId = this.projectId
        return new Promise((resolve, reject) => {
            font.api.postFontFace(font, this.projectId).then((res) => {
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
    
    public async addFontSrcAndSave(font: FontFace, src: SrcFont)
    {
        // return new Promise((resolve, reject) => {
        font.addSrcAndSave(src)
    }
    
    public removeFontSrcAndSave(font: FontFace, src: SrcFont)
    {
        // return new Promise((resolve, reject) => {
        return font.removeSrcAndSave(src)
    }

    public removeFont(font: FontFace) {
        return new Promise((resolve, reject) => {
            font.api.deleteFontFace(font).then(() => {
                this.removeById(font.id)
            },
            () => {
                alert('Server err')
            })
        })
    }
    public updateFont(font: FontFace) {
        font.synchronize()
    }
    
    public addFont(font: FontFace)
    {
        font.setApi(this.api)
        font.projectId = this.projectId
        for (const src of font.src) {
            src.projectId = this.projectId
        }
        this.fonts.push(font)
    }


    public removeById(id: number) {
        let propsIndex = null

        for (let i = 0; i < this.fonts.length; i++) {
            var el = this.fonts[i]
            if (el.id === id) {
                propsIndex = i
                break
            }
        }

        this.fonts.splice(propsIndex, 1);

    }

    protected getFontById(id: number) {
        let propsIndex = null

        for (let i = 0; i < this.fonts.length; i++) {
            var el = this.fonts[i]
            if (el.id === id) {
                return el
            }
        }
    }

    public getApi(): FontFaceApiService
    {
        return this.api
    }

    public getAll(): FontFace[]
    {
        return this.fonts
    }

    get all(): FontFace[]
    {
        return this.fonts
    }

    public getById(id: number): FontFace
    {

        // console.log(this.getAll());

        for (const el of this.getAll()) {
            if (el.id === id) {
                return el
            }
        }

        return null
    }

    public replaceAll(newCssList: FontFace[])
    {
        this.fonts = newCssList
    }
}
