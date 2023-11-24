import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit {
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
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region
  }
}
