# MyFlixAngularClient
A client-side for a movie app based on server-side REST API and database ([movie-api](https://github.com/Doris24/movie-api)) built with Angular. Users can register and log in, view data about the movies, update their personal information and create a list of their favorite movies.

## Key Features
* The app displays a welcome view where users will be able to either log in or register an account.
* Once authenticated, the user should now view all movies.
* Upon clicking on a particular movie-card, users will be taken to a single movie view with additional movie details. 
* A movie-card will contain the additional features:
  * A button that when clicked takes a user to the director view, where details about the director of that particular movie will be displayed.
  * A button that when clicked takes a user to the genre view
  * A button that when clicked, takes a user to the synopsis view. This view will share the movie description.
  * A button that when clicked, allows the user to add the movie to a list of favorites.

## Technologies
* Angular CLI
* TypeScript
* TypeDoc

----
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
