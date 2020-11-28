  import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject,throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogadjajiService {
  API_URL = "http://history.muffinlabs.com/date/";

  constructor(private httpClient: HttpClient) { }

  public getDogadjaji(mesec,dan){
    const headers = new HttpHeaders().set('Accept', 'application/json' );
    headers.set('Access-Control-Allow-Origin','*');
    headers.set('Access-Control-Allow-Headers','Access-Control-Allow-Headers');
    return this.httpClient.get<any>(this.API_URL+mesec+"/"+dan, { 'headers': headers })
    .pipe(catchError((error: Response) => {
      return throwError(error);
  }));
  }
}
