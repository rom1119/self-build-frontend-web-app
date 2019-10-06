export default abstract class LayoutEl {

    protected _lastSynch: Date;
    protected _uuid: string;

    constructor()
    {
        this._uuid = Math.floor(Math.random() * 10000) + '-' + Math.floor(Math.random() * 10000) 
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

    

    
}
