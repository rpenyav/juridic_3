import { NgModule } from '@angular/core';
import { SharedLibComponent } from './shared-lib.component';
import { OtherComponent } from './other/other.component';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  declarations: [SharedLibComponent, OtherComponent, TranslatePipe],
  imports: [],
  exports: [SharedLibComponent, OtherComponent, TranslatePipe],
})
export class SharedLibModule {}
