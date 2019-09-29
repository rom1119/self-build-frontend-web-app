export default abstract class Unit {

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