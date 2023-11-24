import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: 'search-box.component.html'
})

export class SharedSearchBoxComponent implements OnInit, OnDestroy {
  private debouncer:Subject<string>=new Subject<string>();
  private debouncerSubscription?:Subscription;

  @Input()
  public initialValue:string = '';

  @Input()
  public placeholder: string = '';

  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtSearchInput')
  public searchInput!:ElementRef<HTMLInputElement>;

  searchByInput():void{
    const inputSearchvalue = this.searchInput.nativeElement.value;
    if(inputSearchvalue.length===0)return;
    // console.log('INPUT SEARCH', inputSearchvalue)
    this.onSearch.emit(inputSearchvalue)
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);
  }

  ngOnInit(): void {
    this.debouncerSubscription =  this.debouncer
    .pipe(
      debounceTime(600) //Tiempo para esperar al usuario a ejecutar el debounce
    )
    .subscribe(value=>{
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
      this.debouncerSubscription?.unsubscribe();
  }


}