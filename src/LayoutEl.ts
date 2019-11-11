export default abstract class LayoutEl {

    protected _lastSynch: Date;
    protected _uuid: string;
        
    protected _children: LayoutEl[] = []
    

    constructor()
    {
        this._uuid = Math.floor(Math.random() * 10000) + ''
    }
    
    get lastSynch(): Date
    {
        return this._lastSynch
    }
    set lastSynch(date: Date)
    {
        this._lastSynch = date
    }

    get uuid() : string
    {
        return this._uuid
    }

    get children(): LayoutEl[]
    {
        return this._children
    }

    set children(arg: LayoutEl[])
    {
        this._children = arg
    }
    

    
}
