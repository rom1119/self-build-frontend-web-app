import HtmlTag from '~/src/Layout/HtmlTag';
export default interface HtmlTagFinder
{
    findByUuid(uuid: string): HtmlTag
}