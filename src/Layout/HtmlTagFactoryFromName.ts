import H1 from './tag/H1';
import HtmlTagFactory from './HtmlTagFactory';
import HtmlTag from './HtmlTag';
import UnableCreateDomainTagFromName from '../Errors/UnableCreateDomainTagFromName';
export default class HtmlTagFactoryFromName {

    private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        this.htmlTagFactory = new HtmlTagFactory()
    }

    create(name: string) : HtmlTag {

        switch (name) {
            case 'h1':
                return this.htmlTagFactory.createH1()
        }
        throw new UnableCreateDomainTagFromName(`Can not create tag from name ${name}`)
    }
    
}