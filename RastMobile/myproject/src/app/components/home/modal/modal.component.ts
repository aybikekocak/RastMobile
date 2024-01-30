import {Component} from '@angular/core';
import {SocialMedia} from "../../../model/socialMedia";
import {DataService} from "../../../service/data.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  providers:[BsModalService],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent{
  input1: string;
  input2: string;
  input3: string;
  employees: SocialMedia;
  constructor(private service: DataService ,public bsModalRef: BsModalRef) {
}


  closeModal() {
  this.service.getLocalData()
    window.location.reload()
    this.bsModalRef.hide();
  }


  saveData() {
    this.employees = {
      sosyalMedyaLinki: this.input1,
      sosyalMedyaAdı: this.input2,
      açıklama: this.input3
    };

    this.service.addData(this.employees)
    this.closeModal()

  }


}
