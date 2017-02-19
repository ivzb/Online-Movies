import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    searchPhrase: string;

    constructor(private route: ActivatedRoute, private router: Router) { }

    searchMovie() {
      if (this.searchPhrase.length > 0) {
        this.router.navigate(['/movies', this.searchPhrase, 1]);
      }
    }
}