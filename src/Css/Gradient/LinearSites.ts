import CssPropertyLimitable from '../CssPropertyLimitable';
import PredefinedKeywords from './PredefinedKeywords';
import CssUnitLimitable from '../CssUnitLimitable';
import Unit from '~/src/Unit/Unit';
import UnitDeg from '../../Unit/UnitDeg';
import UnitTurn from '../../Unit/UnitTurn';
export default class LinearSites implements CssPropertyLimitable, PredefinedKeywords, CssUnitLimitable
{
    
    public static LEFT = 'left'
    public static RIGHT = 'right'
    public static TOP = 'top'
    public static BOTTOM = 'bottom'
    public static TOP_LEFT = 'top left'
    public static TOP_RIGHT = 'top right'
    public static BOTTOM_LEFT = 'bottom left'
    public static BOTTOM_RIGHT = 'bottom right'

    protected units = []

    constructor() {
        this.units.push(new UnitDeg())
        this.units.push(new UnitTurn())
    }

    getAccessableProperty(): any[] {
        return LinearSites.getAccessableProperty()
    }

    getPredefinedKeywords(): any[] {
        return LinearSites.getAccessableProperty()
    }

    static getAccessableProperty(): any[] {
        let props = []
        props.push(LinearSites.LEFT)
        props.push(LinearSites.RIGHT)
        props.push(LinearSites.TOP)
        props.push(LinearSites.BOTTOM)
        props.push(LinearSites.TOP_LEFT)
        props.push(LinearSites.TOP_RIGHT)
        props.push(LinearSites.BOTTOM_LEFT)
        props.push(LinearSites.BOTTOM_RIGHT)

        return props
    }

    getAccessableUnits(): Unit[] {
        return this.units
    }
    
}