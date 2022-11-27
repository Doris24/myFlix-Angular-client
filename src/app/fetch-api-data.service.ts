// implement the logic for making API calls for all the endpoints 

import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
// const apiUrl = 'https://movyis.herokuapp.com/';
const apiUrl = 'https://movyis-api.onrender.com/';


@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * Endpoints
   */

  /**
   * Making the api call for the user registration endpoint to register a new user
   * @param userDetails 
   * @function userRegistration
   * @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * calls api login endpoint to login an existing user
   * @param userDetails 
   * @function userLogin
   * @returns the data of the user in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * calls api endpoint to get data for all movies
   * @function getAllMovies
   * @returns an array of all movies in JSON format
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * calls api endpoint to get data about a single movie
   * @function getSingleMovie
   * @returns an JSON object containing data about a single movie
   */
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:movieId', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * calls api endpoint to get data about a director
   * @function getDirector
   * @returns an JSON object containing data about a director
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * calls api endpoint to get data about a genre
   * @function getGenre
   * @returns an JSON object containing data about a genre
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * calls api endpoint to get data about a  user
   * @function getUser
   * @returns an JSON object containing data about a user
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * calls api endpoint to get data for all movies of the favorite movies list
   * @function getFavMovies
   * @returns an array of all movies of the favorite movies list in JSON format
   */
  getFavMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map((res: any): void => {
          return res.FavoriteMovies
        }),
        catchError(this.handleError));
  }

  /**
   * calls api endpoint to add a movie to the favorite movies list
   * @param movieId 
   * @function addMovieToFavMovies
   * @returns user object in JSON format
   */
  addMovieToFavMovies(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * calls api endpoint to edit the user data
   * @param userData 
   * @function editUser
   * @returns user object in JSON format
   */
  editUser(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * calls api endpoint to delete a user
   * @function deleteUser
   * @returns 
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        // map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * calls api endpoint to remove a movie from the favorite movies list
   * @param movieId 
   * @function deleteMovieFromFavMovies
   * @returns 
   */
  deleteMovieFromFavMovies(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        // map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Non-typed response extraction
   * extracts response data from HTTP response
   * @param res 
   * @returns response body or empty object
   */
  private extractResponseData(res: any): any { // Response): any {
    const body = res;
    return body || {};
  }

  private extractFavData(res: any): any { // Response): any {
    const body = res;
    return body || {};
  }

  /**
   * handles errors
   * @param error 
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    const err = new Error('Something bad happened; please try again later.');
    throwError(() => err);

  }
}