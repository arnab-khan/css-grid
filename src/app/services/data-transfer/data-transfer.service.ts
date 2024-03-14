import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GridTutorialList } from '../../interface/grid-tutorial-list';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  constructor() {}

  private gridToturialList = new BehaviorSubject<GridTutorialList[] | null>(
    null
  );
  private apiCalledList = new BehaviorSubject<{ [x: string]: boolean }>({});

  storeGridToturialList(data: GridTutorialList[]) {
    this.gridToturialList.next(data);
  }

  getGridToturialList(): Observable<GridTutorialList[] | null> {
    return this.gridToturialList.asObservable();
  }

  storeApiCalledList(data: { [x: string]: boolean }) {
    this.apiCalledList.next(data);
  }

  getApiCalledList(): Observable<{ [x: string]: boolean }> {
    return this.apiCalledList.asObservable();
  }
}
