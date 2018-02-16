import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../../services';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {
  message: string;
  callback: Function;
  type = 'info';
  open = true;

  constructor(
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.message = this.messageService.getMessage();
    this.type = this.messageService.getType();
    this.callback = this.messageService.getCallback();
  }

  close() {
    this.open = false;
    this.router.navigate([{ outlets: { message: null }}]);
    if (typeof this.callback === 'function') {
      this.callback();
    }
  }
}
