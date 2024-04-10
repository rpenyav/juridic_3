import { Type } from '@angular/core';

export interface Tab {
  id: string;
  title: string;
  content: string;
  selected?: boolean;
  component?: Type<any>;
}

export interface TabsModel {
  id: string;
  title: string;
  component?: Type<any>;
  content?: string;
  //content: { component: Type<any>; data?: any };
  isSelected: boolean;
}
