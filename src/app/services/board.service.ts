import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getPath } from '../constants/constants';
@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  public getShortestPath(start: string, end: string) {
    const url = getPath + start + '&end=' + end;
    return this.http.get(url).pipe(map((response: Response) => {
      return response;
    }));
  }
}
