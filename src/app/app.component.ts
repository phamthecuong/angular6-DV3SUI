import { Component, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './services/message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy  {
  	message: any;
    subscription: Subscription;
 
    constructor(private messageService: MessageService) {
        this.messageService.getMessage().subscribe(
        	message => {console.log("conserver app:" + message.app); this.message = message.app}
        );
    }

    ngOnDestroy() {
       // unsubscribe to ensure no memory leaks
       //this.subscription.unsubscribe();
    }
  
}
