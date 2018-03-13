import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GeneratorService, ModalService, AuthService } from './services';
import { NotFoundComponent, ModalComponent, AuthComponent } from './components';
import { AuthGuard } from './guards/auth.guard';

const generatorFactory = () => (new GeneratorService()).init(16);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NotFoundComponent,
    ModalComponent,
    AuthComponent,
  ],
  exports: [
    NotFoundComponent,
    AuthComponent,
  ],
  providers: [
    { provide: GeneratorService, useFactory: generatorFactory },
    ModalService,
    AuthService,
    AuthGuard,
  ],
})
export class SharedModule { }
