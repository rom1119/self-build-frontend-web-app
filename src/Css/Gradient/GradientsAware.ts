import BaseGradientCss from "./BaseGradientCss";

export default interface GradientsAware
{
    getGradients(): BaseGradientCss[]
}