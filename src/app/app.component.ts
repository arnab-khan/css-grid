import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { ApiService } from './services/api/api.service';
import { GridTutorialList } from './interface/grid-tutorial-list';
import { DataTransferService } from './services/data-transfer/data-transfer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    MainComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {

  gridTutorialList: GridTutorialList[] = [];
  mainLoader = true;
  mainPageLoader = true;
  apiCalledList: { [x: string]: boolean } = {};

  constructor(
    private apiService: ApiService,
    private dataTransferService: DataTransferService
  ) { }

  ngOnInit(): void {
    this.getGridTutorialList();
    this.dataTransferService.getApiCalledList().subscribe({
      next: (response: any) => {
        this.checkifAllApiCallCompleted(response);
      },
      error: (error: any) => {
        console.error('error', error);
      },
    });

  }

  getGridTutorialList() {
    this.checkifAllApiCallCompleted({ gridTutorialList: false });
    this.apiService.getGridTutorialList().subscribe({
      next: (response: any) => {
        console.log('gridTutorialList', response);
        this.gridTutorialList = response;
        this.dataTransferService.storeGridToturialList(this.gridTutorialList);
        this.checkifAllApiCallCompleted({ gridTutorialList: true });
      },
      error: (error: any) => {
        console.error('error', error);
      },
    });
  }

  checkifAllApiCallCompleted(apiCalled: { [x: string]: boolean }) {
    Object.assign(this.apiCalledList, apiCalled);
    const apiCalledValueList = Object.values(this.apiCalledList);
    const notAllApiCompleted = apiCalledValueList.some((element) => {
      return !element;
    });
    setTimeout(() => {
      setTimeout(() => {
        if (!notAllApiCompleted) {
          this.mainLoader = false;
          this.mainPageLoader = false;
          console.log('apiCalledList', this.apiCalledList);
        }
      }, 0);
    }, 0);
  }

  clickedMenu() {
    this.mainPageLoader = true;
    this.checkifAllApiCallCompleted({ clickedMenu: false });
    setTimeout(() => {
      setTimeout(() => {
        this.checkifAllApiCallCompleted({ clickedMenu: true });
      }, 0);
    }, 0);
  }
}
