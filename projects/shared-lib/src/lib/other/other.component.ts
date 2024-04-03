import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'projects/authentication/src/app/authentication.service';

@Component({
  selector: 'lib-other',
  template: '<p>User: </p>',
  // styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {
  // user = 'A';

  constructor(private service: AuthenticationService) {}

  ngOnInit(): void {}
}
