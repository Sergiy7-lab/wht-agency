import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {CatApiService} from '../../services/cat-api.service';
import {GetBreeds, SearchCats} from '../actions/cat.actions';
import {CatStateModel} from '../../interfaces/cat-state-model';

@Injectable()
@State<CatStateModel>({
  name: 'cats',
  defaults: {
    cats: [],
    breeds: [],
  },
})

export class CatState {
  constructor(private catApiService: CatApiService) {
  }

  @Selector()
  static getCats(state: CatStateModel) {
    return state.cats;
  }

  @Selector()
  static getBreeds(state: CatStateModel) {
    return state.breeds;
  }

  @Action(GetBreeds)
  getBreeds(ctx: StateContext<CatStateModel>) {
    return this.catApiService.getBreeds().pipe(
      tap((breeds: any[]) => {
        ctx.patchState({breeds});
      })
    );
  }

  @Action(SearchCats)
  searchCats(
    ctx: StateContext<CatStateModel>,
    {limit, breedId}: SearchCats
  ) {
    return this.catApiService.searchCats(limit, breedId).pipe(
      tap((cats: any[]) => {
        ctx.patchState({cats});
      })
    );
  }
}
