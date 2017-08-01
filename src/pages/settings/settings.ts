import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  scale: any;
  theme: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DbProvider) {
  }

  ionViewDidLoad(){
    this.getSettings();
  }

  getSettings(){
    this.db.getTheme().then(data => {
      if(data == null){
        this.theme = 'light';
        this.db.setTheme('light');
      }
      else{
        this.theme = data;
      }
      this.db.getScale().then(data => {
        if(data == null){
          this.scale = 'far';
          this.db.setScale('far');
        }
        else{
          this.scale = data;
        }
      });
    });
  }

  scaleChange(scale) {
    this.db.setScale(scale);
  }

  themeChange(theme) {
    this.db.setTheme(theme);
  }

}
