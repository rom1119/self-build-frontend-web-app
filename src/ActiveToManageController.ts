import SizeActivable from './SizeActivable';
import DeletableEl from './ActivableTagToManage';
import ActivableTagToManage from './ActivableTagToManage';


export default interface ActiveToManageController
{
    

    updateActiveTag(elToActive: ActivableTagToManage) 
    

    deactiveTag(val: ActivableTagToManage)


}