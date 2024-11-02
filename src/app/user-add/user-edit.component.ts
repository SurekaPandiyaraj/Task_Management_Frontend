import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  isEditMode = false;
  Id: number
  addressId: number = 0;
  currentUser!: User;
  isAddAddress!: boolean;
  user! : User;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router

  ) {

    const uid = this.route.snapshot.paramMap.get("id");
    this.Id = Number(uid);

    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      password: [''],
      phoneNumber: ['', [Validators.required]],
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: [''],
        city: ['']
      })

    })

    if (uid) {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }

  }
  ngOnInit(): void {
    if (this.isEditMode == true) {
      this.userService.getUserById(this.Id).subscribe(data => {
        this.currentUser = data;
        if (this.currentUser.address == null) {
          this.isAddAddress = true;
          console.log(this.isAddAddress);
        }
        this.addressId = Number(data.address?.id);
        this.userForm.patchValue({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          address: {
            addressLine1: data.address?.addressLine1,
            addressLine2: data.address?.addressLine2,
            city: data.address?.city
          }
        });

      }, error => {
        alert('User is not found')
      })
    }

  }

  cancel() {
    this.userForm.reset();
  }



  onSubmit() {

    this.user = this.userForm.value;
    if (this.isEditMode == true) {
      console.log(this.user);
      this.user.id = this.currentUser.id;
      this.user.address.userId = this.currentUser.id;
      this.user.address.id = this.currentUser.address.id;
      this.userService.updateUser(this.user).subscribe(data => {

        alert("Update Successfuly!")
        this.router.navigate(["/users"])
      })
    } else {
      this.userService.createUser(this.user).subscribe(data => {
        alert("Create Successfully!")
        this.router.navigate(["/users"])
      })
    }

  }

}



