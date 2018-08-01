import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

export class UtilInput {

  constructor() { }

  /**
   * Verifica e retira espaços em branco do campo
   * @param formGroup formGroup cujo campo será verificado
   */
  static trim(formGroup: FormGroup, propFormName: string) {
    formGroup.get(propFormName).setValue(formGroup.get(propFormName).value.trim());
  }

  /**
   * Retorna um array de strings representando as propriedades do formGroup
   * @param formGroup formGroup do qual as propiredades serão listadas no array
   */
  static verificarCampos(formGroup: FormGroup) {
    return Object.keys(formGroup.controls);
  }


  /**
   * Verifica se o campo de telefone/celular não contém espaços
   * caso haja espaços, o conteúdo do campo será apagado
   * @param formGroup formGroup em que será aplicada a ação
   * @param propFormName nome do elemento do formGroup em que será aplicada a ação
   */
  static verificarPreenchimentoDeTelefone(formGroup: FormGroup, propFormName: string) {
    const value = formGroup.get(propFormName).value;
    if (value.substring(5, value.length).indexOf('\u2000') !== -1) {
      formGroup.get(propFormName).setValue('');
    }
  }
  /**
   * Apaga o conteúdo de um campo se encontrar espaços
   * @param formGroup formGroup em que será aplicada a ação
   * @param propFormName nome do elemento do formGroup em que será aplicada a ação
   */
  static removerConteudoComEspacos(formGroup: FormGroup, propFormName: string) {
    if (formGroup.get(propFormName).value.indexOf('\u2000') !== -1) {
      formGroup.get(propFormName).setValue('');
    }
  }
}
