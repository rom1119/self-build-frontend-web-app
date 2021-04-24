import HtmlTag from '~/src/Layout/HtmlTag';
import HtmlTagResponse from '~/types/response/HtmlTagResponse';
import IDSUpdater from '../IDSUpdater';
import CssStyleUpdater from './CssStyleUpdater';
import HtmlNode from '../../Layout/HtmlNode';
import KeyFrame from '../../Animation/KeyFrame';
import KeyFrameResponse from '../../../types/response/KeyFrameResponse';
export default class KeyFrameUpdater implements IDSUpdater<KeyFrame, KeyFrameResponse> {

    protected cssUpdater: CssStyleUpdater

    constructor() {
        this.cssUpdater = new CssStyleUpdater()
    }

    update(domain: KeyFrame, results: KeyFrameResponse) {
        let data: KeyFrameResponse = results
        // domain = <HtmlTa§>domain
        domain.uuid = data.id
        domain.shortUUID = data.shortUuid
        
    }

}