import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Memento, MementoHistoryItem } from './memento.dto';

@Injectable({
  providedIn: 'root'
})
export class MementoService {

  private BASE_URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getMementosHistory(): Observable<MementoHistoryItem[]>{
    var response: MementoHistoryItem[] = [{
      id: 1,
      title: "A title",
      summary: "A summary",
      date: new Date()
    },
    {
      id: 2,
      title: "A title 2",
      summary: "A summary 2",
      date: new Date()
    }]

    //return of(response);
    return this.http.get<MementoHistoryItem[]>(this.BASE_URL + '/getMementoHistory')
  }

  public restoreMemento(id: number): Observable<Memento>{
    // var response: Memento = {
    //   title: "A title",
    //   content: "A summary",
    //   date: new Date()
    // };

    // return of(response);
    return this.http.get<Memento>(this.BASE_URL + '/restoreMemento?id='+ id)
  }

  public saveMemento(memento: Memento): Observable<number>{
    return this.http.post<number>(this.BASE_URL + '/saveMemento', memento);
  }
}
