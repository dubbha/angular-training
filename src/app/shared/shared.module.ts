import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorService } from './services';
import { NotFoundComponent } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
  providers: [
    { provide: GeneratorService, useFactory: () => new GeneratorService(8) },
  ],
})
export class SharedModule { }
