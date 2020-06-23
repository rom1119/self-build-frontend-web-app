import LayoutEl from './LayoutEl';
export default interface LayoutFinder<T extends LayoutEl>
{
    find(): T
}