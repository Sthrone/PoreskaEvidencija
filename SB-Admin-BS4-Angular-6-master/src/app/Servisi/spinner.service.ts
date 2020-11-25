import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService 
{
  private loading: Subject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  constructor() 
  {
    this.SetLoaderState(false);
  }

  public SetLoaderState(state: boolean)
  {
    if (state == true)
      this.loading.next(state);
    else
    {
      setTimeout(() => 
      { 
        this.loading.next(state);
      }, 500);
    }
  }

}
