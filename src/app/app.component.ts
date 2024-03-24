import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { ApiService } from './services/api/api.service';
import { GridTutorialList } from './interface/grid-tutorial-list';
import { DataTransferService } from './services/data-transfer/data-transfer.service';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';

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
  openMenu = true;
  resetPageIntervel: any;
  isMobileScreen = false;
  pageLoaded = false;
  urlParams: Params | undefined;

  constructor(
    private apiService: ApiService,
    private dataTransferService: DataTransferService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.urlParams = this.activatedRoute.snapshot.queryParams;
    this.getGridTutorialList();
    this.checkIfAllApiCallCompletedOtherComponents();
    this.windoResize();
    this.resetMenuOpen();
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
    // console.log('apiCalledList', this.apiCalledList);
    setTimeout(() => {
      setTimeout(() => {
        if (!this.notAllApiCompleted && !this.pageLoaded) {
          this.mainLoader = false;
          this.mainPageLoader = false;
          this.scrollToSearchElement();
          this.pageLoaded = true;
        }
      }, 0);
    }, 0);
  }

  clickedMenu() {
    this.pageLoaded = false;
    this.mainPageLoader = true;
    this.checkIfAllApiCallCompleted({ clickedMenu: false });
    setTimeout(() => {
      setTimeout(() => {
        this.checkIfAllApiCallCompleted({ clickedMenu: true });
      }, 0);
    }, 0);
    if (this.isMobileScreen) {
      this.openMenu = false;
    }
  }

  clickHamburgerIcon() {
    this.openMenu = !this.openMenu;
    setTimeout(() => {
      this.dataTransferService.setRefrashEditor(true);
    }, 500);
  }



  windoResize() {
    fromEvent(window, 'resize').subscribe(() => {
      this.resetMenuOpen();
      this.resetPage();
    })
  }

  resetPage() {
    if (this.resetPageIntervel) {
      clearTimeout(this.resetPageIntervel);
    }
    this.resetPageIntervel = setInterval(() => {
      this.dataTransferService.setRefrashEditor(true);
      clearTimeout(this.resetPageIntervel);
    }, 500);
  }

  resetMenuOpen() {
    this.isMobileScreen = window.innerWidth > 991 ? false : true;
    this.openMenu = this.isMobileScreen ? false : true;
  }

  scrollToSearchElement() {
    setTimeout(() => {
      this.urlParams = this.activatedRoute.snapshot.queryParams;
      if (this.urlParams?.['scrollElementClass']) {
        const scrollElement = document.querySelector(this.urlParams['scrollElementClass']);
        if (scrollElement) {
          scrollElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      // console.log('call');
    }, 0);
  }
}
