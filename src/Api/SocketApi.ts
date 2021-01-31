import HtmlTag from "../Layout/HtmlTag";
import ResponseTreeTag from "./ResponseTreeTag";

export default interface SocketApi
{
    connect()
    onGetMessage(fn)
    sendMessage(projectId)
    setCodeType(type)
    subscribeMsg(msg: string)

}
