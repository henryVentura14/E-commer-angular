import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ReValidator } from '../../helpers/validator';
import { ZipcodesService } from '../../service/zipcodes.service';
import { ContactService } from '../../service/contact.service';
import { Contact } from '../../interfaces/contact.interface';
import { Zipcode } from '../../interfaces/zipcode.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ZipcodesService, ContactService]
})
export class FormComponent implements OnInit {
  @ViewChild('f') floatingLabelForm: NgForm;
  @ViewChild('vform') validationForm: FormGroup;
  @ViewChild('f') registerForm: NgForm;
  regularForm: FormGroup;

  constructor(public zipcodesService: ZipcodesService, public contactService: ContactService) { }

  ngOnInit(): void {
    this.getZipcode()
    this.regularForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, ReValidator(/^[a-zA-Z- ]*$/)]),
      'lastName': new FormControl(null, [Validators.required, ReValidator(/^[a-zA-Z- ]*$/)]),
      'email': new FormControl(null, [Validators.required, ReValidator(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'phone': new FormControl(null, [Validators.required, CustomValidators.number]),
      'zipCode': new FormControl(null, [Validators.required, CustomValidators.number]),
      'colonies': new FormControl(null, [Validators.required]),
      'region': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'delegation': new FormControl(null, [Validators.required]),
      'street': new FormControl(null, [Validators.required]),
      'active': new FormControl(null)
    }, { updateOn: 'blur' });
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      // this.contactService.selectedContact = new Contact();
    }
  }
  addContact(form: NgForm) {
    if (!this.regularForm.valid) {
      return;
    }
    this.contactService.postContact(form.value)
      .subscribe(
        res => {
          console.log('success')
        }, err => {
          console.log('error')
        })
  }
  getZipcode() {
    this.zipcodesService.getZipcode(11000)
      .subscribe(res => {
        this.zipcodesService.zipcode = res as Zipcode[];
      })
  }
}
