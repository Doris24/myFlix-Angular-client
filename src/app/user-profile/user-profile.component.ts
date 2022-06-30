import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favMovies: any[] = [];
  favMoviesView: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    // this.getFavoriteMovies();
  }

  getUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        this.favMovies = this.user.FavoriteMovies;
        console.log('-------------------' + this.user.FavoriteMovies);
        this.getFavoriteMovies()
        console.log(this.favMovies);

        return this.user;
      });
    }
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openEditProfile(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '300px',
      panelClass: 'edit-user-custom',
    });
  }

  deleteProfile(): void {
    if (confirm('Do you want to delete your account? This cannot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account was deleted', 'OK', {
          duration: 6000,
        });
      });
      this.router.navigate(['welcome']);
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
      });
    }
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavMovies().subscribe((resp) => {
      this.favMovies = resp;
      console.log('getFM this.favMovies: ' + this.favMovies);
      this.favMovies.map(id => {
        const mov = this.movies.find((movie) => id == movie._id)
        this.favMoviesView.push(mov)
      })
    })
  }

  // isFavorite(id: string): string {
  //   if (this.favMovies.includes(id)) {
  //     return "remove"
  //   }
  //   return "removed"
  // }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteMovieFromFavMovies(id).subscribe((resp: any) => {
      console.log('removed');
      console.log('this.favMovies: ' + this.favMovies);
      // return this.getFavoriteMovies();
    });
  }
}
