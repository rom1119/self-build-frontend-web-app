export default abstract class LayoutEl {

    protected _lastSynch: Date;
    protected _uuid: string;

    constructor()
    {
        this._uuid = Math.round(Math.random()) * 100 + '-' + Math.round(Math.random()) * 100
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
    
    set uuid(uuid:string)
    {
        this._uuid = uuid
    }
    

    
}
