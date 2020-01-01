import BasePropertyCss from './Css/BasePropertyCss';
import Unit from './Unit/Unit';
export default interface FetcherRealCssProp
{
    
    fetchPropValue(propName: string): string

    fetchUnit(propName: string): Unit
}