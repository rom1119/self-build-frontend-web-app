import BorderEl from './MarginEl';
import Left from '~/src/Site/Left';
import Right from '~/src/Site/Right';
import Bottom from '~/src/Site/Bottom';
import Top from '~/src/Site/Top';

export default class MarginElFactory 
{
    public createLeft() : BorderEl<Left> 
    {
        return new BorderEl<Left>()
    }

    public createRight() : BorderEl<Right> 
    {
        return new BorderEl<Right>()
    }

    public createTop() : BorderEl<Top> 
    {
        return new BorderEl<Top>()
    }

    public createBottom() : BorderEl<Bottom> 
    {
        return new BorderEl<Bottom>()
    }
}