// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { DirectorComponent } from '../director/director.component';
////

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  //called when component has fully been mounted
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(
    name: string,
    description: string
  ): void {
    this.dialog.open(GenreComponent), {
      data: {
        Name: name,
        Descripton: description,
      },
      width: '300px'
    }
    console.log('Genre: ' + name);

  }

  openDirectorDialog(
    name: string,
    birth: string,
    bio: string
  ): void {
    this.dialog.open(DirectorComponent), {
      data: {
        Name: name,
        Birth: birth,
        Bio: bio
      },
      width: '300px'
    }
  }

  openMovieDetailsDialog(
    title: string,
    imagePath: any,
    description: string,
    genre: string,
    director: string
  ): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
        Genre: genre,
        Director: director,
      },
      width: '500px',
    });
  }
}
