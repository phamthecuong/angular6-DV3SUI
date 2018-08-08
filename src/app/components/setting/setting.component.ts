import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

	getkeyboardMap: any[];
	dataSetting   : any[];
	tabActive     : number = 0;
	keyPressVal   : string;
	preIndexObj   : any[] ;
	hintPress     : any[];
	preIndex      : number;
	keyCodePrevent: any[];

	constructor(public _service: SettingService, private messageService: MessageService) {
		this.dataSetting    = this._service.getDataSetting();
		this.preIndexObj    = JSON.parse(JSON.stringify(this._service.getPreIndex()));
		this.hintPress      = JSON.parse(JSON.stringify(this._service.getHintPress()));
		this.keyCodePrevent = JSON.parse(JSON.stringify(this._service.getKeyCodePrevent()));
		this.getkeyboardMap = JSON.parse(JSON.stringify(this._service.getkeyboardMap()));
	}

	ngOnInit() {
	  	this.selectedDefault(null);
	}

	focusInput(event, groupIdx: number, index: number): void {
		this.hintPress[groupIdx][index] = true;
		this.saveStateIndex(groupIdx, index);
		event.stopPropagation();
	}

	selectSetting(gIdx: number, index: number): void {
		
		this.messageService.sendMessage({app:'Message from settingComponent to app!'});
		this.messageService.sendMessage({header:'Message from settingComponent to header!'});
		this.clearHintPress(undefined);

		this.preIndex = this._service.getPreIndex()[gIdx];
		this.dataSetting[gIdx][index].setting = true;

		if (this.preIndex !== index) { this.dataSetting[gIdx][this.preIndex].setting = false; } 
		this.saveStateIndex(gIdx, index);
		this.saveSetting();
	}

	activeTab(_tabIndex:number): void {
		this.tabActive = _tabIndex;
		this.selectedDefault(this.preIndexObj[_tabIndex]);
	}

	selectedDefault(_preIndex: number): void {
		_preIndex = _preIndex || this.preIndexObj[this.tabActive];

		if (_preIndex > 0) { return; }
		this.dataSetting[this.tabActive][_preIndex].setting = true;
	}

	saveSetting() {
		this._service.setDataSetting(this.dataSetting);
	}

	saveStateIndex(groupIdx: number, index: number): void {
		this.preIndexObj[groupIdx] = index;
		this._service.setPreIndex(this.preIndexObj);
	}

	keyPressSetting(event, groupIdx: number, index: number): any {
		console.log("keyCode", event.keyCode);
		if (this.keyCodePrevent.indexOf(event.keyCode) > -1) {return false;}

		let keyCodeObj = (this.dataSetting).map(function(sub){
		  return sub.map(function(item){ 
		      return item.keyCode;
		  });
		})

		for (let gIdx = 0; gIdx < keyCodeObj.length; gIdx ++) {
		  let idx = keyCodeObj[gIdx].indexOf(event.keyCode);
		  
		  if (idx > -1) { this.saveStateKeyPress(gIdx, idx, null); break; }
		}

		this.clearHintPress(undefined);
		this.saveStateKeyPress(groupIdx, index, event.keyCode);
		this.saveSetting();
	}

	saveStateKeyPress(groupIdx: number, idx: number, _keyCode: number): void {
		let shorcut = this.getkeyboardMap[_keyCode] || "";
		let keyCode = _keyCode                 || "";

		this.dataSetting[groupIdx][idx].shorcut = shorcut;
		this.dataSetting[groupIdx][idx].keyCode = keyCode;
	}

	clearHintPress(event): void {
		this.hintPress = this._service.getHintPress();
		if (typeof(event) !== 'undefined') {event.target.blur(); }
	}

}
