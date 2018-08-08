import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessageService {

  	constructor() { }

  	private subject = new Subject<any>();
 
    sendMessage(message: object) {
        this.subject.next(message);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}
