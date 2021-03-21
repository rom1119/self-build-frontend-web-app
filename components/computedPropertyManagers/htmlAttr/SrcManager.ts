import ColspanAttr from '~/src/Attribute/html/ColspanAttr';
import CustomAttr from '~/src/Attribute/html/CustomAttr';
import SrcAttr from '~/src/Attribute/html/SrcAttr';
import CssResource from '~/src/Css/CssResource';
import HtmlAttrManager from '../HtmlAttrManager';
import ImgTag from '../../../src/Layout/tag/ImgTag';
import TagResource from '~/src/Css/TagResource';
import HtmlTag from '~/src/Layout/HtmlTag';
import Vue from 'Vue';


export default class SrcManager extends HtmlAttrManager<SrcAttr>{
    protected createInitAttr(): SrcAttr {
        
        return new SrcAttr('', null)
    }
    public setHtmlEl(val: HtmlTag)
    {
        this.value = val

        // @ts-ignore
        // Vue.set(this, 'attr', val.srcAttr)
        // @ts-ignore
        this.attr = val.srcAttr
    }
    updateResource() {
        // super.updateCssProp(newProp)
        // @ts-ignore
        if (this.attr.file) {
            this.value.api.putTagResource(<TagResource><unknown>this.attr).then((res) => {
            //     console.log('put')
            // console.log(this.value)
            // // @ts-ignore
            // console.log(this.value.srcAttr)
            // console.log(this.attr)
                // @ts-ignore
                this.attr.setResource(res.data.resourcePath)
            })

        }

        this.value.synchronize()


    }

    deleteResource() {
        this.value.api.deleteTagResource(<TagResource><unknown>this.attr).then((res) => {
            // console.log('delete')
            // console.log(this.value)
            // // @ts-ignore
            // console.log(this.value.srcAttr)
            // console.log(this.attr)
            // @ts-ignore
            this.attr.setResource(null)

            // @ts-ignore
            this.attr.file = null
        })

        this.value.synchronize()
    }

}
