import SizeActivable from './SizeActivable';
import DeletableEl from './ActivableTagToManage';
import ActivableTagToManage from './ActivableTagToManage';
import ActivableTagTo from './ActivableTagTo';


export default interface ActiveToController<T extends ActivableTagTo>
{
    

    updateActiveTag(elToActive: T) 
    
    deactiveTag()


}