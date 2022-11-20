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
import CssWithTwoValues from '~/src/Css/MultiValuesCss/CssWithTwoValues';
import CssWithThreeValues from '~/src/Css/MultiValuesCss/CssWithThreeValues';
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
import SrcFont from '../../Fonts/SrcFont';
export default class DefaultModelToAsset implements ModelToAsset {
    protected domainAsSrcFont = false

    constructor() {

    }
    setDomainAsSrcFont(arg: boolean) {
        this.domainAsSrcFont = arg
    }


    transform(model: AssetModel): AssetDomain {
        var domain
        // console.log(domain);

        if (this.domainAsSrcFont) {
            domain = new SrcFont()
        } else {
            domain = new AssetDomain()

        }
        domain.id = model.id
        domain.version = model.version
        domain.projectId = model.projectId
        domain.format = model.format
        domain.type = model.type

        domain.setResource(model.getResourcePath())
        //@ts-ignore
        domain.setResourceUrl(model.getResourceUrl())


        return domain

    }

}
