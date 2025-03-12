import { Component } from '@angular/core';
import { SearchService } from '../../services/serviceSearch/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.updateSearchTerm(input.value);
  }
}
