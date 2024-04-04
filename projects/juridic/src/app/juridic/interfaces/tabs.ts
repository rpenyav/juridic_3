import { Type } from '@angular/core';

export interface Tab {
  id: string;
  title: string;
  content: string;
  selected?: boolean;
  component?: Type<any>;
}
