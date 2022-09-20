import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * navigates to welcome page after removing the user data from local storage
   */
  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(['welcome']);
  }

  /**
   * navigates to user profile page
   */
  openProfilePage(): void {
    this.router.navigate(['profile']);
  }

  /**
   * navigates to movies page / main page
   */
  openMovieCards(): void {
    this.router.navigate(['movies']);
  }


}
