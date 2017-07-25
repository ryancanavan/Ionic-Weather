import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  scale: String = "far";
  theme: String = "light";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  scaleChange(){
    console.log("scaleChange()");
  }

  themeChange(){
    console.log("themeChange()");
  }

}
