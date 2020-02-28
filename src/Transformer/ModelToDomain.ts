import REM from '../Unit/Size/REM';
import LayoutEl from '../LayoutEl';
import BaseModel from '~/types/BaseModel';
import TagDto from '../Api/TagDto';
import HtmlTag from '../Layout/HtmlTag';
export default interface ModelToDomain
{
    /**
     * transform
     */
    transform(model: TagDto ) :  HtmlTag
}