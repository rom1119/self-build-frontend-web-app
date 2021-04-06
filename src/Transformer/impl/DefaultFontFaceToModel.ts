import BaseModel from '~/types/BaseModel';
import DomainToModel from '../DomainToModel';
import LayoutEl from '~/src/LayoutEl';
import TagDto from '../../Api/TagDto';
import ModelToDomain from '../ModelToDomain';
import HtmlTagFactoryFromName from '~/src/Layout/HtmlTagFactoryFromName';
import ModelToCss from '../ModelToCss';
import BasePropertyCss from '../../Css/BasePropertyCss';
import StyleCss from '~/src/Api/StyleCss';
import CssPropertyFactoryFromName from '~/src/Factory/CssPropertyFactoryFromName';
import UnitCssPropertyFactoryFromName from '~/src/Factory/UnitCssPropertyFactoryFromName';
import CssToModel from '../CssToModel';
import StyleCssModel from '~/types/StyleCssModel';
import CssDoubleValue from '../../Css/CssDoubleValue';
import CssTripleValue from '~/src/Css/CssTripleValue';
import BaseBorderCss from '../../Css/Border/BaseBorderCss';
import CssResource from '~/src/Css/CssResource';
import CssMultipleValue from '../../Css/CssMultipleValue';
import { BaseShadowStruct } from '~/src/Css/Shadow/BaseShadowCss';
import StyleCssValue from '../../Api/StyleCssValue';
import { TextShadowStruct } from '~/src/Css/Shadow/TextShadowCss';
import TextShadowCss from '../../Css/Shadow/TextShadowCss';
import BoxShadowCss, { BoxShadowStruct } from '~/src/Css/Shadow/BoxShadowCss';
import TransitionCss, { TransitionStruct } from '~/src/Css/Animation/TransitionCss';
import BackgroundImage from '../../Css/Background/BackgroundImage';
import { BaseGradientStructVal } from '~/src/Css/Gradient/BaseGradientCss';
import LinearGradientCss, { LinearGradientDirection, LinearGradientStructVal } from '../../Css/Gradient/impl/LinearGradientCss';
import RadialGradientCss, { RadialGradientStructVal, RadialGradientDirection } from '~/src/Css/Gradient/impl/RadialGradientCss';
import { Named } from '~/src/Unit';
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import AssetToModel from '../AssetToModel';
import AssetDomain from '../../Assets/AssetDomain';
import AssetModel from '~/types/AssetModel';
import FontFaceToModel from '../FontFaceToModel';
import FontFaceModel from '../../../types/FontFaceModel';
import FontFace from '../../Fonts/FontFace';
import DefaultAssetToModel from './DefaultAssetToModel';
export default class DefaultFontFaceToModel implements FontFaceToModel
{
    private assetTransformer: AssetToModel

    constructor()
    {

        this.assetTransformer = new DefaultAssetToModel()
    }

    transform(domain: FontFace): FontFaceModel {
        // var value = domain.getClearValue()
        // if (typeof value === 'object') {
        //     value = JSON.stringify(value)
        // }
        let model = new FontFaceModel()
        model.id = domain.id
        model.version = domain.version
        model.name = domain.name

        var srcList = []
        for (const srcEl of domain.src) {
            let srcModel = this.assetTransformer.transform(srcEl)
            
            srcList.push(srcModel)
        }

        
        
        model.src = srcList
        console.log('TRASFORM');
        console.log(domain);

        // @ts-ignore

        // this.cssFactoryFromName.create(model.getKey())
        // var unit = this.unitCssFactoryFromName.create(model.getUnitName())
        // domain.setValue(model.getValue())
        // domain.setUnit(unit)
        // domain.id = model.id

        // console.log(domain);

        return model

    }



}
