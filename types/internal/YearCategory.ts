export default class YearCategory {
    public id: number
    public parentId: number
    public generalName: string
    public name: string
    public desciption: string = ''
    public value: string = 'Brak'
    public measureName: string = ''

    constructor(id, generalName, name, value, measureName) {
        this.id = id
        this.generalName = generalName
        this.name = name
        this.value = value
        this.measureName = measureName
    }
}
