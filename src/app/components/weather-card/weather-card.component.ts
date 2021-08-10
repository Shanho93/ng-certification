import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Forecast} from "../../models/forecast";
import {ForecastService} from "../../services/forecast.service";
import {Observable, of} from "rxjs";

@Component({
    selector: 'app-weather-card',
    templateUrl: './weather-card.component.html',
    styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
    @Input() zipCode: string | null = null;
    @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();
    forecast$: Observable<Forecast | null> = of(null);

    constructor(private readonly forecastService: ForecastService) {
    }

    ngOnInit(): void {
        if (this.zipCode !== null && this.zipCode.length > 0) {
            this.forecast$ = this.forecastService.getWeatherDataByZipCode(this.zipCode);
        }
    }

    onRemoveLocation(): void {
        if (this.zipCode !== null && this.zipCode.length > 0) {
            this.onRemove.emit(this.zipCode);
        }
    }
}
