import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService 
{ 
  public loggedIn = new BehaviorSubject<boolean>(false);

  //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

  constructor(private http: Http) 
  { 
    const jwtToken = this.GetToken();
    this.loggedIn = new BehaviorSubject<boolean>(jwtToken ? true : false);
  }

  public IsAuthenticated(): boolean
  { 
    const token = this.GetToken();
    return token ? true : false;
  }

  public BuildHeaders(): Headers
  {
    const headerConfig = 
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    let token = this.GetToken();
    if (token)
    {
      headerConfig['Authorization'] = `Token ${token}`;
    }

    return new Headers(headerConfig);
  }

  //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

  public GetToken(): string
  {
    return window.localStorage['jwtToken'];
  }

  public SaveToken(token: string): void
  {
    window.localStorage['jwtToken'] = token;
  }

  public DestroyToken(): void
  {
    window.localStorage.removeItem('jwtToken');
  }

  //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

  public LoginState(state: boolean)
  {
    this.loggedIn.next(state);
  }

  public Check(user: any)
  {
    var headers = this.BuildHeaders();
    return this.http.post(environment.apiUrl+"/check", {'korisnik': user}, {headers:headers}).pipe(map(res=>res.json()));
  }

}
