import { Component, OnInit } from '@angular/core';
import { ESTADOS_BRASILEIROS } from '../../../shared/enderecos/estados-brasileiros';
import { CIDADES_BRASILEIRAS } from '../../../shared/enderecos/cidades-brasileiras';
import { Estado } from '../../../shared/enderecos/estado.model';
import { CidadesEstados } from '../../../shared/enderecos/cidades-estados.model';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { RestauranteService } from '../../../listar-restaurantes/restaurante.service';
import { Restaurante } from '../../../restaurante/restaurante.model';
import { UtilMask } from '../../../shared/utils/utils.mask';
import { UtilInput } from '../../../shared/utils/utils.input';
import { UtilsPatterns } from '../../../shared/utils/utils.patterns';
import { ActivatedRoute } from '@angular/router';

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
  restaurante: Restaurante;
  operacao = 'Cadastro'; // cadastrar ou editar


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
      minlength: this.msgMinLength
    },
    cep: {
      required: this.campoObrigatorio
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

  constructor(private formBuilder: FormBuilder, private restauranteService: RestauranteService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.clear();
    this.cadForm = this.formBuilder.group({
      razaoSocial: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cnpj: this.formBuilder.control('', [Validators.minLength(11), Validators.maxLength(14)]),
      descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(20)]),
      categoria: this.formBuilder.control('', [Validators.required]),
      tempoEstimado: this.formBuilder.control('', [Validators.required]),
      imagePath: this.formBuilder.control('', [Validators.required]),
      estado: this.formBuilder.control('', [Validators.required]),
      cidade: this.formBuilder.control({ value: '' }, [Validators.required]),
      logradouro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cep: this.formBuilder.control('', [Validators.required]),
      site: this.formBuilder.control('', [Validators.pattern(UtilsPatterns.websiteURL)]),
      facebook: this.formBuilder.control('', [Validators.pattern(UtilsPatterns.facebookPage)]),
      instagram: this.formBuilder.control('', [Validators.pattern(UtilsPatterns.instagramPage)]),
      whatsapp: this.formBuilder.control(''),
      telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(14)]),
      email: this.formBuilder.control('', [Validators.required])
    });

    if (this.route.snapshot.params['id']) {
      this.operacao = 'Editar';
      try {
        this.restauranteService.findById(this.route.snapshot.params['id'])
          .subscribe(restaurante => {
            this.restaurante = restaurante;
            Object.keys(this.restaurante).map(elem => {
              if (elem.indexOf('_id') === -1 && elem.indexOf('avaliacao') === -1
                && elem.indexOf('__v') === -1) {
                if (elem === 'cidade') {
                  this.carregarCidadesParaEdicao(this.restaurante.estado);
                  this.carregarCidades();
                }
                this.cadForm.get(elem).setValue(this.restaurante[elem]);
              }
            });
            return this.restaurante;
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  carregarCidades() {
    this.cidadesSelect = this.selecionarCidadesDeEstado(this.cadForm.value.estado);
  }

  /**
   * Utilizada quando o componente está no modo de edição do restaurante
   * @param siglaEstado sigla do estado
   */
  carregarCidadesParaEdicao(siglaEstado: string) {
    this.cidadesSelect = this.selecionarCidadesDeEstado(siglaEstado);
  }

  salvarRestaurante(elem: Restaurante) {
    elem.cnpj = this.retornarSomenteNumeros(elem.cnpj);
    elem.telefone = this.retornarSomenteNumeros(elem.telefone);
    elem.whatsapp = this.retornarSomenteNumeros(elem.whatsapp);
    elem.cep = this.retornarSomenteNumeros(elem.cep);
    this.restaurante = Object.assign(this.restaurante, elem);
    console.log(this.restaurante);
    this.restauranteService.save(this.restaurante).subscribe();
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
