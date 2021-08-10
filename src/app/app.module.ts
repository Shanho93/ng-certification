import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ForecastComponent } from './views/forecast/forecast.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, WeatherCardComponent, ForecastComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
