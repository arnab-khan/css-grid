import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getHtmlCode(gridTutorialCode: string) {
    return this.httpClient.get(`assets/grid-tutorial-code/${gridTutorialCode}/code.html`, { responseType: 'text' });
  }

  getCssCode(gridTutorialCode: string) {
    return this.httpClient.get(`assets/grid-tutorial-code/${gridTutorialCode}/code.css`, { responseType: 'text' });
  }

}
