import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HourlyInfoPage } from '../hourly-info/hourly-info';
import { DbProvider } from '../../providers/db/db';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-daily-info',
  templateUrl: 'daily-info.html',
})
export class DailyInfoPage {

  theme: any;
  scale: any;

  city: string = this.navParams.get('city');
  days: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public db:DbProvider) {
  }

  ionViewDidLoad() {
    this.loadSettings();
  }

  doRefresh(refresher){
    this.loadSettings();
    refresher.complete();
  }

  loadSettings(){
    this.db.getTheme().then(data => {
      if(data == null)
        this.theme = 'light';
      else
        this.theme = data;
      this.db.getScale().then(data => {
        if(data == null)
          this.scale = 'F';
        else
          this.scale = data;
        this.loadWeather();
      });
    });
  }

  loadWeather() {
    let url: string = 'http://api.wunderground.com/api/5b4386802cb6e185/forecast10day/q/' + this.navParams.get('zip') + '.json';
      console.log(url);
      this.http.get(url).map(res => res.json())
      .subscribe(data => {
        this.days = data.forecast.simpleforecast.forecastday;
      },
      err => {
        console.log("Error getting current location weather data!");
      }
    );
  }

  hourlyInfo(weekday, monthname, day){
    let dayString = weekday + ', ' + monthname + ' ' + day;
    this.navCtrl.push(HourlyInfoPage, {'zip': this.navParams.get('zip'), 'day': dayString});
  }

}
