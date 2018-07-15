import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../listar-restaurantes/restaurante.service';
import { Restaurante } from '../../restaurante/restaurante.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mf-cadastro-restaurantes',
  templateUrl: './cadastro-restaurantes.component.html',
  styleUrls: ['./cadastro-restaurantes.component.css']
})
export class CadastroRestaurantesComponent implements OnInit {

  restaurantes: Restaurante[];


  searchForm: FormGroup;
  // searchControl: FormControl;

  columns = [
    { prop: 'cnpj', name: 'CNPJ' },
    { prop: 'nome', name: 'Nome' },
    { prop: 'razaoSocial', name: 'Razão Social' },
    { prop: 'categoria', name: 'Categoria' }
  ];

  constructor(private restaurantService: RestauranteService, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      teste: '',
      restaurante: this.fb.group({
        nome: ['']
      })
    });
  }


  /**
   * @param value Devolve um array vc pode  usar multi select ou single select
   */
  selectedLine(value: any) {
    const pessoa: any = value.selected[0];
    console.log(pessoa);
    //   alert('nome ' + pessoa.nome + 'Genero ' + pessoa.gender);
  }

  /**
   * @param event Nao é necessario implementar mas ele CAPTURA TODOS OS EVENTOS DESDE MOUSE OVER A CLICKS E ETC
   */
  onActivate(event) {
    // console.log('Activate Event', event);
  }

  pesquisarRestaurantes() {
    try {

      // console.log();
      const restauranteFilter = this.searchForm.get(['restaurante']).value;
      this.restaurantService.restaurantes(restauranteFilter).subscribe(restaurantes => this.restaurantes = restaurantes);
    } catch (err) {
      console.log(err);
    }
  }



}
