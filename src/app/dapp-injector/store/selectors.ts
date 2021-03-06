import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe, filter, map } from 'rxjs';
import { Web3State } from './models';
import * as reducer from './reducer';

//export const selectState = (state: Web3State) => state;

export const selectWeb3State = createFeatureSelector<Web3State>(
  reducer.web3FeatureKey
);

//

const selectState  = createSelector(
  selectWeb3State,
  (state: Web3State) => state
);

const chainStatus = createSelector(
  selectWeb3State,
  (state: Web3State) => state.chainStatus
);

const selectChainReady = pipe(
  select(chainStatus),
  filter((val) => val == 'success')
);


const pleaseDisconnect = pipe(
  select(chainStatus),
  filter((val) => val == 'disconnected')
);

const isNetworkBusy = createSelector(
  selectWeb3State,
  (state: Web3State) => state.isNetworkBusy
);

const isviewReady = pipe(
  select(selectWeb3State),
  map(map=> map.readingContract),
  filter((val) => val == true)
);



const selectSignerNetwork = createSelector(
  selectWeb3State,
  (state: Web3State) => state.signerNetwork
);


const selectWalletBalance= pipe(
  select(selectState),
  map(map=> map.walletBalance)
);

const selectDollarExchange= pipe(
  select(selectState),
  filter((val) => val.etherToDollar !== 0),
  map(map=> map.etherToDollar)
);


//////// Profiles
const fetchedProfiles = createSelector(
  selectWeb3State,
  (state: Web3State) => state.lensProfiles
);


//////// Profiles
const fetchedPublications = createSelector(
  selectWeb3State,
  (state: Web3State) => state.lensPublications
);

export const web3Selectors = {
  chainStatus,
  selectChainReady,
  pleaseDisconnect,
  isNetworkBusy,
  isviewReady,
  selectSignerNetwork,
  selectWalletBalance,
  selectDollarExchange,
  ///// lens protocol State
  fetchedProfiles,
  fetchedPublications
};
