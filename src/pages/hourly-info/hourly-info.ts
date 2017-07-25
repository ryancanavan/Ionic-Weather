import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-hourly-info',
  templateUrl: 'hourly-info.html',
})
export class HourlyInfoPage {

  city: string = this.navParams.get('city');
  month: string = this.navParams.get('month');
  day: string = this.navParams.get('day');
  dayString: string = this.navParams.get('dayString');
  totalHours: any;
  hours: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
  }

  ionViewDidLoad() {
    this.loadWeather();
  }

  loadWeather() {
    let url: string = 'http://api.wunderground.com/api/5b4386802cb6e185/hourly10day/q/' + this.navParams.get('zip') + '.json';
      console.log(url);
      this.http.get(url).map(res => res.json())
      .subscribe(data => {
        this.totalHours = data.hourly_forecast;
        this.hours = this.totalHours.filter(
          hour => hour.FCTTIME.month_name == this.month && hour.FCTTIME.mday == this.day
        );
        console.log(this.hours);
      },
      err => {
        console.log("Error getting current location weather data!");
      }
    );
  } 

}
