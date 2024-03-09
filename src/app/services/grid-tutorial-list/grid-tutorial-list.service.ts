import { Injectable } from '@angular/core';
import { OverviewComponent } from '../../components/main/grid-tutorial-components/overview/overview.component';

@Injectable({
  providedIn: 'root'
})
export class GridTutorialListService {

  constructor() { }

  components = {
    overview: OverviewComponent
  }

}
