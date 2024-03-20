import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  ascendingSort(array: any[], orderKey: string) { //order elements according to ascending
    array.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => (a[orderKey] > b[orderKey]) ? 1 : ((b[orderKey] > a[orderKey]) ? -1 : 0));
    return array;
  }

}
