import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";

export default interface SocketApi 
{
    connect()
    onGetMessage()
    sendMessage()
    subscribeMsg(msg: string)
    
}