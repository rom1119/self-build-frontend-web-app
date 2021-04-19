import ActivableTagTo from "./ActivableTagTo";


export default interface ActivableTagToAnimation extends ActivableTagTo
{
    changeAsActiveToAnimation()
    
    changeAsNotActiveToAnimation()
    isActiveTagToAnimation(): boolean

    changeAsReadyToAnimationCheck()
    
    changeAsReadyToAnimationCheck()
    isReadyToAnimationCheck(): boolean
}