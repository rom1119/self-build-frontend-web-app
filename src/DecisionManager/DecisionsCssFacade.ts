import HtmlTag from "../Layout/HtmlTag"
import CssPropManager from "./impl/CssPropDecisionMaker"
import DecisionManager from './DecisionManager';
import CssDecisionObject from './decisionObjects/CssDecisionObject';
import CssDecisionObjectFactory from './impl/CssDecisionObjectFactory';
import { css } from 'js-beautify';
import BasePropertyCss from '../Css/BasePropertyCss';
import Width from '../Css/Size/Width';
import Height from "../Css/Size/Height";
import { MinWidth, MaxWidth, MinHeight, MaxHeight } from "../Css";



export default class DecisionsCssFacade {
    
    
    protected tag: HtmlTag
    protected cssDecisionManager: DecisionManager<CssDecisionObject>
    protected cssDecisionObjectFactory: CssDecisionObjectFactory

    constructor(tag: HtmlTag) {
        this.tag = tag
        this.cssDecisionManager = new CssPropManager(tag)
        this.cssDecisionObjectFactory = new CssDecisionObjectFactory()
    }

    canManageCss(css: BasePropertyCss) {

        var decObj = this.cssDecisionObjectFactory.create(css.getName())
        if (!decObj) {
            throw Error('Not implemented method for not exists Decision Object')
        }
        return this.cssDecisionManager.canManage(decObj)
    }

    canManageContentBoxCss() {
        var w = new Width(null, null)
        var mw = new MinWidth(null, null)
        var maw = new MaxWidth(null, null)
        var h = new Height(null, null)
        var mh = new MinHeight(null, null)
        var mah = new MaxHeight(null, null)
        return this.canManageCss(w) &&
                this.canManageCss(mw) &&
                this.canManageCss(maw) &&
                this.canManageCss(h) &&
                this.canManageCss(mh) &&
                this.canManageCss(mah)
    }
}