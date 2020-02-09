
import ApiService from "../ApiService";
import ResponseTreeTag from "../ResponseTreeTag";
import HtmlTag from "~/src/Layout/HtmlTag";

import  Axios  from 'axios'

// import  SockJS   from '~/node_modules/sockjs-client/dist/sockjs.js';
// import  Stomp   from '~/node_modules/stomp-websocket';
import Form from '../../../components/forms/Form';

export default class DefaultApiService implements ApiService
{



    constructor()
    {
        

    }

    getTreeTags(tag: HtmlTag): ResponseTreeTag {
        throw new Error("Method not implemented.");
    }
    
    async postTag(tag: HtmlTag) {
        let a = await Axios.get('http://localhost:8080/api/user')


    }
    putTag(tag: HtmlTag) {
        throw new Error("Method not implemented.");
    }
    deleteTag(tag: HtmlTag) {
        throw new Error("Method not implemented.");
    }

 


 
}