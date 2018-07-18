import { Injectable } from '@angular/core';
import { MASTER_FOOD_API } from '../app.api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Restaurante } from '../restaurante/restaurante.model';
import { Observable } from 'rxjs';

@Injectable()
export class RestauranteService {

  constructor(private httpClient: HttpClient) {
  }

  restaurantes(filter?: Restaurante): Observable<Restaurante[]> {
    let parametros: HttpParams;
    if (filter) {
      parametros = new HttpParams().set('nome', filter.nome);
    }
    return this.httpClient.get<Restaurante[]>(`${MASTER_FOOD_API}/restaurantess`, { params: parametros });
  }

  save(restaurante: Restaurante) {
    const headers = new HttpHeaders();
    return this.httpClient.post<Restaurante>(`${MASTER_FOOD_API}/restaurantes`, restaurante);
  }

}
