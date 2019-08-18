export default class FieldError {
    propertyName: string
    message: string
    children: FieldError[]

    constructor(propertyName) {
        this.propertyName = propertyName
        this.children = []
    }
}
