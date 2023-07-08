import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerService } from 'src/app/services/container.service';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() fromHeaderMostrarPanel = new EventEmitter<String>; 

  constructor() {

   }

  ngOnInit(): void {


  }

  mostrarPanel(nombrePanel: String){
    this.fromHeaderMostrarPanel.emit(nombrePanel);
  }

}
