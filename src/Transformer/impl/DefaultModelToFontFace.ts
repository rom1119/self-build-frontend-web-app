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
import CssDoubleValue from '~/src/Css/CssDoubleValue';
import CssTripleValue from '~/src/Css/CssTripleValue';
import BaseBorderCss from '~/src/Css/Border/BaseBorderCss';
import RGBA from '../../Unit/Color/RGBA';
import CssResource from '~/src/Css/CssResource';
import TextShadowCss, { TextShadowStruct } from '~/src/Css/Shadow/TextShadowCss';
import CssMultipleValue from '~/src/Css/CssMultipleValue';
import RGB from '~/src/Unit/Color/RGB';
import BoxShadowCss, { BoxShadowStruct } from '~/src/Css/Shadow/BoxShadowCss';
import StyleCssModel from '~/types/StyleCssModel';
import TransitionCss, { TransitionStruct } from '~/src/Css/Animation/TransitionCss';
import TimingFunctionFactoryFromName from '~/src/Factory/TimingFunctionFactoryFromName';
import { BackgroundImage } from '~/src/Css';
import BaseGradientCss from '../../Css/Gradient/BaseGradientCss';
import { RadialGradientStructVal, RadialGradientDirection } from '~/src/Css/Gradient/impl/RadialGradientCss';
import { LinearGradientStructVal, LinearGradientDirection } from '~/src/Css/Gradient/impl/LinearGradientCss';
import LinearGradientCss from '../../Css/Gradient/impl/LinearGradientCss';
import StyleCssValue from '~/src/Api/StyleCssValue';
import RadialGradientCss from '../../Css/Gradient/impl/RadialGradientCss';
import ModelToAsset from '../ModelToAsset';
import AssetDomain from '../../Assets/AssetDomain';
import AssetModel from '~/types/AssetModel';
import ModelToFontTace from '../ModelToFontTace';
import FontFaceModel from '../../../types/FontFaceModel';
import FontFace from '../../Fonts/FontFace';
import DefaultModelToAsset from './DefaultModelToAsset';
import SrcFont from '../../Fonts/SrcFont';
export default class DefaultModelToFontFace implements ModelToFontTace
{

    private assetTransformer: ModelToAsset

    constructor()
    {
        this.assetTransformer = new DefaultModelToAsset()
    }

    transform(model: FontFaceModel): FontFace {
        var domain = new FontFace()
        // console.log(domain);

 
        domain.id = model.id
        domain.version = model.version
        domain.name = model.name

        this.assetTransformer.setDomainAsSrcFont(true)

        var srcList = []
        for (const srcEl of model.src) {
            let srcModel = this.assetTransformer.transform(srcEl)
            
            domain.addSrc(<SrcFont>srcModel)
        }
// console.log('TRANS');
// console.log(domain);
// console.log(model);

        // domain.src = srcList


        return domain

    }

}