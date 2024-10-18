import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()

export class UtilityService{
  private _router:Router;


  constructor(router:Router) {
    this._router = router;
  }

  isEmpty(input) {
    if(input == undefined || input == null || input == ''){
      return true;
    }
    return false;
  }

  convertDateTime(date:Date){
    const formattedDAte = new Date(date.toString());
    return formattedDAte.toDateString();
  }


  navigate(path: string) {
    this._router.navigate([path]);
  }



  getAllProperties = (obj: object) => {
    const data = {};

    for (const [key, val] of Object.entries(obj)) {
      if (obj.hasOwnProperty(key)) {
        if (typeof val !== 'object') {
          data[key] = val;
        }
      }
    }
    return data;
  }

}

