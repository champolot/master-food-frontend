import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ESTADOS_BRASILEIROS } from '../../../shared/enderecos/estados-brasileiros';
import { CIDADES_BRASILEIRAS } from '../../../shared/enderecos/cidades-brasileiras';
import { Estado } from '../../../shared/enderecos/estado.model';
import { CidadesEstados } from '../../../shared/enderecos/cidades-estados.model';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { RestauranteService } from '../../../listar-restaurantes/restaurante.service';
import { Restaurante } from '../../../restaurante/restaurante.model';
import * as $ from 'jquery';

@Component({
  selector: 'mf-form-restaurante',
  templateUrl: './form-restaurante.component.html',
  styleUrls: ['./form-restaurante.component.css']
})
export class FormRestauranteComponent implements OnInit, AfterViewInit {

  listaDeEstadosBrasileiros: Array<Estado> = ESTADOS_BRASILEIROS;
  listaCidadesBrasileiras: Array<CidadesEstados> = CIDADES_BRASILEIRAS;
  cidadesSelect: Array<string>;
  check = true;
  estado: any;
  cadForm: FormGroup;
  inputError = 'nenhum erro';
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  campoObrigatorio = 'Campo obrigatório';
  messageSuccess = 'OK';
  // error messages
  errorMessageResources = {
    nome: {
      required: this.campoObrigatorio,
      minlength: 'First name must be at least 4 characters long.',
    },
    razaoSocial: {
      required: this.campoObrigatorio,
      minlength: 'First name must be at least 4 characters long.',
    },
    cnpj: {
      minlength: 'First name must be at least 4 characters long.',
    },
    estado: {
      required: this.campoObrigatorio,
    },
    cidade: {
      required: this.campoObrigatorio,
    },
    logradouro: {
      required: this.campoObrigatorio,
    },
    facebook: {

    },
    instagram: {},
    site: {},
    telefone: {
      required: this.campoObrigatorio,
    },
    email: {
      required: this.campoObrigatorio,
      pattern: 'Formato de e-mail inválido'
    },
    whatsapp: {},
    descricao: {
      required: this.campoObrigatorio,
    },
    categoria: {
      required: this.campoObrigatorio,
    },
    tempoEstimado: {
      required: this.campoObrigatorio,
    },
    imagePath: {
      required: this.campoObrigatorio,
    }
  };

  constructor(private formBuilder: FormBuilder, private restaurantService: RestauranteService) {
  }


  valida(field: string) {
    console.log(this.cadForm.controls[field].parent.controls['value']);
    return this.cadForm.get(field).errors;
  }

  eventHandler(event) {
    console.log(event, event.keyCode, event.keyIdentifier);
  }
  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.cadForm = this.formBuilder.group({
      razaoSocial: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cnpj: this.formBuilder.control('', [Validators.minLength(11), Validators.maxLength(14)]),
      descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(50)]),
      categoria: this.formBuilder.control('', [Validators.required]),
      tempoEstimado: this.formBuilder.control('', [Validators.required]),
      imagePath: this.formBuilder.control('', [Validators.required]),
      estado: this.formBuilder.control('', [Validators.required]),
      cidade: this.formBuilder.control({ value: undefined }, [Validators.required]),
      logradouro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      site: this.formBuilder.control(''),
      facebook: this.formBuilder.control(''),
      instagram: this.formBuilder.control(''),
      whatsapp: this.formBuilder.control(''),
      telefone: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)])
    });

    $(document).ready(function () {
      $('#telefone').val('(__) ____-____');
      $('#telefone').keydown(function (event) {
        console.log(event.originalEvent);
      });
    });
  }

  carregarCidades() {
    console.log(this.cadForm.value.estado);
    console.log(this.selecionarCidadesDeEstado(this.cadForm.value.estado));
    this.cidadesSelect = this.selecionarCidadesDeEstado(this.cadForm.value.estado);
  }


  /**
   *
   * @param facebookURL string contendo url da página no facebook
   * @return se url inválida, retorna false, se não, retorna o id da página, somente os ids serão salvos
   * para economizar espaço nos documentos do banco de dados
   *
   */
  validarURLFacebook(facebookURL: string) {
    if (facebookURL.indexOf('@') === 0) {
      return facebookURL.replace('@', '');
    }

    if (facebookURL.length < 26) { return false; }
    if (facebookURL.substring(0, 24) !== 'https://www.facebook.com') { return false; }
    return facebookURL.substring(25);
  }

  /**
   *
   * @param facebookURL string contendo url da página no instagram
   * @return se url inválida, retorna false, se não, retorna o id da página, somente os ids serão salvos
   * para economizar espaço nos documentos do banco de dados
   *
   */
  validarURLInstagram(instagramURL: string) {
    if (instagramURL.indexOf('@') === 0) {
      return instagramURL.replace('@', '');
    }
    if (instagramURL.length < 27) { return false; }
    if (instagramURL.substring(0, 25) !== 'https://www.instagram.com') { return false; }
    return instagramURL.substring(26);
  }

  salvarRestaurante(elem: Restaurante) {
    elem.cnpj = this.retornarSomenteNumeros(elem.cnpj);
    elem.telefone = this.retornarSomenteNumeros(elem.telefone);
    elem.whatsapp = this.retornarSomenteNumeros(elem.whatsapp);
    this.restaurantService.save(elem).subscribe();
  }

  private selecionarCidadesDeEstado(siglaEstado: string): string[] {
    return this.listaCidadesBrasileiras.filter(estado => estado.sigla === siglaEstado)[0].cidades;
  }

  retornarSomenteNumeros(str: string) {
    return str.replace(/[^\d]+/g, '');
  }

  teste(control: FormControl) {
    return null;
  }

  converter(tempo: string) {
    const arr: Array<string> = tempo.split(':');
    return (arr[0] !== '0:0' && arr[1] !== '0:0') ? (parseInt(arr[0], 10) * 60) + parseInt(arr[1], 10) : false;

  }



}
