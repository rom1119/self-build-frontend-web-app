import FieldError from "~/types/FieldError";

export default class FormErrors {

    errors: FieldError[]


    constructor() {
        this.errors = []
    }

    clear() {
        this.errors = []
    }

    get(errorName) : FieldError
    {
        let index = -1
        this.errors.forEach((el: FieldError, key) => {
            if (el.message == errorName) {
                index = key
            }
        })

        return this.errors[index]
    }

    has(errorName) : boolean
    {
        let index = -1
        this.errors.forEach((el: FieldError, key) => {
            if (el.message == errorName) {
                index = key
            }
        })

        return index > -1
    }
}
