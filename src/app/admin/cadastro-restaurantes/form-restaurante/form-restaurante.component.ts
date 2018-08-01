import { Component, OnInit } from '@angular/core';
import { ESTADOS_BRASILEIROS } from '../../../shared/enderecos/estados-brasileiros';
import { CIDADES_BRASILEIRAS } from '../../../shared/enderecos/cidades-brasileiras';
import { Estado } from '../../../shared/enderecos/estado.model';
import { CidadesEstados } from '../../../shared/enderecos/cidades-estados.model';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { RestauranteService } from '../../../listar-restaurantes/restaurante.service';
import { Restaurante } from '../../../restaurante/restaurante.model';
import { UtilMask } from '../../../shared/utils/util.mask';
import { UtilInput } from '../../../shared/utils/util.input';
import { UtilPatterns } from '../../../shared/utils/util.patterns';

@Component({
  selector: 'mf-form-restaurante',
  templateUrl: './form-restaurante.component.html',
  styleUrls: ['./form-restaurante.component.css']
})
export class FormRestauranteComponent implements OnInit {
  utilMask = UtilMask;
  utilInput = UtilInput;
  listaDeEstadosBrasileiros: Array<Estado> = ESTADOS_BRASILEIROS;
  listaCidadesBrasileiras: Array<CidadesEstados> = CIDADES_BRASILEIRAS;
  cidadesSelect: Array<string>;
  check = true;
  estado: any;
  cadForm: FormGroup;
  campoObrigatorio = 'Campo obrigatório';
  messageSuccess = 'OK';
  msgMinLength = 'campo deve ter no mínimo 3 caracteres';


  // error messages
  errorMessageResources = {
    nome: {
      required: this.campoObrigatorio,
      minlength: this.msgMinLength
    },
    razaoSocial: {
      required: this.campoObrigatorio,
      minlength: this.msgMinLength
    },
    cnpj: {
      minlength: 'O campo deve ter 11 ou 14 caracteres '
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
      pattern: 'Formato de URL inválido. Padrão de URL: https://facebook.com/SUAPAGINA'
    },
    instagram: {
      pattern: 'Formato de URL inválido. Padrão de URL: https://instagram.com/SUAPAGINA'
    },
    site: {
      pattern: 'Formato de URL inválido'
    },
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
      minlength: 'O campo deve ter no mínimo 20 caracteres'
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

  ngOnInit() {
    this.cadForm = this.formBuilder.group({
      razaoSocial: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cnpj: this.formBuilder.control('', [Validators.minLength(11), Validators.maxLength(14)]),
      descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(20)]),
      categoria: this.formBuilder.control('', [Validators.required]),
      tempoEstimado: this.formBuilder.control('', [Validators.required]),
      imagePath: this.formBuilder.control('', [Validators.required]),
      estado: this.formBuilder.control('', [Validators.required]),
      cidade: this.formBuilder.control({ value: undefined }, [Validators.required]),
      logradouro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      site: this.formBuilder.control('', [Validators.pattern(UtilPatterns.websiteURL)]),
      facebook: this.formBuilder.control('', [Validators.pattern(UtilPatterns.facebookPage)]),
      instagram: this.formBuilder.control('', [Validators.pattern(UtilPatterns.instagramPage)]),
      whatsapp: this.formBuilder.control(''),
      telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(14)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(UtilPatterns.email)])
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
