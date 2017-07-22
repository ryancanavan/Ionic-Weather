import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  image: any;
  temp: any;
  feelslike: any;

  constructor(public navCtrl: NavController, public http: Http) {

    this.http.get('http://api.wunderground.com/api/5b4386802cb6e185/conditions/q/CA/San_Francisco.json').map(res => res.json())
      .subscribe(data => {
        this.image = data.current_observation.icon_url;
        this.temp = data.current_observation.temp_f;
        this.feelslike = data.current_observation.feelslike_f;
      },
      err => {
        console.log("ERROR!");
      }
    );    

  }

}
