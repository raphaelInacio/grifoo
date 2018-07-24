import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.css']
})
export class ErrorFormComponent implements OnInit {
  constructor() { }
  @Input() public message: string;
  @Input() public description: string;
  @Input() public error: boolean;
  ngOnInit() { }
}
