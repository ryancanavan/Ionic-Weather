import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HourlyInfoPage } from '../hourly-info/hourly-info';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-daily-info',
  templateUrl: 'daily-info.html',
})
export class DailyInfoPage {

  city: string = this.navParams.get('city');
  days: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    this.loadWeather();
  }

  loadWeather() {
    let url: string = 'http://api.wunderground.com/api/5b4386802cb6e185/forecast10day/q/' + this.navParams.get('zip') + '.json';
      console.log(url);
      this.http.get(url).map(res => res.json())
      .subscribe(data => {
        this.days = data.forecast.simpleforecast.forecastday;
        //console.log(this.days);
      },
      err => {
        console.log("Error getting current location weather data!");
      }
    ); 
  }

  hourlyInfo(zip, city, month, day, dayString){
    this.navCtrl.push(HourlyInfoPage, {'zip': this.navParams.get('zip'), 'city': city, 'month': month, 'day': day, 'dayString': dayString});
  }

}
