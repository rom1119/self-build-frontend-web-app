import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import HtmlTagModel from "~/types/HtmlTagModel";
import StyleCssModelResponse from '~/types/StyleCssModel';
import StyleCssModel from "~/types/StyleCssModel";
import StyleCssModelBuild from "./StyleCssModelBuild";
import StyleCssResponse from "~/types/response/StyleCssResponse";
import SelectorModel from "~/types/SelectorModel";
import SelectorResponse from "~/types/response/SelectorResponse";
import SelectorModelBuild from "./SelectorModelBuild";

export default class HtmlTagModelBuild implements ModelFromResponse<HtmlTagResponse, HtmlTagModel>{
    protected styleModelBuilder: ModelFromResponse<StyleCssResponse, StyleCssModel>
    protected selectorModelBuilder: ModelFromResponse<SelectorResponse, SelectorModel>

    constructor()
    {
        this.styleModelBuilder = new StyleCssModelBuild()
        this.selectorModelBuilder = new SelectorModelBuild()
    }

    build(from: HtmlTagResponse): HtmlTagModel {
        let model = this.buildRecursive(from, null)

        return model;
    }

    buildRecursive(from: HtmlTagResponse, parent: HtmlTagModel)
    {
        let model = new HtmlTagModel
        model.id = from.id
        model.shortUUID = from.shortUuid
        model.text = from.text
        model.isTextNode = from.isTextNode
        model.isClosingTag = from.closingTag
        model.tagName = from.tagName
        model.version = from.version
        model.attrs = from.attrs

        model.setResourcePath(from.resourcePath)
        model.setResourceUrl(from.resourceUrl)
        model.setSvgContent(from.svgContent)
        
        if (from.project) {
            model.projectId = from.project.id

        }
        if (parent) {
            parent.children.push(model)
            model.parent = parent
            model.projectId = parent.projectId
        }

        if (from.cssStyleList) {
            for (const style of from.cssStyleList) {
                let subModel = this.styleModelBuilder.build(style)
                model.styles.push(subModel)
            }
        }
        
        if (from.pseudoSelectors) {
            for (const style of from.pseudoSelectors) {
                let subModel = this.selectorModelBuilder.build(style)
                model.selectors.push(subModel)
            }
        }
        
        if (from.children) {
            var sortedChilderen = []
            sortedChilderen = from.children.sort( 
                ( childA, childB ) => {
                if ( childA.orderNumber < childB.orderNumber ){
                    return -1;
                }
                if ( childA.orderNumber > childB.orderNumber ){
                    return 1;
                }
                return 0;
                }
            );
            from.children = sortedChilderen
            for (const el of from.children) {
                this.buildRecursive(el, model)
            }
        }

        return model
    }

}
