import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.scss']
})
export class AlertSuccessComponent implements OnInit {
@Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
