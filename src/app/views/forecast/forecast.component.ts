import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ForecastService} from "../../services/forecast.service";
import {Observable, of} from "rxjs";
import {Forecast} from "../../models/forecast";

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
    forecasts$: Observable<Forecast[]> = of([]);

    constructor(private readonly route: ActivatedRoute, private readonly forecastService: ForecastService) {
    }

    ngOnInit(): void {
        const zipCode: string = this.route.snapshot.params.zipcode ?? null;

        if (zipCode !== null) {
            this.forecasts$ = this.forecastService.getForecastDataByZipCode(zipCode);
        }
    }

}
