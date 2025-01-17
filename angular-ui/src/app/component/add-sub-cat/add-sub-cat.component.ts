import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
// import { RestPwsdUserPopupComponent } from '../rest-pwsd-user-popup/rest-pwsd-user-popup.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from 
             '@angular/forms';
import { RestPwsdUserPopupComponent } from '../users/userPopups/rest-pwsd-user-popup/rest-pwsd-user-popup.component';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { SharedService } from 'src/app/services/shared-services.service';
import { SharedServiceAddSubService } from 'src/app/services/shared-service-add-sub.service';
import { MaterialClassificationStatusPopupComponent } from '../material-classification-status-popup/material-classification-status-popup.component';
import { MaterialclassificationEditSuccessComponent } from '../add-cat/materialclassification-edit-success/materialclassification-edit-success.component';
@Component({
  selector: 'app-add-sub-cat',
  templateUrl: './add-sub-cat.component.html',
  styleUrls: ['./add-sub-cat.component.css']
})
export class AddSubCatComponent implements OnInit {
  enterfirst:any;
  entersecond:any;
  userId:any;
  error:any='';
  LoginId:any;
  sucatname:any;
  sucatnameCode:any;
  numberValue:any;
  itemId:any;
  activeSubCatId:any;
  SubcatsetName:any;
  adminPassword:boolean =false;
  showPassword: boolean = false;
  errorMsg: any;
  constructor( private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private user:UserService,
    private calssification:ClassificationserviseService,
    private sharedService: SharedServiceAddSubService,


    ) { 

   
    }

    passFormControl = new FormControl('', [
      Validators.required,
  ]);
  confirmFormControl = new FormControl('', [
      Validators.required,
      ]);

       hide =true;

  ngOnInit(): void {
    this.LoginId=localStorage.getItem("logInId");
    this.itemId=localStorage.getItem("Catidset");
    this.numberValue = Number(this.LoginId);
    this.userId = localStorage.getItem("userID");
    this.LoginId=localStorage.getItem("logInId");
    this.SubcatsetName=localStorage.getItem("subcatsetName");
    this.activeSubCatId=localStorage.getItem("activeSubCatId");
if(this.SubcatsetName=='Edit Sub-Category'){
  this.calssification.getsubCatByID(this.activeSubCatId).subscribe((res)=>{
    this.sucatname=res.response.subCategoryName;
    this.sucatnameCode=res.response.subCategoryCode;
  })

}

  }
 

  AddCat(){
    let data={
      subCategoryName:this.sucatname,
      subCategoryCode:this.sucatnameCode,
      categoryid:this.itemId,
      CreatedById:this.numberValue
  };
  this.calssification.addsubCatagory(data).subscribe((res)=>{
    if (res.response.result === 'Success') {
      sessionStorage.setItem("subCategoryName",this.sucatname);
      sessionStorage.setItem("subCategoryCode",this.sucatnameCode);
      sessionStorage.setItem("CategoryName",'');
      sessionStorage.setItem("CategoryCode",'');
      sessionStorage.setItem("typeName",'');
      sessionStorage.setItem("typeCode",'');
    this.sucatname='';
    this.sucatnameCode='';
    this.sharedService.filter('Register click')
    this.dialogRef.close();
    
    this.dialog.open(MaterialClassificationStatusPopupComponent,{panelClass: 'MLCSP'} );
    // {panelClass: 'activeSuccessPop'}
    }
    else{
      this.errorMsg=res.response.result;
    }

    })  
  }

edit(){
  sessionStorage.setItem("subCategoryName",this.sucatname);
      sessionStorage.setItem("subCategoryCode",this.sucatnameCode);
      sessionStorage.setItem("CategoryName",'');
      sessionStorage.setItem("CategoryCode",'');
      sessionStorage.setItem("typeName",'');
      sessionStorage.setItem("typeCode",'');
  let data={
    SubCategoryId:this.activeSubCatId,
    subCategoryName:this.sucatname,
    subCategoryCode:this.sucatnameCode,
    LastModifiedById:this.numberValue
}
this.calssification.updateSubCat(data).subscribe((res)=>{

  this.sucatname='';
  this.sucatnameCode='';
  this.sharedService.filter('Register click')

  this.dialogRef.close();
  this.dialog.open(MaterialclassificationEditSuccessComponent, {panelClass: 'MLCSP'});
  // {panelClass: 'activeSuccessPop'}
})
}

  close(){
    this.dialogRef.close();

  }
  
}
