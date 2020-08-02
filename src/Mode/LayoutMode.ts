import HtmlTag from '../Layout/HtmlTag';
import ModeAction from './ModeAction';
export default abstract class LayoutMode
{
    protected treeHtmlTag: HtmlTag[]
    protected value = 0
    protected name = ''

  

    public abstract canRun(action: ModeAction)
    public abstract getName()


}