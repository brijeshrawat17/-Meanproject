import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { icons } from 'glyphicons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  iscollapsed = true;
  constructor(private authSerivce: AuthService, private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {

  }

  onLogoutClick() {

    this.authSerivce.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }
}
