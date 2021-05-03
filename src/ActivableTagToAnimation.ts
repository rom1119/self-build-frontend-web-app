import ActivableTagTo from "./ActivableTagTo";


export default interface ActivableTagToAnimation extends ActivableTagTo
{
    changeAsActiveToAnimation()
    
    changeAsNotActiveToAnimation()
    isActiveTagToAnimation(): boolean

    changeAsReadyToAnimationCheck()
    
    changeAsNotReadyToAnimationCheck()
    isReadyToStartAnimation(): boolean

    changeAsStartAnimation()
    
    changeAsStopAnimation()
    
    isReadyToStartAnimation(): boolean
}