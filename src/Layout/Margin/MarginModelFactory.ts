
import HtmlTag from '../HtmlTag';
import MarginTop from './MarginTop';
import MarginLeft from './MarginLeft';
import MarginRight from './MarginRight';
import MarginBottom from './MarginBottom';


export default class MarginModelFactory 
{
    public createLeft(tag: HtmlTag) : MarginLeft
    {
        return new MarginLeft(tag)
    }

    public createRight(tag: HtmlTag) : MarginRight 
    {
        return new MarginRight(tag)
    }

    public createTop(tag: HtmlTag) : MarginTop 
    {
        return new MarginTop(tag)
    }

    public createBottom(tag: HtmlTag) : MarginBottom 
    {
        return new MarginBottom(tag)
    }
}