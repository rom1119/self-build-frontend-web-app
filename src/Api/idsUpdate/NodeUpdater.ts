import HtmlTag from '~/src/Layout/HtmlTag';
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import IDSUpdater from '../IDSUpdater';
import CssStyleUpdater from './CssStyleUpdater';
import HtmlNode from '../../Layout/HtmlNode';
export default class NodeUpdater implements IDSUpdater<HtmlNode, HtmlTagResponse> {

    protected cssUpdater: CssStyleUpdater

    constructor() {
        this.cssUpdater = new CssStyleUpdater()
    }

    update(domain: HtmlNode, results: HtmlTagResponse) {
        let data: HtmlTagResponse = results
        // domain = <HtmlTa§>domain
        domain.uuid = data.id
        domain.shortUUID = data.shortUuid
        if (domain instanceof HtmlTag) {
            for (const cssRes of data.cssStyleList) {
                for (const cssDomain of domain.cssAccessor.all) {
                    this.cssUpdater.update(cssDomain, cssRes)
                    // if (cssDomain.getName() === cssRes.name) {
                    //     cssDomain.id = cssRes.id
                    // }
                }
            }

            for (var i = 0; i < domain.children.length; i++) {
                var domChild = <HtmlNode>domain.children[i]
                var resChild = data.children[i]
                this.update(domChild, resChild)
            }

        }
    }

}