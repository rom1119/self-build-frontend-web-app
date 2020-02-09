
import ApiService from "../ApiService";
import ResponseTreeTag from "../ResponseTreeTag";
import HtmlTag from "~/src/Layout/HtmlTag";

import  SockJS   from '~/node_modules/sockjs-client/dist/sockjs.js';
import  Stomp   from '~/node_modules/stomp-websocket';

export default class DefaultApiService implements ApiService
{

    protected webSocket: SockJS
    protected stompClient: Stomp

    constructor()
    {
        console.log(Stomp);
        
        this.webSocket = new SockJS('http://localhost:8080/gs-guide-websocket')
        this.stompClient = Stomp.over(this.webSocket);
        this.stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe('/topic/greetings', function (greeting) {
                console.log('message', greeting.body);

                // showGreeting(JSON.parse(greeting.body).content);

            });
        });
        this.webSocket.onopen = () => {
            console.log('onopen');
            this.webSocket.send('test');
        };
       
        this.webSocket.onmessage = (e) => {
            console.log('onmessage', e.data);
            this.webSocket.close();
        };
       
        this.webSocket.onclose = () => {
            console.log('onclose');
        };

    }

    getTreeTags(tag: HtmlTag): ResponseTreeTag {
        throw new Error("Method not implemented.");
    }
    
    postTag(tag: HtmlTag) {
        try {
            this.stompClient.send("/app/hello", {}, JSON.stringify({'name': 'asdas'}));
            
        } catch (e) {
            console.log('ON SEND ERR', e);
            
        }

    }
    putTag(tag: HtmlTag) {
        throw new Error("Method not implemented.");
    }
    deleteTag(tag: HtmlTag) {
        throw new Error("Method not implemented.");
    }

 


 
}