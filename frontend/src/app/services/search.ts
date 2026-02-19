import { Injectable , signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
    searchText = signal('');

  setSearch(text: string) {
    this.searchText.set(text);
  
}

}



