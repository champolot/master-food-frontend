import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../restaurante/restaurante.model';
import { RestauranteService } from './restaurante.service';

@Component({
  selector: 'mf-listar-restaurantes',
  templateUrl: './listar-restaurantes.component.html',
  styleUrls: ['./listar-restaurantes.component.css']
})
export class ListarRestaurantesComponent implements OnInit {

  constructor(private restaurantService: RestauranteService) { }

  restaurantes: Restaurante[];

  ngOnInit() {
    try {
      this.restaurantService.restaurantes().subscribe(restaurantes => this.restaurantes = restaurantes);
    } catch (err) {
      console.log(err);
    }
  }

}
