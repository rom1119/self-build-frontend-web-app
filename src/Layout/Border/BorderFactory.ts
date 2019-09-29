import BorderEl from './Border';
import BorderLeft from './BorderLeft';
import BorderRight from './BorderRight';
import BorderTop from './BorderTop';
import BorderBottom from './BorderBottom';


export default class BorderElFactory 
{
    public createLeft() : BorderLeft
    {
        return new BorderLeft
    }

    public createRight() : BorderRight 
    {
        return new BorderRight
    }

    public createTop() : BorderTop 
    {
        return new BorderTop
    }

    public createBottom() : BorderBottom 
    {
        return new BorderBottom
    }
}