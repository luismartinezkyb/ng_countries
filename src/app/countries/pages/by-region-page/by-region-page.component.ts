import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

type Region = 'Africa'|'Asia'|'Oceania'|'Europe'|'Americas' ;

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  constructor(private countriesService: CountriesService){}
  public countries: Country[]=[];
  public isLoading: boolean = false;
  public regions:Region[] = ['Africa', 'Asia', 'Oceania', 'Europe', 'Americas' ]
  public selectedRegion?: Region;

  searchCountriesByRegion(term:Region):void{
    this.isLoading = true;
    this.selectedRegion = term;
    this.countriesService.searchByRegion(term)
    .subscribe(countries=>{
      this.countries=countries;
      this.isLoading = false;
    })
    // console.log('Estoy recibiendo aaa', term);
  }
}
