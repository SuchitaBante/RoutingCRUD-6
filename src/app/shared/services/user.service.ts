import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iuser } from '../models/Iuser';
import { Ires } from '../models/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  userArr=[
    {
  userId: "U208",
  userName: "Anjali Deshmukh",
  userRole: "Frontend Angular Developer",
  profileDescription: "Experienced Angular developer with expertise in TypeScript, RxJS, Angular Material, and responsive web applications.",
  profileImage: "/assets/images/women floral kurti.jpeg",
  skills: ["Angular", "TypeScript", "RxJS", "Bootstrap"],
  experienceYears: "3 to 5 Years",
  isActive: true,
  isAddSame: false,
  address: {
    current: {
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      zipcode: "411001"
    },
    permanent: {
      city: "Nagpur",
      state: "Maharashtra",
      country: "India",
      zipcode: "440001"
    }
  }
},
{
  userId: "U209",
  userName: "Rohit Patil",
  userRole: "Backend Java Developer",
  profileDescription: "Passionate backend developer with hands-on experience in Spring Boot, Hibernate, REST APIs, and MySQL database management.",
  profileImage: "/assets/images/pexels-nandhukumar-12926480.jpg",
  skills: ["Java", "Spring Boot", "Hibernate", "MySQL"],
  experienceYears: "2 to 4 Years",
  isActive: true,
  isAddSame: true,
  address: {
    current: {
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      zipcode: "560001"
    },
    permanent: {
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      zipcode: "560001"
    }
  }
},
{
  userId: "U210",
  userName: "Sneha Kulkarni",
  userRole: "UI/UX Designer",
  profileDescription: "Creative UI/UX designer skilled in Figma, Adobe XD, HTML, CSS, and creating user-friendly web interfaces.",
  profileImage: "/assets/images/pexels-pavel-danilyuk-7658430.jpg",
  skills: ["Figma", "HTML", "CSS", "JavaScript"],
  experienceYears: "1 to 3 Years",
  isActive: false,
  isAddSame: false,
  address: {
    current: {
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipcode: "110001"
    },
    permanent: {
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      zipcode: "302001"
    }
  }

  }]

  fetchUsers():Observable<Iuser[]>{
    return of (this.userArr)

  }
  fetchUsersById(id: string):Observable<Iuser>{
    let userObj = this.userArr.find(u=>u.userId===id)!
    return of(userObj)

  }
  createuser(newObj:Iuser):Observable<Ires<Iuser>>{
    this.userArr.push(newObj)
    return of({
      msg: `The User with Id ${newObj.userId}is created successfully...!!`,
      data: newObj
    })
}
  onUpdateUser(updatedObj:Iuser):Observable<Ires<Iuser>>{
    let GETINDEX= this.userArr.findIndex(u => u.userId===updatedObj.userId)
    this.userArr[GETINDEX]=updatedObj
    return of({
      msg: `The User with Id ${updatedObj.userId}is updated successfully..!!`,
      data: updatedObj
    })

  }
  removeUser(removeId: string){
let GETINDEX= this.userArr.findIndex(u=>u.userId===removeId)
let User = this.userArr.splice(GETINDEX, 1)
return of({
  msg: `The User with Id ${removeId}is removed successfully...!!`,
  data: User[0]
})
  }
}
