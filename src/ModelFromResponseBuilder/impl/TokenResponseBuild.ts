import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponse from "~/types/response/TokenResponse";
import Token from "~/types/Token";

export default class TokenResponseBuild implements ModelFromResponse<TokenResponse, Token>{
    build(from: TokenResponse): Token {
        let model = new Token
        model.access_token = from.access_token
        model.expires_in = from.expires_in
        model.refresh_token = from.refresh_token
        model.scope = from.scope
        model.token_type = from.token_type

        return model;
    }

}
