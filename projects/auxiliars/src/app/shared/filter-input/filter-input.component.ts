// filter-input.component.ts
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SuggestionService } from './suggestion.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
export class FilterInputComponent implements OnInit {
  @Input() endpoint!: string;
  @Input() searchField!: string;
  suggestions: any[] = [];
  @Output() selected = new EventEmitter<any>();
  private searchTerms = new Subject<string>();

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit() {
    this.searchTerms
      .pipe(
        // Espera 300ms después de cada pulsación de tecla para considerar el término
        debounceTime(300),
        // Cambia a una nueva búsqueda observable cada vez que el término cambia
        switchMap((term: string) =>
          this.suggestionService.getSuggestions(
            this.endpoint,
            term,
            this.searchField
          )
        ),
        // Manejar errores aquí si es necesario
        catchError((error) => {
          console.error(error);
          return [];
        })
      )
      .subscribe((suggestions) => {
        this.suggestions = suggestions;
      });
  }

  // Llama a este método en el evento de entrada del input
  onSearchChange(term: string): void {
    this.searchTerms.next(term);
  }

  onSelect(suggestion: any): void {
    this.selected.emit(suggestion);
    // Limpia las sugerencias después de la selección
    this.suggestions = [];
  }

  // En filter-input.component.ts

  // Método para manejar el evento de entrada de forma segura
  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement | null; // Aserción segura de tipo
    console.log(input);
    if (input) {
      this.onSearchChange(input.value); // Llama a onSearchChange con el valor del input
    }
  }
}
