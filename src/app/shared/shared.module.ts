import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GeneratorService, MessageService, AuthService } from './services';
import { NotFoundComponent, MessageComponent, AuthComponent } from './components';
import { AuthGuard } from './guards/auth.guard';

const generatorFactory = () => (new GeneratorService()).init(16);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    NotFoundComponent,
    MessageComponent,
    AuthComponent,
  ],
  exports: [
    NotFoundComponent,
    AuthComponent,
  ],
  providers: [
    { provide: GeneratorService, useFactory: generatorFactory },
    MessageService,
    AuthService,
    AuthGuard,
  ],
})
export class SharedModule { }
