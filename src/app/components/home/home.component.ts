import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public homeNombrePanel: String = "";

  constructor() { }

  ngOnInit(): void {
  }

  public homeFromHeaderMostrarPanel(nombrePanel: String){

      this.homeNombrePanel = nombrePanel;

  }

}
