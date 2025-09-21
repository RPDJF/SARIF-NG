import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { UserState, UserStateModel } from './user.state';
import { UserAction } from './user.actions';

describe('User store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([UserState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: UserStateModel = {
      items: ['item-1']
    };
    store.dispatch(new UserAction('item-1'));
    const actual = store.selectSnapshot(UserState.getState);
    expect(actual).toEqual(expected);
  });

});
