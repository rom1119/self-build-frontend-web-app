import HtmlTag from '../Layout/HtmlTag';
import ModeAction from './ModeAction';
import LayoutCreatorAction from './LayoutCreatorAction';
export default abstract class LayoutMode
{
    protected treeHtmlTag: HtmlTag[]
    protected value = 0
    protected name = ''

  

    public abstract canRun(action: ModeAction)
    public abstract canRunSystemAction(action: LayoutCreatorAction)
    public abstract getName()
    public abstract disable()
    public abstract enable()
    public abstract getLabel()


}