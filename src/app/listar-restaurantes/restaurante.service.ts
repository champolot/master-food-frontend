import { Injectable } from '@angular/core';
import { MASTER_FOOD_API } from '../app.api';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Restaurante } from '../restaurante/restaurante.model';
import { ErrorHandler } from '../app.error-handler';
import { Observable } from 'rxjs';

@Injectable()
export class RestauranteService {

  constructor(private http: Http, private httpClient: HttpClient) {
  }

  findByEndereco(): Observable<Restaurante[]> {
    return this.http.get(`${MASTER_FOOD_API}/restaurantes`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  save(restaurante: Restaurante) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(`${MASTER_FOOD_API}/restaurantes`, JSON.stringify(restaurante), { headers: headers });
  }

}
