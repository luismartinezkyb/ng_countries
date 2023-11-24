import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit{  
  constructor(private readonly countriesService: CountriesService){}

  public countries: Country[]=[];
  public isLoading: boolean = false;
  public initValue:string = '';

  searchCountriesByCountry(term:string):void{
    this.isLoading= true;
    this.countriesService.searchByCountry(term)
    .subscribe(countries=>{
      this.countries=countries;
      this.isLoading= false;
    })
    
  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initValue = this.countriesService.cacheStore.byCountry.term;
  }
}
