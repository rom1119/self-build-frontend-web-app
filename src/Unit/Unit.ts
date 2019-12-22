import AggregateRoot from '../../types/AggregateRoot';
export default abstract class Unit extends AggregateRoot {

    protected _name: string
    /**
     * getName
     */
    public get name() : string 
    {
        return this._name
    }


    /**
     * getValue
     */
    public abstract getValue(val): string 

    public equals(el: Unit): boolean
    {
        return this.name === el.name
    }
    
}