import CssComposite from './CssComposite';
export default abstract class CssDirectionComposite extends CssComposite
{
    get value(): string
    {
        var val = super.value
        if (this.values.length > 4) {
            throw Error(`Too much properties passed to Padding porperty. Permitted max 4, but current is ${this.values.length}`)
        }

        return val
    }

    get left(): string
    {
        let propLength = this.values.length
        let fullProp = this.value
        let newVal = ''

        switch (propLength) {
            case 1:
                return this.values[0]
            case 2:
                return this.values[1]
            case 3:
                return this.values[1]
            case 4:
                return this.values[3]
                
        }
    }
    
    get right(): string
    {
        let propLength = this.values.length
        let fullProp = this.value
        let newVal = ''

        switch (propLength) {
            case 1:
                return this.values[0]
            case 2:
                return this.values[1]
            case 3:
                return this.values[1]
            case 4:
                return this.values[1]
                
        }
    }
    
    get top(): string
    {
        let propLength = this.values.length
        let fullProp = this.value
        let newVal = ''

        return this.values[0]
    }

    get bottom(): string
    {
        let propLength = this.values.length
        let fullProp = this.value
        let newVal = ''

        switch (propLength) {
            case 1:
                return this.values[0]
            case 2:
                return this.values[0]
            case 3:
                return this.values[2]
            case 4:
                return this.values[2]
                
        }
    }

}