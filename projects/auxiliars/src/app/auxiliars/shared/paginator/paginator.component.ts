import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

type PageItem = number | '...';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() pageSize: number = 0;
  @Input() totalElements: number = 0;
  @Input() pageNumber: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    const savedPageNumber = localStorage.getItem('pageNumber');
    if (savedPageNumber) {
      this.pageNumber = parseInt(savedPageNumber, 10);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize);
  }

  get pageRange(): PageItem[] {
    const rangeSize = 3;
    let start = Math.max(this.pageNumber - rangeSize, 1);
    let end = Math.min(this.pageNumber + rangeSize, this.totalPages);

    if (end - start < rangeSize * 2) {
      start = Math.max(end - rangeSize * 2, 1);
      end = Math.min(start + rangeSize * 2, this.totalPages);
    }

    const pages: PageItem[] = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );

    if (start > 2) {
      pages.unshift('...');
      pages.unshift(1);
    } else if (start === 2) {
      pages.unshift(1);
    }

    if (end < this.totalPages - 1) {
      pages.push('...');
      pages.push(this.totalPages);
    } else if (end === this.totalPages - 1) {
      pages.push(this.totalPages);
    }

    return pages;
  }

  onPageChange(page: PageItem): void {
    if (page === '...') return;
    this.pageNumber = page as number;
    localStorage.setItem('pageNumber', this.pageNumber.toString());
    this.pageChange.emit(this.pageNumber);
  }
}
