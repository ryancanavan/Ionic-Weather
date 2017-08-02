import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { DbProvider } from '../../providers/db/db';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-hourly-info',
  templateUrl: 'hourly-info.html',
})
export class HourlyInfoPage {

  theme: any;
  scale: any;

  dayString: string = this.navParams.get('day');
  month: string = this.dayString.substring(this.dayString.indexOf(' ')+1, this.dayString.lastIndexOf(' '));
  day: string = this.dayString.substring(this.dayString.lastIndexOf(' ')+1, this.dayString.length);
  totalHours: any;
  hours: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public db:DbProvider) {
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
