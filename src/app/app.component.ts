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
  notAllApiCompleted: boolean | undefined;

  constructor(
    private apiService: ApiService,
    private dataTransferService: DataTransferService
  ) { }

  ngOnInit(): void {
    this.getGridTutorialList();
    this.checkIfAllApiCallCompletedOtherComponents();
  }

  getGridTutorialList() {
    this.checkIfAllApiCallCompleted({ gridTutorialList: false });
    this.apiService.getGridTutorialList().subscribe({
      next: (response: any) => {
        // console.log('gridTutorialList', response);
        this.gridTutorialList = response;
        this.dataTransferService.storeGridToturialList(this.gridTutorialList);
        setTimeout(() => {
          this.checkIfAllApiCallCompleted({ gridTutorialList: true });
        }, 0);
      },
      error: (error: any) => {
        console.error('error', error);
      },
    });
  }

  checkIfAllApiCallCompletedOtherComponents() {
    this.dataTransferService.getApiCalledList().subscribe({
      next: (response: any) => {
        this.checkIfAllApiCallCompleted(response);
      },
      error: (error: any) => {
        console.error('error', error);
      },
    });
  }

  checkIfAllApiCallCompleted(apiCalled: { [x: string]: boolean }) {
    Object.assign(this.apiCalledList, apiCalled);
    const apiCalledValueList = Object.values(this.apiCalledList);
    this.notAllApiCompleted = apiCalledValueList.some((element) => {
      return !element;
    });
    console.log('apiCalledList', this.apiCalledList);
    console.log(this.notAllApiCompleted);

    setTimeout(() => {
      setTimeout(() => {
        if (!this.notAllApiCompleted) {
          this.mainLoader = false;
          this.mainPageLoader = false;
          console.log('apiCalledList', this.apiCalledList);
        }
      }, 0);
    }, 0);
  }

  clickedMenu() {
    this.mainPageLoader = true;
    this.checkIfAllApiCallCompleted({ clickedMenu: false });
    setTimeout(() => {
      setTimeout(() => {
        this.checkIfAllApiCallCompleted({ clickedMenu: true });
      }, 0);
    }, 0);
  }
}
