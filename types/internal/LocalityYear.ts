import YearCategory from "~/types/internal/YearCategory";
import Locality from "~/types/internal/Locality";

export default class LocalityYear {
    public id
    public name
    public province
    public year
    public populationValue
    public populationName
    public areaValue
    public areaName

    private locality: Locality

    public categories: {
        [categoryId: number]: YearCategory
    } = {}

    constructor(locality: Locality, year = '') {
        this.year = year
        this.locality = locality
    }

    public hasYearCategory(id: number) {
        return this.categories[id]
    }

    public setYearCategory(yearCategory: YearCategory) {
        this.categories[yearCategory.id] = yearCategory
    }

    public getCategoriesId() {
        return Object.keys(this.categories).map(id => parseInt(id))
    }

    public getCategory(id: number) {
        return this.categories[id]
    }
}
