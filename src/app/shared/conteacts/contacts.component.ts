import { Component, HostBinding, OnInit } from '@angular/core';
import { ContactShowService } from '../../core/services/contact-show.service';
import { fadeIn } from '../../core/animation';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [
    fadeIn,
  ]
})
export class ContactsComponent implements OnInit {
  @HostBinding('class.hiddenContacts') public hidden = true;

  constructor(
    public contactShowService: ContactShowService,
  ) {

  }

  ngOnInit() {
    this.hidden = !this.contactShowService.shown;
    this.contactShowService.onChange
      .subscribe((value: boolean) => {
        this.hidden = !value;
      });
  }

}
