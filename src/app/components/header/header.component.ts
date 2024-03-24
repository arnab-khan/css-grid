import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactDetailsService } from '../../services/contact-details/contact-details.service';
import { GridTutorialList } from '../../interface/grid-tutorial-list';
import { DataTransferService } from '../../services/data-transfer/data-transfer.service';
import { SearchItems } from '../../interface/search-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

  @Output() clickHamburgerIcon = new EventEmitter<boolean>();
  @Output() clickedSearchItem = new EventEmitter<boolean>();

  linkedinUrl: string | undefined;
  gridTutorialList: GridTutorialList[] = [];
  searchItems: SearchItems[] = [];

  constructor(
    private contactDetailsService: ContactDetailsService,
    private dataTransferService: DataTransferService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.linkedinUrl = this.contactDetailsService.contactDetails.linkedin.url;
    this.getGridTutorialList();
  }

  getGridTutorialList() {
    this.dataTransferService.storeApiCalledList({ gridToturialListHeader: false });
    this.dataTransferService.getGridToturialList().subscribe({
      next: (response) => {
        // console.log('gridTutorialList', response);
        if (response?.length) {
          this.gridTutorialList = response;
        }
        this.dataTransferService.storeApiCalledList({ gridToturialListHeader: true });
      },
      error: (error: any) => {
        console.error('error', error);
      },
    });
  }

  search(event: any) {
    const inputValue: string = (<string>event.target.value).toLowerCase().trim();
    this.searchItems = [];
    if (inputValue) {
      this.gridTutorialList.forEach(gridTutorial => {
        if (gridTutorial.heading.toLowerCase().search(inputValue) >= 0) {
          this.searchItems.push({
            title: gridTutorial.heading,
            content: gridTutorial?.description || '',
            router: gridTutorial.slug,
            scrollElementClass: gridTutorial.code
          })
        }
        gridTutorial?.content?.forEach(item => {
          if (item?.heading && item.heading.toLowerCase().search(inputValue) >= 0) {
            this.searchItems.push({
              title: item.heading,
              content: item?.description || '',
              router: gridTutorial.slug,
              scrollElementClass: `${gridTutorial.code}_${item.code}`
            })
          }
        })
      })
    }
    // console.log('searchItems', this.searchItems);
  }

  goToSearchItem(router: string, scrollElementClass: string) {
    this.router.navigate(
      [`/${router}`],
      { queryParams: { scrollElementClass: `.toturial_scroll_${scrollElementClass}` } }
    );
    this.searchItems = [];
    this.clickedSearchItem.emit(true);
  }

}
