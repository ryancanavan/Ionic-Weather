import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { SettingsPage } from '../settings/settings';
import { AddLocationPage } from '../add-location/add-location';
import { DailyInfoPage } from '../daily-info/daily-info';
import { DbProvider } from '../../providers/db/db';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  theme: any;
  scale: any;
  places: any;

  placeInfo = [];

  icon: any;
  weather: any;
  temp: any;
  feelslike: any;
  city: any;
  time: any;
  zip: any;

  constructor(public navCtrl: NavController, public http: Http, public geolocation: Geolocation, public db: DbProvider) {
  }

  ionViewDidEnter() {
    this.placeInfo = [];
    this.loadSettings();
  }

  doRefresh(refresher){
    this.placeInfo = [];
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
        this.db.getPlaces().then(data => {
          this.places = data;
          this.loadLocalWeather();
          this.loadPlacesWeather();
        })
      });
    });
  }

  loadLocalWeather(){
    this.geolocation.getCurrentPosition().then((position) => {
      let url: string = 'http://api.wunderground.com/api/5b4386802cb6e185/conditions/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json';
      console.log(url);
      this.http.get(url).map(res => res.json())
      .subscribe(data => {
        this.icon = data.current_observation.icon;
        this.weather = data.current_observation.weather;
        if(this.scale == 'C'){
          this.temp = parseInt(data.current_observation.temp_c);
          this.feelslike = parseInt(data.current_observation.feelslike_c);
        }
        else {
          this.temp = parseInt(data.current_observation.temp_f);
          this.feelslike = parseInt(data.current_observation.feelslike_f);
        }
        this.city = data.current_observation.observation_location.full;
        let pos = this.city.indexOf(", ") + 2;
        this.city = this.city.substring(pos, this.city.length);
        this.zip = data.current_observation.display_location.zip;
      },
      err => {
        console.log("Error getting current location weather data!");
      }
      ); 
    })
  }

  loadPlacesWeather(){
    let placeString = "";
    console.log(this.places);
    if(this.places != null)
      placeString = JSON.parse(this.places).coords;
    for(let place of placeString){
      let url: string = 'http://api.wunderground.com/api/5b4386802cb6e185/conditions/q/' + place + '.json';
      console.log(url);
      this.http.get(url).map(res => res.json())
      .subscribe(data => {
        let info = '{"icon":"' + data.current_observation.icon + '", ';
        info += '"weather":"' + data.current_observation.weather + '", ';
        if(this.scale == 'C'){
          info += '"temp":"' + parseInt(data.current_observation.temp_c) + '", ';
          info += '"feelslike":"' + parseInt(data.current_observation.feelslike_c) + '", ';
        }
        else {
          info += '"temp":"' + parseInt(data.current_observation.temp_f) + '", ';
          info += '"feelslike":"' + parseInt(data.current_observation.feelslike_f) + '", ';
        }
        let city = data.current_observation.observation_location.full;
        let pos = city.indexOf(", ") + 2;
        info += '"city":"' + city.substring(pos, city.length) + '", ';
        info += '"zip":"' + data.current_observation.display_location.zip + '", ';
        info += '"coords":"' + place + '"}';
        this.placeInfo.push(JSON.parse(info));
      },
      err => {
        console.log("Error getting current location weather data!");
      }
    );
    }
  }

  clearCard(coords){
    this.db.removePlace(coords);
    this.placeInfo = [];
    this.loadSettings();
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
