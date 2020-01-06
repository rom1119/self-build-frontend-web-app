import Unit from "~/src/Unit/Unit";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import ComputedPropertyManager from "./ComputedPropertyManager";

export interface DirectionsProperty {
    leftProperty: BasePropertyCss,
    rightProperty: BasePropertyCss,
    topProperty: BasePropertyCss,
    bottomProperty: BasePropertyCss
    globalProperty: BasePropertyCss
}
export default interface DirectionComputedPropertyManager extends ComputedPropertyManager, DirectionsProperty {

    updateDirections()
    setDirectionsPropertiesFromVal(newVal, newUnit: Unit)

}