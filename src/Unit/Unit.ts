import AggregateRoot from '../../types/AggregateRoot';
export default abstract class Unit extends AggregateRoot {

    protected _name: string
    protected _value: string

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
    public get value() : string 
    {
        return this._value
    }
}