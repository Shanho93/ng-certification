import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {WeatherCardComponent} from './components/weather-card/weather-card.component';
import {ForecastComponent} from './views/forecast/forecast.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './views/home/home.component';
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'forecast/:zipcode', component: ForecastComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule, FormsModule, ReactiveFormsModule],
    declarations: [AppComponent, WeatherCardComponent, ForecastComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
