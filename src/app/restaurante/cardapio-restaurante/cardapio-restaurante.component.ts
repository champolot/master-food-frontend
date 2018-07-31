import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../restaurante.model';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from '../../listar-restaurantes/restaurante.service';

@Component({
  selector: 'mf-cardapio-restaurante',
  templateUrl: './cardapio-restaurante.component.html',
  styleUrls: ['./cardapio-restaurante.component.css']
})
export class CardapioRestauranteComponent implements OnInit {


  restaurante: Restaurante;

  constructor(private restauranteService: RestauranteService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.restauranteService.findById(this.route.snapshot.params['id'])
      .subscribe(restaurante => restaurante = restaurante);
  }
}
