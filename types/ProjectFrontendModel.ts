import TagDto from '../src/Api/TagDto';
import AggregateRoot from './AggregateRoot';
import HtmlTagModel from './HtmlTagModel';
export default class ProjectFrontendModel extends AggregateRoot {

    name 
    htmlTags: HtmlTagModel[]

    constructor() 
    {
        super()
        this.htmlTags = []
    }
}
