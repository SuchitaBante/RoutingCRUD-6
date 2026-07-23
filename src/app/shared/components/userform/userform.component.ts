import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackBarService } from '../../services/snack-bar.service';
import { UserService } from '../../services/user.service';
import { Iuser } from '../../models/Iuser';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {

  isInEditMode: boolean = false;
  userForm!: FormGroup;
  UserId!: string;

  DisableUpdatebtn = false;
  DisableAddBtn = false;

  constructor(
    private snackBar: SnackBarService,
    private router: Router,
    private routes: ActivatedRoute,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.createUserform();
    this.handleSameAddress();
    this.patchUserdata();
  }

  

  get formControls() {
    return this.userForm.controls;
  }

  get skillsArr(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  get currentAddress(): FormGroup {
    return this.userForm.get('address.current') as FormGroup;
  }

  get permanentAddress(): FormGroup {
    return this.userForm.get('address.permanent') as FormGroup;
  }

  

  createUserform(): void {

    this.userForm = new FormGroup({

      userName: new FormControl('', Validators.required),

      userId: new FormControl(''),

      userRole: new FormControl('Candidate', Validators.required),

      profileDescription: new FormControl('', Validators.required),

      profileImage: new FormControl('', Validators.required),

      experienceYears: new FormControl('', Validators.required),

      isActive: new FormControl(true),

      isAddSame: new FormControl(false),

      skills: new FormArray([]),

      address: new FormGroup({

        current: new FormGroup({

          city: new FormControl('', Validators.required),
          state: new FormControl('', Validators.required),
          country: new FormControl('', Validators.required),
          zipcode: new FormControl('', Validators.required)

        }),

        permanent: new FormGroup({

          city: new FormControl('', Validators.required),
          state: new FormControl('', Validators.required),
          country: new FormControl('', Validators.required),
          zipcode: new FormControl('', Validators.required)

        })

      })

    });

    this.onAddSkill();

  }

  

  handleSameAddress(): void {

    this.userForm.get('isAddSame')?.valueChanges.subscribe((checked: boolean) => {

      if (checked) {
        this.permanentAddress.patchValue(this.currentAddress.value);
      } else {
        this.permanentAddress.reset();
      }

    });

    this.currentAddress.valueChanges.subscribe(address => {

      if (this.userForm.get('isAddSame')?.value) {
        this.permanentAddress.patchValue(address);
      }

    });

  }

  

  patchUserdata(): void {

    this.routes.paramMap.subscribe(params => {

      this.UserId = params.get('userId')!;

      if (!this.UserId) {
        return;
      }

      this.isInEditMode = true;

      this.userservice.fetchUsersById(this.UserId).subscribe({

        next: (user) => {

          this.skillsArr.clear();

          user.skills.forEach(skill => {

            this.skillsArr.push(
              new FormControl(skill, Validators.required)
            );

          });

          this.userForm.patchValue(user);

        },

        error: err => console.log(err)

      });

    });

  }


  onAddSkill(): void {

    if (this.skillsArr.length >= 5) {

      this.snackBar.openSnackBar('Maximum 5 skills are allowed.');

      return;

    }

    const lastSkill = this.skillsArr.at(this.skillsArr.length - 1);

    if (lastSkill && lastSkill.invalid) {

      lastSkill.markAsTouched();

      this.snackBar.openSnackBar(
        'Please enter the current skill first.'
      );

      return;

    }

    this.skillsArr.push(
      new FormControl('', Validators.required)
    );

  }

  onRemoveSkill(index: number): void {

    if (this.skillsArr.length === 1) {

      this.snackBar.openSnackBar(
        'At least one skill is required.'
      );

      return;

    }

    this.skillsArr.removeAt(index);

  }

  

  private resetUserForm(): void {

    this.userForm.reset({

      userRole: 'Candidate',
      isActive: true,
      isAddSame: false

    });

    this.skillsArr.clear();

    this.onAddSkill();

  }

  

  onAddUser(): void {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;

    }

    const user: Iuser = {

      ...this.userForm.value,

      userId: Date.now().toString()

    };

    this.userservice.createuser(user).subscribe({

      next: res => {

        this.snackBar.openSnackBar(res.msg);

        this.resetUserForm();

        this.router.navigate(['/userdashboard']);

      },

      error: err => console.log(err)

    });

  }

  

  onUpdateUser(): void {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;

    }

    const updatedUser: Iuser = {

      ...this.userForm.value,

      userId: this.UserId

    };

    this.userservice.onUpdateUser(updatedUser).subscribe({

      next: res => {

        this.snackBar.openSnackBar(res.msg);

        this.resetUserForm();

        this.isInEditMode = false;

        this.router.navigate(['/userdashboard']);

      },

      error: err => console.log(err)

    });

  }

}