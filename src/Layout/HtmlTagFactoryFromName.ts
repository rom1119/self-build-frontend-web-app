import H1 from './tag/H1';
import HtmlTagFactory from './HtmlTagFactory';
import HtmlTag from './HtmlTag';
import UnableCreateDomainTagFromName from '../Errors/UnableCreateDomainTagFromName';
import TextNode from './TextNode';
export default class HtmlTagFactoryFromName {

    private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        this.htmlTagFactory = new HtmlTagFactory()
    }

    createText(): TextNode {
        return this.htmlTagFactory.createText()
    }
    
    create(name: string) : HtmlTag {

        switch (name) {
            case 'h1':
                return this.htmlTagFactory.createH1()
            case 'div':
                return this.htmlTagFactory.createH1()
            case 'input-text':
                return this.htmlTagFactory.createInputText()
            case 'button':
                return this.htmlTagFactory.createButton()
        }
        throw new UnableCreateDomainTagFromName(`Can not create tag from name ${name}`)
    }
    
}