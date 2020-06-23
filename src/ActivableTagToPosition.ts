import ActivableTagTo from "./ActivableTagTo";


export default interface ActivableTagToPosition extends ActivableTagTo
{
    changeAsActiveToPosition()
    
    changeAsNotActiveToPosition()
    isActiveTagToPosition(): boolean
}