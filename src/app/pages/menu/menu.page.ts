import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
  pages = [
    {
      title: 'Report a Crime',
      icon: 'chatboxes',
      url: '/menu/report'
    },
    {
      title: 'View Report',
      icon: 'list',
      url: '/menu/view'
    },
    {
      title: 'Settings',
      icon: 'cog',
      url: '/menu/settings'
    }
  ];

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

  pageRedirect(page){
    this.router.navigate([page.url]);
  }

  logout() {
    this.auth.doLogout().finally(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
