import UnitSize from "~/src/Unit/UnitSize"
import Site from "~/src/Site/Site"
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import CssList from "../CssList";
import Left from '~/src/Site/Left';
import Border from "./Border";
import Percent from '../../Unit/Size/Percent';
import Top from '../../Site/Top';

export default class BorderTop extends Border<Top>
{
    protected _width: number = 100

    get widthUnit(): UnitSize {
        return new Percent()
    }    
    get heightUnit(): UnitSize {
        return new Pixel()
    }
    get width(): number {
        return this._width
    }
    get height(): number {
        return this._borderWidth
    }

    

}