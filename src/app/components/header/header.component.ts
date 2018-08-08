import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

	message: any;
  	constructor(private messageService: MessageService) { 
  		this.messageService.getMessage().subscribe(
          message =>  this.message = message.header
      );
    }

 	ngOnInit() {
  		
  	}

}
