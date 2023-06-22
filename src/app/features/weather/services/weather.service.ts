import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Geo } from '../models/geo.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private accuKey = environment.accuweather.accuweatherAPIKey;
  private mapToken = environment.mapbox.mapboxToken;

  private accuUrl = environment.accuweather.url;
  private accuUrlIcon = environment.accuweatherIcon.url;
  private mapUrl = environment.mapbox.url;
  private geoUrl = environment.geoplugin.url;

  constructor(private _http: HttpClient) {}

  getGeoLocation(): Observable<Geo> {
    return this._http.get<Geo>(this.geoUrl);
  }

  getGeoPosition(lat: string, long: string) {
    return this._http.get(`${this.accuUrl}locations/v1/cities/geoposition/search?apikey=${this.accuKey}&q=${lat}%2C%20${long}&language=pt-br`);
  }

  getCoordinates(input: string) {
    return this._http.get(`${this.mapUrl} + ${input}.json?access_token=${this.mapToken}`);
  }

  getCurrentConditions(localCode: string) {
    return this._http.get(`${this.accuUrl}currentconditions/v1/${localCode}?apikey=${this.accuKey}&language=pt-br&details=true`);
  }

  get5DayForecast(localCode: string) {
    return this._http.get(`${this.accuUrl}forecasts/v1/daily/5day/${localCode}?apikey=${this.accuKey}&language=pt-br&metric=true`);
  }

  get12Hourly(localCode: string) {
    return this._http.get(`${this.accuUrl}forecasts/v1/hourly/12hour/${localCode}?apikey=${this.accuKey}&language=pt-br&metric=true&details=true`);
  }

  getIcon(iconNumber: string) {
    return this._http.get(`${this.accuUrlIcon}sites/default/files/${iconNumber}-s.png`);
  }

}
