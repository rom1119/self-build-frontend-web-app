import UnitSize from "~/src/Unit/UnitSize"
import Site from "~/src/Site/Site"
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import CssList from "../CssList";
import Left from '~/src/Site/Left';
import Border from "./Border";
import Percent from '../../Unit/Size/Percent';

export default class BorderLeft extends Border<Left>
{
    protected _height: number = 100

    get widthUnit(): UnitSize {
        return new Pixel()
    }    
    get heightUnit(): UnitSize {
        return new Percent()
    }
    get width(): number {
        return this._borderWidth
    }
    get height(): number {
        return this._height
    }

    

}