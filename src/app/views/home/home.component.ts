import {Component, OnInit} from '@angular/core';
import {Constants} from "../../utils/constants";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    formControl = new FormControl(null);
    locations: string[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.locations = localStorage.getItem(Constants.Locations) ?
            JSON.parse(localStorage.getItem(Constants.Locations) as string) :
            [];
    }

    onAddLocation(): void {
        const locations: string[] = localStorage.getItem(Constants.Locations) ?
            JSON.parse(localStorage.getItem(Constants.Locations) as string) :
            [];

        if (this.formControl.value !== null &&
            this.formControl.value.trim().length > 0 &&
            !locations.includes(this.formControl.value.trim())) {
            locations.push(this.formControl.value);
        }

        this.locations = [...locations];
        localStorage.setItem(Constants.Locations, JSON.stringify(locations));
    }

    onRemoveLocation(location: string): void {
        const locations: string[] = localStorage.getItem(Constants.Locations) ?
            JSON.parse(localStorage.getItem(Constants.Locations) as string) :
            [];

        const index = locations.indexOf(location);
        if (index > -1) {
            locations.splice(index, 1);

            this.locations = [...locations];
            localStorage.setItem(Constants.Locations, JSON.stringify(locations));
        }
    }

}
