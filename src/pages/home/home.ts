import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
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

  constructor(public navCtrl: NavController, public http: Http) {

    this.http.get('http://api.wunderground.com/api/5b4386802cb6e185/conditions/q/19104.json').map(res => res.json())
      .subscribe(data => {
        this.icon_url = data.current_observation.icon_url;
        this.weather = data.current_observation.weather;
        this.temp = parseInt(data.current_observation.temp_f);
        this.feelslike = parseInt(data.current_observation.feelslike_f);
        this.city = data.current_observation.display_location.full;
        this.time = data.current_observation.observation_time;
      },
      err => {
        console.log("ERROR!");
      }
    );    

  }

}
