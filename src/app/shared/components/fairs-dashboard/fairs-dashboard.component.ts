import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../models/Ifairs';
import { FairsService } from '../../services/fairs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fairs-dashboard',
  templateUrl: './fairs-dashboard.component.html',
  styleUrls: ['./fairs-dashboard.component.scss']
})
export class FairsDashboardComponent implements OnInit {
fairsArr:Ifairs[]=[]
  constructor(private fairservice:FairsService, private routes:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
this.getFairs()
  }
getFairs(){
  this.fairservice.fetchfairs().subscribe({
    next: res=>{
      this.fairsArr =res;
      if(this.fairsArr.length > 0 && !this.routes.firstChild){
        this.router.navigate(
          [this.fairsArr[0].fairId],
          {
           relativeTo: this.routes 
          }

        );
      }
    },
    error: err =>{
      console.log(err);
    }
  })

}
}