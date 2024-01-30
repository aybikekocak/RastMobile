import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  enableProdMode,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  DxBulletModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxTemplateModule,
  DxTextBoxModule
} from "devextreme-angular";
import {SocialMedia} from "../../../model/socialMedia";
import {DataService} from "../../../service/data.service";
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ModalComponent} from "../modal/modal.component";
import {FormsModule} from "@angular/forms";

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [
    DxDataGridModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule,
    DxTextBoxModule,
    FormsModule,
  ],
  providers:[BsModalService],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  bsModalRef: BsModalRef;
  employees: SocialMedia[];
  newEmployees: SocialMedia[];
  dataLength: number;
  searchText: any
  private isDataLoading: Boolean;

  constructor(private service: DataService, private modalService: BsModalService) {}

  search(){
    this.newEmployees = this.newEmployees.filter(employee =>
      this.containsSearchText(employee)
    );
  }

  containsSearchText(employee: SocialMedia): boolean {
    //Burada SocialMedia modelinin tüm özelliklerini döngü ile kontrol etmek amaçlanmıştır.
    //Input ile almış olduğumuz değer küçük harflere çevrilir ve datagrid içerisindeki veri içerisinde arama yapar.
    const searchTextLower = this.searchText.toLowerCase();
    return Object.values(employee).some(value =>
      value.toLowerCase().includes(searchTextLower)
    );
  }
  openDialog() {
    const initialState = {};
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
  }
  onRowPrepared(e: any) {
    if (e.rowType === 'data' && e.dataIndex % 2 !== 0) {
      e.rowElement.style.background = 'linear-gradient(to right, #EFF2FF 100%, #E8ECFF 0%)';
    }
  }

  getData() {
    if (!this.isDataLoading) {
      this.isDataLoading = true;
      this.newEmployees = this.service.getLocalData();
      this.service.getDataEmployees().subscribe(
        (data: SocialMedia[]) => {
          this.employees = data;
          //Burada employeee.json içine yerleştirmiş olduğum üç tane dummy veriyi de ekleyebilmek için concat kullandım.
          // Böylece modal ile veri eklememiş olsam localim boş olsa bile dummy verilerim ile datagrid boş gözükmemiş olacak.
          this.newEmployees.concat(this.newEmployees )
          this.dataLength = this.newEmployees.length
        },
        (error) => {
          console.error('Hata:', error);
        }
      );
    }
  }


  ngOnInit() {
    this.getData();
  }
}
