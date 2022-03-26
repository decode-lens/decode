import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { blockchain_providers } from './blockchain_wiring';
import { DappInjectorModule } from './dapp-injector/dapp-injector.module';
import { StoreModule } from '@ngrx/store';
import { we3ReducerFunction } from 'angular-web3';
import { IpfsService } from './shared/services/ipfs-service';
import { LensApiService } from './shared/services/lens-api-service';
import { LitProtocolService } from './shared/services/lit-protocol-service';
import { DappLoadingModule } from './dapp-components';

@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DappInjectorModule,
    StoreModule.forRoot({web3: we3ReducerFunction}),
    DappLoadingModule



  ],
  providers: [
    ...blockchain_providers, IpfsService,LensApiService, LitProtocolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
