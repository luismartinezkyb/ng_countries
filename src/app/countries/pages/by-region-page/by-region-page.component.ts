import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  constructor(private countriesService: CountriesService){}
  public countries: Country[]=[];
  

  searchCountriesByRegion(term:string):void{
    this.countriesService.searchByRegion(term)
    .subscribe(countries=>{
      this.countries=countries;
    })
    // console.log('Estoy recibiendo aaa', term);
  }
}
