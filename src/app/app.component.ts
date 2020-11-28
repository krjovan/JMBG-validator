import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'JMBG-validator';

  jmbg: string;
  nizGresaka: string[];

  ngOnInit(): void {
    this.nizGresaka.push('prva greska');
    this.nizGresaka.push('druga greska');
    this.nizGresaka.push('treca greska');
    this.nizGresaka.push('cetvrta greska');
  }

  validate(){
    window.alert(this.jmbg);
  }
}
