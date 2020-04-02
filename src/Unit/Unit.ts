import AggregateRoot from '../../types/AggregateRoot';
export default abstract class Unit extends AggregateRoot {

    protected _name: string
    protected _label: string
    /**
     * getName
     */
    public get name() : string 
    {
        return this._name
    }
    
    /**
     * getLabel
     */
    public get label() : string 
    {
        return this._label
    }


    /**
     * getValue
     */
    public abstract getValue(val): string 

    public equals(el: Unit): boolean
    {
        if (!el) {
            return false
        }
        return this.name === el.name
    }
    
}