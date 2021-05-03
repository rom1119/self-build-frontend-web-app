import SizeActivable from './SizeActivable';
import DeletableEl from './ActivableTagToManage';
import ActivableTagToManage from './ActivableTagToManage';
import ActivableTagTo from './ActivableTagTo';
import ActiveToController from './ActiveToController';


export default interface ActiveToAnimationController<T extends ActivableTagTo> extends ActiveToController<T>
{

    updateReadyToCheckTag(elToActive: T) 
    deactiveReadyToCheckTag()

    updateStartAnimation(elToActive: T) 
    deactiveStartAnimation()


}