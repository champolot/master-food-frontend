import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../restaurante.model';
import { RestauranteService } from '../../listar-restaurantes/restaurante.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'mf-restaurante-detalhes',
  templateUrl: './restaurante-detalhes.component.html',
  styleUrls: ['./restaurante-detalhes.component.css']
})
export class RestauranteDetalhesComponent implements OnInit {


  restaurante: Restaurante;

  constructor(private restauranteService: RestauranteService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.restauranteService.findById(this.route.snapshot.params['id'])
      .subscribe(restaurante => this.restaurante = restaurante);
  }
}
