import SizeElController from "../SizeElController"
import MoveEventController from "../MoveEventController"
import MouseMoveTagEventSource from "./MouseMoveTagEventSource"
import ContentElSizeController from "./ContentElSizeController"
import BorderElSizeController from "./BorderElSizeController"
import PaddingElSizeController from "./PaddingElSizeController"
import MarginElSizeController from "./MarginElSizeController"
import HtmlTagMoveEventController from "./HtmlTagMoveEventController"
import BorderModel from "../Layout/Border/BorderModel"
import HtmlTag from "../Layout/HtmlTag"
import PaddingModel from "../Layout/Padding/PaddingModel"
import MarginModel from "../Layout/Margin/MarginModel"

export default class AdvisorTagController
{

    contentElSizeController: SizeElController = new ContentElSizeController()
    borderElSizeController: SizeElController = new BorderElSizeController()
    paddingElSizeController: SizeElController = new PaddingElSizeController()
    marginElSizeController: SizeElController = new MarginElSizeController()
    tagMoveController: MoveEventController<MouseMoveTagEventSource>

    protected _hasCtrlKey: boolean = false

    constructor()
    {
        this.tagMoveController= new HtmlTagMoveEventController(this.hasCtrlKey)
    }

    get hasCtrlKey(): boolean
    {
        return this._hasCtrlKey
    }
    
    set hasCtrlKey(args: boolean)
    {
        (<HtmlTagMoveEventController>this.tagMoveController).ctrlKeyDown = args
        this._hasCtrlKey = args
    }

    
    advise(eventName, el?) {
        if (this.contentElSizeController.hasActiveEl()) {
            return this.contentElSizeController
        } else if (this.borderElSizeController.hasActiveEl()) {
            return this.borderElSizeController
        } else if (this.paddingElSizeController.hasActiveEl()) {
            return this.paddingElSizeController
        } else if (this.marginElSizeController.hasActiveEl()) {
            return this.marginElSizeController
        } else if ((<HtmlTagMoveEventController>this.tagMoveController).hasActiveEl()) {
            return this.tagMoveController
        }

        if (el == null) {
            return null
        }

        if (this.hasCtrlKey) {
            return this.tagMoveController
        }

        if (el instanceof BorderModel) {
            return this.borderElSizeController
        }
        
        if (el instanceof HtmlTag) {
            return this.contentElSizeController
        }
        
        if (el instanceof PaddingModel) {
            return this.paddingElSizeController
        }
        
        if (el instanceof MarginModel) {
            return this.marginElSizeController
        }

        if (el == null) {
            throw Error(`Unable to choose ActiveElController for event || ${eventName} ||`)
        }
    }
}