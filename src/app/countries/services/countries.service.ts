import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }
  

  searchByCapital(term:string):Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    .pipe(
      catchError(error => of([]))
    );
  }
  searchByCountry(term:string):Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${term}`)
    .pipe(
      catchError(error => of([]))
    );
  }
  searchByRegion(term:string):Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${term}`)
    .pipe(
      catchError(error => of([]))
    );
  }
  searchByAlphaCode(term:string):Observable<Country | null>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${term}`)
    .pipe(
      map(countries => countries.length>0 ? countries[0] : null),
      catchError(error => of(null))
    );
  }

}