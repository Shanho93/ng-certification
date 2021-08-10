import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Forecast} from "../models/forecast";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ForecastService {
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
    private readonly apiKey = '5a4b2d457ecbef9eb2a71e480b947604';
    private readonly possibleIcons = ['clouds', 'rain', 'snow', 'sun'];

    constructor(private readonly httpClient: HttpClient) {
    }

    getWeatherDataByZipCode(zip: string): Observable<Forecast> {
        return this.httpClient.get<Forecast>(`${this.baseUrl}/weather`, {
            params: new HttpParams()
                .append('zip', zip)
                .append('appid', this.apiKey)
                .append('units', 'imperial')
        }).pipe(
            map((response: any) => {
                const icon = this.possibleIcons.includes(response.weather[0]?.main?.toLowerCase()) ?
                    response.weather[0]?.main?.toLowerCase() :
                    'sun';

                return {
                    city: response.name,
                    condition: response.weather[0]?.main,
                    temperature: response.main.temp,
                    minTemp: response.main.temp_min,
                    maxTemp: response.main.temp_max,
                    icon: `${icon}.png`
                } as Forecast;
            })
        );
    }

    getForecastDataByZipCode(zip: string): Observable<Forecast[]> {
        return this.httpClient.get<Forecast[]>(`${this.baseUrl}/forecast/daily`, {
            params: new HttpParams()
                .append('zip', zip)
                .append('appid', this.apiKey)
                .append('cnt', 5)
                .append('units', 'imperial')
        }).pipe(
            map((response: any) => {
                const city = response.city.name;

                return response.list.map((x: any) => {
                    const icon = this.possibleIcons.includes(x.weather[0]?.main?.toLowerCase()) ?
                        x.weather[0]?.main?.toLowerCase() :
                        'sun';

                    return {
                        city: city,
                        temperature: x.temp.day,
                        minTemp: x.temp.min,
                        maxTemp: x.temp.max,
                        condition: x.weather[0]?.main,
                        icon: `${icon}.png`,
                        timestamp: x.dt * 1000
                    } as Forecast;
                });
            })
        );
    }
}
