import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DappInjectorService } from './dapp-injector.service';
import { ISTARTUP_CONFIG } from './models';

export const startUpConfig:ISTARTUP_CONFIG = {
  defaultNetwork: 'mumbai',
  defaultProvider:null,
  connectedNetwork:'',
  wallet: 'wallet',
  defaultContract:null,
  defaultViewContract:null,
  blockSubscription: false,
  providers:{},
  contracts:{},

}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class DappInjectorModule { 
  static forRoot(): ModuleWithProviders<DappInjectorModule> {
    return {
      ngModule: DappInjectorModule,
      providers: [
        {provide: DappInjectorService}
      ]
    };
  }
 }
