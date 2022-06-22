// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
////

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  user: any[] = [];
  username: any = localStorage.getItem('user');
  movies: any[] = [];
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  //called when component has fully been mounted
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  getUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }
  }

  openGenreDialog(
    name: string,
    description: string,
  ): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      maxWidth: '400px'
    });
  }

  openDirectorDialog(
    name: string,
    birth: string,
    bio: string
  ): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Birth: birth,
        Bio: bio
      },
      maxWidth: '400px'
    });
  }

  openMovieDetailsDialog(
    title: string,
    imagePath: any,
    description: string,
    genre: string,
    director: string
  ): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
        Genre: genre,
        Director: director,
      },
      width: '400px',
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavMovies().subscribe((resp) => {
      this.favMovies = resp;
      // console.log('getFavorites');
      return this.favMovies;
    })
  }

  addFavorite(id: string): void {
    this.fetchApiData.addMovieToFavMovies(id).subscribe((resp: any) => {
      // console.log(resp);
      this.favMovies = resp;
      console.log('added');

      this.ngOnInit();
    });
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteMovieFromFavMovies(id).subscribe((resp: any) => {
      this.favMovies = resp;
      console.log('removed');

      this.ngOnInit();
      // return this.favMovies;
    });
  }

  isFavorite(id: string): boolean {
    console.log(id);
    return this.favMovies.includes(id);
  }

}
