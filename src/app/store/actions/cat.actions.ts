export class SearchCats {
  static readonly type = '[Cat] Search Cats';

  constructor(public limit: number, public breedId: string,) {
  }
}

export class GetBreeds {
  static readonly type = '[Cat] Get Breeds';
}
