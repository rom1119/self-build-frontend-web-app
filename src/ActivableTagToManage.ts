import ActivableTagTo from "./ActivableTagTo";


export default interface ActivableTagToManage extends ActivableTagTo
{
    changeAsActiveToManage()
    
    changeAsNotActiveToManage()
    isActiveTagToManage(): boolean

}