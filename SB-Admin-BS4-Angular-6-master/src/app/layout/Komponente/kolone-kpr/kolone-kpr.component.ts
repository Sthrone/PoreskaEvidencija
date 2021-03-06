import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kolone-kpr',
  templateUrl: './kolone-kpr.component.html',
  styleUrls: ['./kolone-kpr.component.scss']
})
export class KoloneKprComponent implements OnInit 
{
  @Input() kolone: boolean[];
  @Output() pretrazeno = new EventEmitter();

  prozorPrikazan: boolean;

  constructor(private translate: TranslateService) 
  { 
    this.prozorPrikazan = false;
  }

  ngOnInit() 
  {

  }


  ToggleSearch()
  {
    if (this.prozorPrikazan == false)
      this.prozorPrikazan = true;
    else
      this.prozorPrikazan = false;
  }


  PromeniVidljivostKolone(colnum: number)
  {
    if (this.kolone[colnum] == true)
      this.kolone[colnum] = false;
    else
      this.kolone[colnum] = true;

    this.pretrazeno.emit(this.kolone);
  }

}
