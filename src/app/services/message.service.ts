import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MessageService {

  	constructor(private http: HttpClient) { }

  	private subject = new Subject<any>();
 
    sendMessage(message: object) {
        this.subject.next(message);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

 //    getCitiesWeathersByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
	//     const citiesSubject = new Subject();
	//     cities.forEach((city) => {
	//       citiesSubject.next(this.http.get(
	//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`));
	//     });
	//     return citiesSubject;
	// }

	getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
	    const dataSubject = new Subject<number>();
	    this.http.get(
	      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
	      .subscribe((weather: any) => {
	        dataSubject.next(Math.round(Number(weather.main.temp)));
	      });
	    return dataSubject;
	  }
}
