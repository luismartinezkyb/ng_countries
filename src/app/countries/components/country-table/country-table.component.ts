import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-table',
  templateUrl: 'country-table.component.html'
})

export class CountriesCountryTableComponent{

  @Input()
  public countries: Country[]=[];
}