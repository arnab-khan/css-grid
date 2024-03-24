import { Component, OnInit } from '@angular/core';
import { GridTutorialList } from '../../interface/grid-tutorial-list';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { RunExampleComponent } from './sub-components/run-example/run-example.component';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { DataTransferService } from '../../services/data-transfer/data-transfer.service';
import { gridTutorialCode, gridTutorialCodeList } from '../../interface/grid-toturial-code-list';
import { PageNotFoundComponent } from './sub-components/page-not-found/page-not-found.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    NgComponentOutlet,
    RunExampleComponent,
    PageNotFoundComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {

  gridTutorialList: GridTutorialList[] = [];
  currentGridTutorialList: GridTutorialList | undefined;
  gridTutorialCodeList: gridTutorialCodeList = {};
  gridTutorialComponents: { [key: string]: any } = {};
  slug: string | undefined;
  showEditor = true;

  constructor(
    private apiService: ApiService,
    private dataTransferService: DataTransferService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSlug();
    this.getGridTutorialList();
    this.changrRouter();
    this.refrashEditor();
  }

  changrRouter() {
    this.router.events.subscribe({
      next: (event: any) => {
        if (event instanceof NavigationStart) {
          setTimeout(() => {
            this.getSlug();
            this.getGridTutorialList();
          }, 0);
        }
      },
    });
  }

  getSlug() {
    this.slug = this.activatedRoute.snapshot.params['slug'];
    // console.log('slug', this.slug);
  }

  getGridTutorialList() {
    this.dataTransferService.storeApiCalledList({ gridToturialListMainPage: false });
    this.dataTransferService.getGridToturialList().subscribe({
      next: (response) => {
        // console.log('gridTutorialList', response);
        if (response?.length) {
          this.gridTutorialList = response;
          this.getCurrentGridTutorial();
        }
        this.dataTransferService.storeApiCalledList({ gridToturialListMainPage: true });
      },
      error: (error: any) => {
        console.error('error', error);
      },
    });
  }

  getCurrentGridTutorial() {
    this.currentGridTutorialList = this.gridTutorialList.find((element) => {
      return element.slug == this.slug;
    });
    // console.log('currentGridTutorialList', this.currentGridTutorialList);
    if (this.currentGridTutorialList) {
      this.currentGridTutorialList?.content.forEach((element) => {
        this.getExampleCode(element?.code);
      });
    } else {
      this.router.navigate(['/404']);
    }
  }

  getExampleCode(gridTutorialCode: string | undefined) {
    if (gridTutorialCode && !this.gridTutorialCodeList.hasOwnProperty(gridTutorialCode)) {
      const code = forkJoin({
        htmlCode: this.apiService.getHtmlCode(gridTutorialCode),
        cssCode: this.apiService.getCssCode(gridTutorialCode),
      });
      this.dataTransferService.storeApiCalledList({
        [gridTutorialCode]: false
      });
      code.subscribe({
        next: (response: gridTutorialCode) => {
          Object.assign(this.gridTutorialCodeList, {
            [gridTutorialCode]: response,
          });
          // console.log('gridTutorialCodeList', this.gridTutorialCodeList);
          this.dataTransferService.storeApiCalledList({
            [gridTutorialCode]: true
          });
        },
        error: (error: any) => {
          console.error('error', error);
        },
      });
    }
  }

  refrashEditor() {
    this.dataTransferService.getRefrashEditor().subscribe({
      next: (event: boolean) => {
        if (event) {
          this.showEditor = false;
          setTimeout(() => {
            this.showEditor = true;
          }, 0);
        }
      },
    });
  }
}