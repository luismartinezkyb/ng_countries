import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: 'search-box.component.html'
})

export class SharedSearchBoxComponent {
  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtSearchInput')
  public searchInput!:ElementRef<HTMLInputElement>;


  @Input()
  public placeholder: string = '';

  searchByInput():void{
    const inputSearchvalue = this.searchInput.nativeElement.value;
    if(inputSearchvalue.length===0)return;
    // console.log('INPUT SEARCH', inputSearchvalue)
    this.onSearch.emit(inputSearchvalue)
  }
}