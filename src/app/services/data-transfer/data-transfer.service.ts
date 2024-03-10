import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GridTutorialList } from '../../interface/grid-tutorial-list';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  private gridToturialList = new BehaviorSubject<GridTutorialList[] | null>(null);

  storeGridToturialList(data: GridTutorialList[]) {
    this.gridToturialList.next(data);
  }

  getGridToturialList(): Observable<GridTutorialList[] | null> {
    return this.gridToturialList.asObservable();
  }

}
