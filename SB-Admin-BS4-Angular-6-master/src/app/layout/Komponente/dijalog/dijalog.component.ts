import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dijalog',
  templateUrl: './dijalog.component.html',
  styleUrls: ['./dijalog.component.scss']
})
export class DijalogComponent implements OnInit 
{
  poruka: string;

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: number,
    private translate: TranslateService
  ) 
  { 
    this.poruka = data['tekst'];
  }

  ngOnInit() 
  {

  }

}
