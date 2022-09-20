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

  /**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array containing movies objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Gets user data from local storage
   * @returns current user data
   * @function getUser
   */
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

  /**
   * opens the dialog with the reqested data about the movie genre
   * @param name 
   * @param description 
   */
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

  /**
   * opens the dialog with the reqested data about the movie director 
   * @param name 
   * @param birth 
   * @param bio 
   */
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

  /**
   * opens the dialog with the reqested data about the movie
   * @param title 
   * @param imagePath 
   * @param description 
   * @param genre 
   * @param director 
   */
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

  /**
   * requests an array with the favorite movies
   * @function getFavMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavMovies().subscribe((resp: any) => {
      this.favMovies = resp;
      console.log('favMovies: ' + this.favMovies);
      // console.log('getFavorites');
    })
  }

  /**
   * checks if movie should be added or removed from the favorite movies list
   * @param id 
   * @returns 
   */
  addOrRemoveFavorite = (id: string) => {
    console.log("this.isFavorite(id)==", this.isFavorite(id))
    if (this.isFavorite(id) == "favorite") {
      return this.removeFavorite(id)
    } else {
      return this.addFavorite(id)
    }
  }
  /**
   * adds a movie to the favorite movies list
   * @param id 
   * @function addMovieToFavMovies
   */
  addFavorite(id: string): void {
    this.fetchApiData.addMovieToFavMovies(id).subscribe((resp: any) => {
      console.log(id + " added to favMovies")
      this.getFavoriteMovies();

    });
  }

  /**
   * removes a movie from the favorite movies list
   * @param id 
   * @function deleteMovieFromFavMovies
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteMovieFromFavMovies(id).subscribe((resp: any) => {
      console.log('removed');
      this.getFavoriteMovies();
    });
  }

  /**
   * checks state of favorite movMovies
   * @param id 
   * @returns 
   */
  isFavorite(id: string): string {
    if (this.favMovies.includes(id)) {
      return "favorite"
    }
    return "favorite_border"
  }

}
