import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactDetailsService } from '../../services/contact-details/contact-details.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

  @Output() clickHamburgerIcon = new EventEmitter<boolean>();

  linkedinUrl: string | undefined;

  constructor(
    private contactDetailsService: ContactDetailsService
  ) { }

  ngOnInit(): void {
    this.linkedinUrl = this.contactDetailsService.contactDetails.linkedin.url;
  }

}
