import { inject, bindable, computedFrom } from 'aurelia-framework';

export class DataForm {
  @bindable title;
  @bindable readOnly;

  constructor(service) {
    this.service = service;

    this.formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
    };

    this.controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    };
  };
  // formOptions = {
  //   cancelText: "Kembali",
  //   saveText: "Simpan",
  //   // deleteText: "Hapus",
  //   // editText: "Ubah",
  // }
  // @computedFrom("data.Id")
  // get isEdit() {
  //   return (this.data.Id || '').toString() != '';
  // }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    // this.deleteCallback = this.context.deleteCallback;
    // this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

} 
