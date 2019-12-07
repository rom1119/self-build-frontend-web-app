import BorderEl from './PaddingModel';
import PaddingLeft from './PaddingLeft';
import PaddingRight from './PaddingRight';
import PaddingTop from './PaddingTop';
import PaddingBottom from './PaddingBottom';
import HtmlTag from '../HtmlTag';


export default class PaddingModelFactory 
{
    public createLeft(tag: HtmlTag) : PaddingLeft
    {
        return new PaddingLeft(tag)
    }

    public createRight(tag: HtmlTag) : PaddingRight 
    {
        return new PaddingRight(tag)
    }

    public createTop(tag: HtmlTag) : PaddingTop 
    {
        return new PaddingTop(tag)
    }

    public createBottom(tag: HtmlTag) : PaddingBottom 
    {
        return new PaddingBottom(tag)
    }
}