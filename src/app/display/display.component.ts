import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import {DogadjajiService} from '../services/dogadjaji.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit,OnChanges {

  @Input() display;
  jednom=false;
  staroStanje=[];
  constructor(private service:DogadjajiService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.jednom=false;
  }
  ngOnInit(): void {

  }

  dogodiloSe(datum:Date) {
    if(!this.jednom){
        this.service.getDogadjaji((datum.getMonth()+1),datum.getDate()).subscribe(obj=>{
          let niz;
          let prvi=obj.data.Events.filter(el=>el.year==datum.getFullYear()).map(el=>{el.dogadjaj="Događaj"; return el;});
          let drugi=obj.data.Births.filter(el=>el.year==datum.getFullYear()).map(el=>{el.dogadjaj="Rođendan"; return el;});
          let treci=obj.data.Deaths.filter(el=>el.year==datum.getFullYear()).map(el=>{el.dogadjaj="Smrt"; return el;});
          niz=prvi.concat(drugi,treci);
          this.staroStanje=niz;
          this.jednom=true;
          return niz;
    });
    }else return this.staroStanje;
  }
  godineRodjenja(godine):number{
    var timeDiff = Math.abs(Date.now() - godine.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }

  vrednost(jmbg,red):number{
    if(red=="A")return Number(jmbg.substring(0,1));
    if(red=="B")return  Number(jmbg.substring(1,2));
    if(red=="V")return Number(jmbg.substring(2,3));
    if(red=="G")return Number(jmbg.substring(3,4));
    if(red=="D")return Number(jmbg.substring(4,5));
    if(red=="DJ")return Number(jmbg.substring(5,6));
    if(red=="E")return Number(jmbg.substring(6,7));
    if(red=="ZJ")return Number(jmbg.substring(7,8));
    if(red=="Z")return Number(jmbg.substring(8,9));
    if(red=="I")return Number(jmbg.substring(9,10));
    if(red=="J")return Number(jmbg.substring(10,11));
    if(red=="K")return Number(jmbg.substring(11,12));
    if(red=="L")return Number(jmbg.substring(12,13));
  }

}
