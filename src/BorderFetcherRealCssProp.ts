import BasePropertyCss from './Css/BasePropertyCss';
import Unit from './Unit/Unit';
import UnitSize from './Unit/UnitSize';
import UnitColor from './Unit/UnitColor';
export default interface BorderFetcherRealCssProp
{
    
    fetchPropWidth(propName: string): string
    fetchPropStyle(propName: string): string
    fetchPropColor(propName: string): string

    fetchUnitWidth(propName: string): UnitSize
    fetchUnitStyle(propName: string): Unit
    fetchUnitColor(propName: string): UnitColor
}