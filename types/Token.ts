import BaseModel from "~/types/BaseModel";
import AggregateRoot from "~/types/AggregateRoot";

export default class Token extends AggregateRoot{

    private _access_token
    private _refresh_token
    private _expires_in
    private _scope
    private _token_type


    get access_token() {
        return this._access_token;
    }

    set access_token(value) {
        this._access_token = value;
    }

    get expires_in() {
        return this._expires_in;
    }

    set expires_in(value) {
        this._expires_in = value;
    }

    get scope() {
        return this._scope;
    }

    set scope(value) {
        this._scope = value;
    }

    get token_type() {
        return this._token_type;
    }

    set token_type(value) {
        this._token_type = value;
    }


    get refresh_token() {
        return this._refresh_token;
    }

    set refresh_token(value) {
        this._refresh_token = value;
    }
}
