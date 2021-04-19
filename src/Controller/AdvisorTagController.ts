import SizeElController from "../SizeElController"
import MoveEventController from "../MoveEventController"
import MouseMoveTagEventSource from "./MouseMoveTagEventSource"
import ContentElSizeController from "./Size/ContentElSizeController"
import BorderElSizeController from "./Size/BorderElSizeController"
import PaddingElSizeController from "./Size/PaddingElSizeController"
import MarginElSizeController from "./Size/MarginElSizeController"
import HtmlTagMoveEventController from "./HtmlTagMoveEventController"
import BorderModel from "../Layout/Border/BorderModel"
import HtmlTag from "../Layout/HtmlTag"
import PaddingModel from "../Layout/Padding/PaddingModel"
import MarginModel from "../Layout/Margin/MarginModel"
import TableColumnSizeController from "~/src/Controller/Size/TableColumnSizeController";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import TableRowSizeController from "~/src/Controller/Size/TableRowSizeController";
import TableRowEl from "~/src/Layout/tag/Table/elements/TableRowEl";
import LayoutCreatorModeComponent from '../../components/LayoutCreatorModeComponent.vue';

export default class AdvisorTagController {

    contentElSizeController: SizeElController = new ContentElSizeController()
    tableColumnSizeController: SizeElController = new TableColumnSizeController()
    tableRowSizeController: SizeElController = new TableRowSizeController()
    borderElSizeController: SizeElController = new BorderElSizeController()
    paddingElSizeController: SizeElController = new PaddingElSizeController()
    marginElSizeController: SizeElController = new MarginElSizeController()
    tagMoveController: MoveEventController<MouseMoveTagEventSource>

    protected _hasShiftKey: boolean = false
    protected _creatorMode: LayoutCreatorModeComponent

    constructor(creatorMode: LayoutCreatorModeComponent) {
        this.tagMoveController = new HtmlTagMoveEventController(this.hasShiftKey)
        this._creatorMode = creatorMode
    }

    get hasShiftKey(): boolean {
        return this._hasShiftKey
    }

    set hasShiftKey(args: boolean) {
        (<HtmlTagMoveEventController>this.tagMoveController).shiftKeyDown = args
        this._hasShiftKey = args
    }


    advise(eventName, el?) {
        if (this.contentElSizeController.hasActiveEl()) {
            return this.contentElSizeController
        } else if (this.tableColumnSizeController.hasActiveEl()) {
            return this.tableColumnSizeController
        } else if (this.tableRowSizeController.hasActiveEl()) {
            return this.tableRowSizeController
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

        if (this.hasShiftKey) {
            return this.tagMoveController
        }

        if (el instanceof BorderModel) {
            return this.borderElSizeController
        }

        if (el instanceof PaddingModel) {
            return this.paddingElSizeController
        }

        if (el instanceof MarginModel) {
            return this.marginElSizeController
        }

        if (el instanceof TableColumnEl) {
            return this.tableColumnSizeController
        }

        if (el instanceof TableRowEl) {
            return this.tableRowSizeController
        }

        if (el instanceof HtmlTag) {
            return this.contentElSizeController
        }

        if (el == null) {
            throw Error(`Unable to choose ActiveElController for event || ${eventName} ||`)
        }
    }
}
