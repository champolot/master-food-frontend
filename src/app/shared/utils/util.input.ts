import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

export class UtilInput {

  constructor() { }

  /**
   *
   * @param formGroup
   * @param propFormName
   */
  static trim(formGroup: FormGroup, propFormName: string) {
    formGroup.get(propFormName).setValue(formGroup.get(propFormName).value.trim());
    console.log(formGroup.controls);
  }


  static verificarCampos(formGroup: FormGroup) {
    Object.keys(formGroup.controls).map(field => {
    //  formGroup.get(field).invalid

    });
  }


  /**
   *
   * @param formGroup
   * @param propFormName
   */
  static verificarPreenchimentoDeTelefone(formGroup: FormGroup, propFormName: string) {
    const value = formGroup.get(propFormName).value;
    if (value.substring(5, value.length).indexOf('\u2000') !== -1) {
      formGroup.get(propFormName).setValue('');
    }
  }

}
