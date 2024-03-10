import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { ApiService } from './services/api/api.service';
import { GridTutorialListService } from './services/grid-tutorial-list/grid-tutorial-list.service';
import { OverviewComponent } from './components/main/grid-tutorial-components/overview/overview.component';
import { GridTutorialList } from './interface/grid-tutorial-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    MainComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  gridTutorialList: GridTutorialList[]=[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getGridTutorialList();
    this.get8GridTutorialList()
  }

  getGridTutorialList() {
    this.apiService.getGridTutorialList().subscribe({
      next: (response: any) => {
        console.log('gridTutorialList', response);
        this.gridTutorialList = response;
      },
      error: (error: any) => {
        console.error('error', error);
      }
    });
  }  
  get8GridTutorialList() {
    this.apiService.getScssCode().subscribe({
      next: (response: any) => {
        console.log('gridTutorialList', atob(response.content));
      },
      error: (error: any) => {
        console.error('error', error);
      }
    });
  } 
  
}
