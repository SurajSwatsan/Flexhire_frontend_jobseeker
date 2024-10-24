
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchQuery: string = ''; // Store the search query

  onSearch(event: Event) {
    event.preventDefault(); // Prevent default form submission

    if (this.searchQuery.trim()) { // Check if the query is not empty
      console.log('Searching for:', this.searchQuery);
      // Here, implement your search logic, like navigating to a search results page or filtering results
      // For example:
      // this.router.navigate(['/search-results'], { queryParams: { query: this.searchQuery } });
    } else {
      console.log('Please enter a search term.');
    }
  }
}
