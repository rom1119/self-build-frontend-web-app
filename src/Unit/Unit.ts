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
     * getName
     */
    public abstract getValue(val): string 
    
}