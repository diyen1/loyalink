import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CrudField} from '../crud-field';
import {CrudLayout} from '../crud-layout';

@Component({
  selector: 'app-crud-create',
  templateUrl: './crud-create.component.html',
  styleUrls: ['./crud-create.component.scss']
})
export class CrudCreateComponent implements OnInit, OnChanges {

  form: any;

  @Input('fields') fields: CrudField[] = [];
  @Input('layout') layout: CrudLayout = new CrudLayout();

  @Input() submitButtonText = 'Submit';

  @Input() loading = false;

  @Output() outputData: any = new EventEmitter<any>();

  controlsConfig = {};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeForm();
  }

  initializeForm(): void {

    // TODO make faster if possible
    if (this.fields.length > 0) {
      if (
        !this.layout.templateStructure ||
        this.layout.templateStructure == null ||
        this.layout.templateStructure.length < 1) {
        this.layout.templateStructure = [
          {
            class: 'col-12',
            data: this.fields,
          }
        ];
      } else {
        for (let i = 0; i < this.layout.templateStructure.length; i++) {
          for (let j = 0; j < this.layout.templateStructure[i].data.length; j++) {
            this.layout.templateStructure[i].data[j] = this.getField(this.layout.templateStructure[i].data[j].key);
          }
        }
      }
    }

    console.log('changes fields', this.layout.templateStructure);

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];

      if (field.type === 'image_array') {

        const imageCount = field.image_count;

        for (i = 0; i < imageCount; i++) {
          let value = '';
          if (field.value && field.value[i]) {
            value = field.value[i];
          }
          this.controlsConfig[field.key + '_' + i] = [value];
        }
      } else if (field.type === 'checkbox') {
        const value = field.value || false;
        this.controlsConfig[field.key] = [value, Validators.required];
      } else {
        const value = field.value || '';
        this.controlsConfig[field.key] = [value, Validators.required];
      }
    }

    /*this.form = this.fb.group({
      fullNames: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      homePhone: ['', Validators.required],
      town: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });*/

    this.form = this.fb.group(this.controlsConfig);
  }

  onSubmit(formData) {

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];

      if (field.type === 'image_array') {
        const imageCount = field.image_count;
        formData[field.key] = [];
        for (i = 0; i < imageCount; i++) {
          if (formData[field.key + '_' + i] !== '') {
            formData[field.key].push(formData[field.key + '_' + i]);
          }
          delete formData[field.key + '_' + i];
        }
      }
    }
    this.outputData.emit(formData);
  }

  fileAddedCallback() {
    // console.log('file added callback');
  }

  getField(fieldKey) {
    console.log('fieldKey', fieldKey);
    for (let i = 0; i < this.fields.length; i++) {
      if (fieldKey === this.fields[i].key) {
        return this.fields[i];
      }
    }

    return null;
  }

}
