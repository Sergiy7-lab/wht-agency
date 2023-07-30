import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {CatState} from '../../store/states/cat.state';
import {GetBreeds, SearchCats} from '../../store/actions/cat.actions';
import {Select, Store} from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  @Select(CatState.getCats) cats$!: Observable<any[]>;
  @Select(CatState.getBreeds) breeds$!: Observable<any[]>;
  searchForm: FormGroup;

  constructor(private store: Store) {
    this.searchForm = new FormGroup({
      breed: new FormControl(''),
      limit: new FormControl(10)
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetBreeds());
    this.searchCats();
  }

  searchCats(): void {
    const breedId = this.searchForm.value.breed;
    const limit = this.searchForm.value.limit;
    this.store.dispatch(new SearchCats(limit, breedId));
  }
}
