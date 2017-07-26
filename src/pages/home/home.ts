import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { SettingsPage } from '../settings/settings';
import { AddLocationPage } from '../add-location/add-location';
import { DailyInfoPage } from '../daily-info/daily-info';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  icon: any;
  weather: any;
  temp: any;
  feelslike: any;
  city: any;
  time: any;
  zip: any;

  constructor(public navCtrl: NavController, public http: Http, public geolocation: Geolocation, public storage: Storage) {
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
        this.icon = data.current_observation.icon;
        this.weather = data.current_observation.weather;
        this.temp = parseInt(data.current_observation.temp_f);
        this.feelslike = parseInt(data.current_observation.feelslike_f);
        this.city = data.current_observation.observation_location.full;
        let pos = this.city.indexOf(", ") + 2;
        this.city = this.city.substring(pos, this.city.length);
        this.time = data.current_observation.observation_time;
        this.zip = data.current_observation.display_location.zip;
      },
      err => {
        console.log("Error getting current location weather data!");
      }
      ); 
    })
  }

  goToAddLocationPage(){
    this.navCtrl.push(AddLocationPage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  goToDailyInfoPage(zip, city){
    this.navCtrl.push(DailyInfoPage, {'zip': zip, 'city': city});
  }

}
