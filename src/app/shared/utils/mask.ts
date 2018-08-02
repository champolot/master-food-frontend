export class Mask {

  constructor(private mask: Array<any>, private guide: boolean, private placeholderChar: string) { }

  toObject() {
    return { mask: this.mask, guide: this.guide, placeholderChar: this.placeholderChar };
  }
}
