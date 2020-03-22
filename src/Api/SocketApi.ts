import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";

export default interface SocketApi 
{
    connect()
    onGetMessage(fn)
    sendMessage(projectId)
    subscribeMsg(msg: string)
    
}