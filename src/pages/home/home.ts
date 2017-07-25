import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { AddLocationPage } from '../add-location/add-location';
import { DailyInfoPage } from '../daily-info/daily-info';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  icon_url: any;
  weather: any;
  temp: any;
  feelslike: any;
  city: any;
  time: any;
  zip: any;

  constructor(public navCtrl: NavController, public http: Http, public geolocation: Geolocation) {
  }

  ionViewDidLoad(){
    this.loadWeather();
  }

  loadWeather(){
    this.geolocation.getCurrentPosition().then((position) => {
      let url: string = 'http://api.wunderground.com/api/5b4386802cb6e185/conditions/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json';
      console.log(url);
      this.http.get(url).map(res => res.json())
      .subscribe(data => {
        this.icon_url = 'https://icons.wxug.com/i/c/i/' + data.current_observation.icon + '.gif';
        this.weather = data.current_observation.weather;
        this.temp = parseInt(data.current_observation.temp_f);
        this.feelslike = parseInt(data.current_observation.feelslike_f);
        this.city = data.current_observation.display_location.full;
        this.time = data.current_observation.observation_time;
        this.zip = data.current_observation.display_location.zip;
      },
      err => {
        console.log("Error getting current location weather data!");
      }
    ); 
    })
  }

  addLocation(){
    this.navCtrl.push(AddLocationPage);
  }

  dailyInfo(zip, city){
    this.navCtrl.push(DailyInfoPage, {'zip': zip, 'city': city});
  }

}
