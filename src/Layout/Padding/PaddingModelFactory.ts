import BorderEl from './PaddingModel';
import PaddingLeft from './PaddingLeft';
import PaddingRight from './PaddingRight';
import PaddingTop from './PaddingTop';
import PaddingBottom from './PaddingBottom';


export default class PaddingModelFactory 
{
    public createLeft() : PaddingLeft
    {
        return new PaddingLeft
    }

    public createRight() : PaddingRight 
    {
        return new PaddingRight
    }

    public createTop() : PaddingTop 
    {
        return new PaddingTop
    }

    public createBottom() : PaddingBottom 
    {
        return new PaddingBottom
    }
}