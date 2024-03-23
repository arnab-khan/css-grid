import { Injectable } from '@angular/core';
import { ContactDetails } from '../../interface/contact-details';

@Injectable({
  providedIn: 'root'
})
export class ContactDetailsService {

  contactDetails: ContactDetails = {
    linkedin: {
      label: 'LinkedIn',
      value: 'https://www.linkedin.com/in/arnab-khan-14868318b',
      url: 'https://www.linkedin.com/in/arnab-khan-14868318b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      order: 3
    },
    email: {
      label: 'Email',
      value: 'arnabkhanxyz@outlook.com',
      url: 'mailto:arnabkhanxyz@outlook.com',
      order: 1
    },
    phone: {
      label: 'Phone',
      value: '+91 7407930967',
      url: 'tel:+917407930967',
      order: 0
    },
    whatsapp: {
      label: 'WhatsApp',
      value: '+91 7407930967',
      url: 'https://wa.me/917407930967',
      order: 2
    },
    github: {
      label: 'GitHub',
      value: 'https://github.com/arnab-khan',
      url: 'https://github.com/arnab-khan',
      order: 4
    }
  }

  constructor() { }
}
