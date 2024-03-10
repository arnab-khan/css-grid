import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { ApiService } from './services/api/api.service';
import { GridTutorialList } from './interface/grid-tutorial-list';
import { DataTransferService } from './services/data-transfer/data-transfer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    MainComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  gridTutorialList: GridTutorialList[]=[];

  constructor(
    private apiService: ApiService,
    private dataTransferService:DataTransferService
  ) { }

  ngOnInit(): void {
    this.getGridTutorialList();
  }

  getGridTutorialList() {
    this.apiService.getGridTutorialList().subscribe({
      next: (response: any) => {
        console.log('gridTutorialList', response);
        this.gridTutorialList = response;
        this.dataTransferService.storeGridToturialList(this.gridTutorialList);
      },
      error: (error: any) => {
        console.error('error', error);
      }
    });
  }
  
}
