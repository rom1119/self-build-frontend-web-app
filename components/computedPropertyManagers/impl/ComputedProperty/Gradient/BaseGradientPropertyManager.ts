import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import BaseGradientCss from '../../../../../src/Css/Gradient/BaseGradientCss';
import { BackgroundImage } from "~/src/Css";

export default abstract class BaseGradientPropertyManager<T extends BaseGradientCss> extends BaseComputedPropertyManager<T>
{
    deactivePropCss(prop: T) {
        var activeSelector = this.value.selectedSelector
        var backgroundImage: BackgroundImage

        if (activeSelector) {
            backgroundImage = <BackgroundImage><unknown>activeSelector.cssAccessor.getProperty(BackgroundImage.PROP_NAME)


            for (var i = 0; i < backgroundImage.getGradients().length; i++) {
                var grad = backgroundImage.getGradients()[i]
                if (prop.id != grad.id) {
                    continue
                }
                backgroundImage.getGradients().splice(i, 1)
                break
            }
            activeSelector.synchronize()

        } else {
            backgroundImage = <BackgroundImage><unknown>this.value.cssAccessor.getProperty(BackgroundImage.PROP_NAME)

        }

        for (var i = 0; i < backgroundImage.getGradients().length; i++) {
            var grad = backgroundImage.getGradients()[i]
            if (prop.id != grad.id) {
                continue
            }
            backgroundImage.getGradients().splice(i, 1)
            break
        }

        prop.id = null
        prop.setActive(false)

        this.value.updateCssPropertyWithoutModel(backgroundImage.getName(), backgroundImage)
        this.value.updateModelComponent()
        return null
    }
    activePropCss(prop: T) {
        prop.id = null
        prop.setActive(true)

        var backgroundImage: BackgroundImage

        var activeSelector = this.value.selectedSelector
        if (activeSelector) {
            backgroundImage = <BackgroundImage><unknown>activeSelector.cssAccessor.getProperty(BackgroundImage.PROP_NAME)
            if (!backgroundImage) {
                backgroundImage = new BackgroundImage()
                backgroundImage.id = null
                backgroundImage.setActive(true)
                backgroundImage.getGradients().push(prop)
                activeSelector.cssAccessor.addNewProperty(backgroundImage)
            } else {
                backgroundImage.setActive(true)
                backgroundImage.getGradients().push(prop)
                activeSelector.updateCssPropertyWithoutModel(backgroundImage.getName(), backgroundImage)
            }
            activeSelector.synchronize()
        } else {
            backgroundImage = <BackgroundImage><unknown>this.value.cssAccessor.getProperty(BackgroundImage.PROP_NAME)

            if (!backgroundImage) {
                backgroundImage = new BackgroundImage()
                backgroundImage.id = null
                backgroundImage.setActive(true)
                backgroundImage.getGradients().push(prop)
                this.value.cssAccessor.addNewProperty(backgroundImage)

            } else {
                backgroundImage.setActive(true)
                backgroundImage.getGradients().push(prop)
                this.value.updateCssPropertyWithoutModel(backgroundImage.getName(), backgroundImage)
            }
        }

        this.value.synchronize()

        return prop
    }
    updateCssProp(newProp: T) {
        // console.log('ALA MA');
        // console.log(newProp.getUnit());
        // console.log(newProp);
        if (!this.getProperty().isActive()) {
            return
        }
        // let val = this.value.getComputedCssVal(newProp)
        // let clonedCss = _.cloneDeep(newProp)
        // clonedCss.setValue(val.toString())
        var backgroundImage: BackgroundImage

        var activeSelector = this.value.selectedSelector
        if (activeSelector) {
            backgroundImage = <BackgroundImage><unknown>activeSelector.cssAccessor.getProperty(BackgroundImage.PROP_NAME)

            activeSelector.updateCssPropertyWithoutModel(backgroundImage.getName(), backgroundImage)
            activeSelector.synchronize()

        } else {
            backgroundImage = <BackgroundImage><unknown>this.value.cssAccessor.getProperty(BackgroundImage.PROP_NAME)

            this.value.updateCssPropertyWithoutModel(backgroundImage.getName(), backgroundImage)

        }

        return newProp.getClearValue()
    }

    updateApi() {
        this.value.synchronize()
    }
}
