import LocalityYear from "~/types/internal/LocalityYear";
import YearCategory from "~/types/internal/YearCategory";

export default class Locality {
    public id

    public years: {
        [year: string]: LocalityYear
    } = {}

    public getYearCategory(categoryId: number, year: string) {
        if(!this.hasYear(year)) return null;
        if(!this.years[year].hasYearCategory(categoryId)) return null;
        return this.years[year][categoryId];
    }

    public hasYear(year: string) {
        return this.years[year]? true : false
    }

    public hasYearCategory(categoryId: number, year: string) {
        if(!this.hasYear(year)) return false;
        return this.years[year].hasYearCategory(categoryId);
    }

    public setYearCategory(category: YearCategory, year: string) {
        if(!this.hasYear(year)) {
            this.years[year] = new LocalityYear(this)
        }
        this.years[year].setYearCategory(category)
    }

    public getYearCategoriesId(year: string) {
        if(!this.hasYear(year)) return []
        return this.years[year].getCategoriesId();
    }

    public getLocalityYear(year: string) {
        if(!this.hasYear(year)) this.years[year] = new LocalityYear(this, year)
        return this.years[year]
    }
}
