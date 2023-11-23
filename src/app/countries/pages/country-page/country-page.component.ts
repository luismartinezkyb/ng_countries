import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { catchError, switchMap } from 'rxjs';

@Component({
  selector: 'app-contry-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit{
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService:CountriesService,
    private router:Router
    ){}
    
  public countries: Country[] = [];
  public country?:Country;


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.countriesService.searchByAlphaCode(id))
    )
    .subscribe(country=>{
      console.log("COUNTRY",country)
      if(!country) {
        return this.router.navigateByUrl('');
      }
      this.country=country;
      return;
    })
  }

  // searchCountry(code:string){
  //   this.countriesService.searchByAlphaCode(code)
  //   .subscribe(country=>{
  //     console.log(country)
  //   })
  // }
}
