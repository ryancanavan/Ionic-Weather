import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DbProvider {

  constructor(public storage:Storage) {
  }

  setTheme(theme){
    this.storage.set('theme', theme);
  }

  setScale(scale){
    this.storage.set('scale', scale);
  }

  getTheme(){
    return this.storage.get('theme');
  }

  getScale(){
    return this.storage.get('scale');
  }

  addPlace(place){
    this.storage.get('places').then(data => {
      if(data == null)
        this.storage.set('places', '{"coords": ["' + place + '"]}');
      else
        this.storage.set('places', data.substring(0, data.length-2) + ', "' + place + '"]}');
    });
  }
  
  removePlace(place){
    this.storage.get('places').then(data => {
      let places = JSON.parse(data).coords;
      let index = places.indexOf(place, 0);
      places.splice(index, 1);
      if(places.length == 0)
        this.storage.remove('places');
      else
        this.storage.set('places', JSON.stringify(places));
    });
  }

  getPlaces(){
    return this.storage.get('places');
  }

}
