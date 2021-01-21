import MediaQueryItem from "~/src/MediaQuery/headSection/MediaQueryItem";
import CssListAndMediaQueryAccessor from "~/src/Css/PropertyAccessor/mediaQuery/CssListAndMediaQueryAccessor";
import MediaQueryTag from "~/src/MediaQuery/headSection/MediaQueryTag";

export default class MediaQueryForCssList {

    protected _items: { [key: string]: MediaQueryItem}


    constructor() {
        this._items = {};
    }

    get items()
    {
        return this._items
    }

    reset() {
        this._items = {}
    }

    addMediaQueryTag(tag: MediaQueryTag): MediaQueryItem
    {
        if (!this._items[tag.mediaQuery.id]) {
            this._items[tag.mediaQuery.id] = new MediaQueryItem(tag.mediaQuery)
        }

        this._items[tag.mediaQuery.id].tags.push(tag)

        return this._items[tag.mediaQuery.id]

    }


}
