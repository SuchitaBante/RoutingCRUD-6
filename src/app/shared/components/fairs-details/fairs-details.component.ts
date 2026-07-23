import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../models/Ifairs';
import { FairsService } from '../../services/fairs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fairs-details',
  templateUrl: './fairs-details.component.html',
  styleUrls: ['./fairs-details.component.scss']
})
export class FairsDetailsComponent implements OnInit {
fairsObj!: Ifairs
fairId!:string

  constructor(private fairservice:FairsService, private routes:ActivatedRoute) { }

  ngOnInit(): void {
console.log('snapshot params:', this.routes.snapshot.params);
this.routes.paramMap.subscribe(res=>{
  this.fairId = res.get('fairsId')!
  console.log(this.fairsObj);
if(this.fairId){
  this.fairservice.fetchfairsById(this.fairId).subscribe({
    next: response =>{
this.fairsObj =response
    },
    error: err =>{
      console.log(err)
    }
  })
  
}
})
  }
  
}