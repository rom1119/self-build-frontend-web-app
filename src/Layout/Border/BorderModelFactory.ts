import BorderEl from './BorderModel';
import BorderLeft from './BorderLeft';
import BorderRight from './BorderRight';
import BorderTop from './BorderTop';
import BorderBottom from './BorderBottom';
import HtmlTag from '../HtmlTag';


export default class BorderModelFactory 
{
    public createLeft(tag: HtmlTag) : BorderLeft
    {
        return new BorderLeft(tag)
    }

    public createRight(tag: HtmlTag) : BorderRight 
    {
        return new BorderRight(tag)
    }

    public createTop(tag: HtmlTag) : BorderTop 
    {
        return new BorderTop(tag)
    }

    public createBottom(tag: HtmlTag) : BorderBottom 
    {
        return new BorderBottom(tag)
    }
}