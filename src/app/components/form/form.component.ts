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
  public success: boolean;
  public error: boolean;
  public colonies: any;

  public zip: number = 0;
  public region: any = "";
  public city: any = "";
  public delegation: any = "";

  constructor(public zipcodesService: ZipcodesService, public contactService: ContactService) { }

  ngOnInit(): void {
    this.regularForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, ReValidator(/^[a-zA-Z- ]*$/)]),
      'lastName': new FormControl(null, [Validators.required, ReValidator(/^[a-zA-Z- ]*$/)]),
      'email': new FormControl(null, [Validators.required, ReValidator(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'phone': new FormControl(null, [Validators.required, CustomValidators.number]),
      'zipCode': new FormControl(null, [Validators.required, CustomValidators.number]),
      'colonies': new FormControl(null, [Validators.required]),
      'region': new FormControl(null),
      'city': new FormControl(null),
      'delegation': new FormControl(null),
      'street': new FormControl(null, [Validators.required]),
      'active': new FormControl(null)
    }, { updateOn: 'change' });
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
  addContact(form?: NgForm) {
    if (!this.regularForm.valid) {
      return;
    }
    form.value.region=this.region.state
    form.value.delegation=this.delegation.town
    form.value.city=this.city.city

    this.contactService.postContact(form.value)
      .subscribe(
        res => {
          this.success = true
          this.error = false
          setTimeout(() => {
            this.resetForm()
            form.reset()
          }, 500);

        }, err => {
          this.success = false
          this.error = true
        })
  }
  fillInFields(z: any) {
    if (z.length < 5 || z === "") {
      this.region = "";
      this.delegation = "";
      this.city = "";
    }
    if (z.length > 3) {
      this.getZipcode(z)
    }
  }
  getZipcode(z) {
    this.zipcodesService.getZipcode(z)
      .subscribe(res => {
        this.zipcodesService.zipcode = res as Zipcode[];
        this.colonies = res;
        this.region = res;
        this.delegation = res;
        this.city = res;
      },
        err => {
          this.region = "";
          this.delegation = "";
          this.city = "";
        }
      )
  }
}
