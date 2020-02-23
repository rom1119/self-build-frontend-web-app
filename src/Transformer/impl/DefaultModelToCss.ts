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
export default class DefaultModelToCss implements ModelToCss
{

    private cssFactoryFromName: CssPropertyFactoryFromName
    // private styleTransformer: ModelToCss

    constructor()
    {
        this.cssFactoryFromName = new CssPropertyFactoryFromName()
        // this.styleTransformer = new HtmlTagFactoryFromName()
    }

    transform(model: StyleCss): BasePropertyCss {
        var domain = this.cssFactoryFromName.create(model.getKey())

        console.log(domain);
        
                    
        return domain

    }
   
}