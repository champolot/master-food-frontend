import { Component, OnInit } from '@angular/core';
import { ESTADOS_BRASILEIROS } from '../../../shared/enderecos/estados-brasileiros';
import { CIDADES_BRASILEIRAS } from '../../../shared/enderecos/cidades-brasileiras';
import { Estado } from '../../../shared/enderecos/estado.model';
import { CidadesEstados } from '../../../shared/enderecos/cidades-estados.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RestauranteService } from '../../../listar-restaurantes/restaurante.service';
import { Restaurante } from '../../../restaurante/restaurante.model';

@Component({
  selector: 'mf-form-restaurante',
  templateUrl: './form-restaurante.component.html',
  styleUrls: ['./form-restaurante.component.css']
})
export class FormRestauranteComponent implements OnInit {

  listaDeEstadosBrasileiros: Array<Estado> = ESTADOS_BRASILEIROS;
  listaCidadesBrasileiras: Array<CidadesEstados> = CIDADES_BRASILEIRAS;
  cidadesSelect: Array<string>;
  check = true;
  estado: any;
  cadForm: FormGroup;
  inputError = 'nenhum erro';
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  timepickerOptions: Pickadate.TimeOptions = {
    default: '00:30', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Limpar', // text for clear-button
    canceltext: 'Cancelar', // Text for cancel-button
    autoclose: true, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: () => alert('AfterShow has been invoked.'), // function for after opening timepicker
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

  ngOnInit() {
    this.cadForm = this.formBuilder.group({
      razaoSocial: this.formBuilder.control('', [Validators.required]),
      nome: this.formBuilder.control('', [Validators.required]),
      cnpj: this.formBuilder.control(''),
      descricao: this.formBuilder.control('', [Validators.required]),
      categoria: this.formBuilder.control('', [Validators.required]),
      tempoEstimado: this.formBuilder.control('', [Validators.required]),
      imagePath: this.formBuilder.control('', [Validators.required]),
      estado: this.formBuilder.control('', [Validators.required]),
      cidade: this.formBuilder.control({ value: undefined }, [Validators.required]),
      logradouro: this.formBuilder.control('', [Validators.required]),
      site: this.formBuilder.control(''),
      facebook: this.formBuilder.control(''),
      instagram: this.formBuilder.control(''),
      whatsapp: this.formBuilder.control(''),
      telefone: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)])
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



}
