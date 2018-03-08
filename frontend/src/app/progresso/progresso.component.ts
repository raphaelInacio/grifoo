import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.css']
})
export class ProgressoComponent implements OnInit {

  constructor() { }

  @Input() public progresso: string
  @Input() public titulo: string
  @Input() public progressoStyle:Object = {'width':'0%'}

  ngOnInit() {
  }

}
