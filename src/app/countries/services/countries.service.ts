import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCapital: { term:'', countries:[] },
    byCountry:{ term:'', countries:[] },
    byRegion:{ region:'', countries:[] },

  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }
  
  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(error => of([]))
    );
  }

  searchByCapital(term:string):Observable<Country[]>{
    return this.getCountriesRequest(`${this.apiUrl}/capital/${term}`)
    .pipe(
      tap(countries => this.cacheStore.byCapital = {term, countries}),
      tap(()=>this.saveToLocalStorage())
    )
  }
  searchByCountry(term:string):Observable<Country[]>{
    return this.getCountriesRequest(`${this.apiUrl}/name/${term}`)
    .pipe(
      tap(countries => this.cacheStore.byCountry = {term, countries}),
      tap(()=>this.saveToLocalStorage())
    )
  }
  searchByRegion(region:Region):Observable<Country[]>{
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region, countries}),
      tap(()=>this.saveToLocalStorage())
    )
  }
  searchByAlphaCode(term:string):Observable<Country | null>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${term}`)
    .pipe(
      map(countries => countries.length>0 ? countries[0] : null),
      catchError(error => of(null))
    );
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    const store = localStorage.getItem('cacheStore')
    if(!store) return;
    this.cacheStore = JSON.parse(store);

  }
}