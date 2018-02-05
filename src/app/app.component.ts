import { Component, OnInit, Inject, Optional } from '@angular/core';

import { ConfigOptionsService } from './shared/config-options.service';
import { ConstantsService } from './shared/constants.service';
import { GeneratorService } from './shared/generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public title: string;
  public version: string;
  public user: string;
  public pass: string;

  constructor(
    private configOptionsService: ConfigOptionsService,
    @Inject(ConstantsService) private constants,
    @Optional() private generatorService: GeneratorService,
  ) {}

  ngOnInit() {
    this.title = this.constants.title;
    this.version = this.constants.version;
    this.user = this.configOptionsService.get('username');
    this.pass = this.generatorService ? this.generatorService.generate() : '12345678';
  }
}
