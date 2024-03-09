import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridTutorialList } from '../../interface/grid-tutorial-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getGridTutorialList() {
    return this.httpClient.get('assets/json/grid-tutorial-list.json');
  }

}
