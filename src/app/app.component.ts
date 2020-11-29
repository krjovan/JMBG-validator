import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as data from './regioni.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'JMBG-validator';
  jmbg: string;
  nizGresaka: string[]=[];
  regioni=data["default"];
  display ={jmbg:"",datum:null,danUNedelji:"",siriRegion:"",uziRegion:"",redosled:0,pol:"",kontrolnaCifra:0};
  dani:string[]=["Nedelja","Ponedeljak","Utorak","Sreda","Četvrtak","Petak","Subota"];

  validate(){
    this.display={jmbg:"",datum:null,danUNedelji:"",siriRegion:"",uziRegion:"",redosled:0,pol:"",kontrolnaCifra:0};
    this.nizGresaka=[];
    if(this.jmbg == null || this.jmbg.length != 13) {
      this.nizGresaka.push("JMBG mora sadrzati 13 cifara!");
      return;
    }
    // 3008996773614
    // ddmmyyyRRbbbK
    // 0123456789
    // ABVGDĐEŽZIJKL

    let today=new Date();
    let dan=Number(this.jmbg.substring(0,2));
    let mesec=Number(this.jmbg.substring(2,4));
    let godina=Number(this.jmbg.substring(4,7));
    godina+=(godina>799&&godina<1000)?1000:2000;

    let region=Number(this.jmbg.substring(7,9));
    let broj=Number(this.jmbg.substring(9,12));
    let kontrolnaCifra=Number(this.jmbg.substring(12,13));

    let datumRodjenja=new Date(mesec+"/"+dan+"/"+godina);

    //window.alert(this.isValidDate(datumRodjenja));
    if(!this.isValidDate(datumRodjenja))
      this.nizGresaka.push("Uneli ste nepostojeci datum rodjenja! (proverite prvih sedam cifara)");

    if(today<datumRodjenja)
      this.nizGresaka.push("Uneli ste datum u buducnosti! (proverite prvih sedam cifara)");

    let me=this,nasao=false;
    Object.keys(this.regioni).forEach(function (key) {
      if(Number(key)==region){
        nasao=true;
        me.display.siriRegion=me.regioni[key].drzava;
        me.display.uziRegion=me.regioni[key].region;
      }
    });
    
    if(!nasao)
      this.nizGresaka.push("Uneli ste region koji ne postoji! (proverite osmu i devetu cifru)");

    if(!this.kontrolnaCifra())
      this.nizGresaka.push("Uneli ste pogresan kontrolni broj! (proverite poslednju cifru)");
    if(this.nizGresaka.length==0){
      this.display.pol=(broj>-1&&broj<500)?"Muški":"Ženski";
      this.display.danUNedelji=this.dani[datumRodjenja.getDay()];
      this.display.redosled=(broj>-1&&broj<500)?(broj+1):(broj-499);
      this.display.kontrolnaCifra=kontrolnaCifra;
      this.display.datum=datumRodjenja;
      this.display.jmbg=this.jmbg;
    }
  }

  kontrolnaCifra():boolean{
    // ABVGDĐEŽZIJKL
    let a=  Number(this.jmbg.substring(0,1));
    let b=  Number(this.jmbg.substring(1,2));
    let v=  Number(this.jmbg.substring(2,3));
    let g=  Number(this.jmbg.substring(3,4));
    let d=  Number(this.jmbg.substring(4,5));
    let dj= Number(this.jmbg.substring(5,6));
    let e=  Number(this.jmbg.substring(6,7));
    let zj= Number(this.jmbg.substring(7,8));
    let z=  Number(this.jmbg.substring(8,9));
    let i=  Number(this.jmbg.substring(9,10));
    let j=  Number(this.jmbg.substring(10,11));
    let k=  Number(this.jmbg.substring(11,12));
    let l=  Number(this.jmbg.substring(12,13));
    let proracun=11-(( 7*(a+e) + 6*(b+zj) + 5*(v+z) + 4*(g+i) + 3*(d+j) + 2*(dj+k))%11);
    if(proracun>0&&proracun<10)return (proracun==l);
    else return (0==l);
  }

  isValidDate(d:Date):boolean {
    if (Object.prototype.toString.call(d) === "[object Date]") {
      // it is a date
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        return false;// date is not valid
      } else {
        return true;// date is valid
      }
    } else {
      return false;// not a date
    }
  }
  
  changeJMBG():void{
    this.display={jmbg:"",datum:null,danUNedelji:"",siriRegion:"",uziRegion:"",redosled:0,pol:"",kontrolnaCifra:0};
    this.nizGresaka=[];
  }
}
