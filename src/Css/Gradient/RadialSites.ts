import CssPropertyLimitable from '../CssPropertyLimitable';
import PredefinedKeywords from './PredefinedKeywords';
import CssUnitLimitable from '../CssUnitLimitable';
import Unit from '~/src/Unit/Unit';
import UnitDeg from '../../Unit/UnitDeg';
import UnitTurn from '../../Unit/UnitTurn';
import Positions from './Positions';
export default class RadialSites implements CssPropertyLimitable, PredefinedKeywords
{
    
    public static CLOSEST_SIDE = 'closest-side'
    public static FARTHEST_SIDE = 'farthest-side'
    public static CLOSEST_CORNER = 'closest-corner'
    public static FARTHEST_CORNER = 'farthest-corner'

    public static SHAPES = {
        'circle': 'circle',
        'ellipse': 'ellipse',
    }
    
    public static X_POS = {
        'left': 'left',
        'center': 'center',
        'right': 'right',
    }
    
    public static Y_POS = {
        'top': 'top',
        'center': 'center',
        'bottom': 'bottom',
    }

    protected units = []

    constructor() {
        this.units.push(new UnitDeg())
        this.units.push(new UnitTurn())
    }

    getAccessableProperty(): any[] {
        return RadialSites.getAccessableProperty()
    }

    getPredefinedKeywords(): any[] {
        return RadialSites.getAccessableProperty()
    }
    
    getXPositions(): string[] {
        return Positions.getXPositions()
    }
    
    getYPositions(): string[] {
        return Positions.getYPositions()
    }

    static getAccessableProperty(): any[] {
        let props = []
        props.push(RadialSites.CLOSEST_SIDE)
        props.push(RadialSites.FARTHEST_SIDE)
        props.push(RadialSites.CLOSEST_CORNER)
        props.push(RadialSites.FARTHEST_CORNER)


        return props
    }
    
    
}