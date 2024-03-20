import { Component, OnInit } from '@angular/core';
import { ContactDetailsService } from '../../services/contact-details/contact-details.service';
import { ContactDetail } from '../../interface/contact-details';
import { SortService } from '../../services/sort/sort.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  contactDetails: ContactDetail[] = [];

  constructor(
    private contactDetailsService: ContactDetailsService,
    private sortService: SortService
  ) { }

  ngOnInit(): void {
    this.contactDetails = this.sortService.ascendingSort(Object.values(this.contactDetailsService.contactDetails), 'order');
  }

}
