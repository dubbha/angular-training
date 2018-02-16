import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorService, MessageService } from './services';
import { NotFoundComponent, MessageComponent } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [NotFoundComponent, MessageComponent],
  exports: [NotFoundComponent],
  providers: [
    { provide: GeneratorService, useFactory: () => new GeneratorService(8) },
    MessageService,
  ],
})
export class SharedModule { }
