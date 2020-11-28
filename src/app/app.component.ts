import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'JMBG-validator';
  jmbg: string;

  validate(){
    if(this.jmbg == null || this.jmbg.length < 13) {
      window.alert("JMBG mora sadrzati 13 cifara!");
      return;
    }
    window.alert(this.jmbg);
  }
}
