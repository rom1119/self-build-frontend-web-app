import UnitSize from "~/src/Unit/UnitSize";
import UnitColor from '../../Unit/UnitColor';
import Pixel from '../../Unit/Size/Pixel';
import Named from '../../Unit/Color/Named';
import Left from '~/src/Site/Left';
import Border from "./Border";
import Right from "~/src/Site/Right";
import Percent from "~/src/Unit/Size/Percent";


export default class BorderRight extends Border<Right> {
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
