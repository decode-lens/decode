import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DappInjectorService } from 'angular-web3';
import { avatarBase64, nftBase64 } from 'src/app/pages/create-profile/avatar.base64';
import { ProfileStructStruct } from 'src/assets/types/ILensHub';
import { IpfsService } from '../../services/ipfs-service';

@Component({
  selector: 'dececode-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnChanges {
  loading_image: boolean;
  image_src: string;
  currentProfileCtrl = new FormControl()
  nft_src: any;
  constructor(private router: Router, private ipfsService: IpfsService, private dappInjectorService: DappInjectorService) {

    this.currentProfileCtrl.valueChanges.subscribe((val => {
      this.currentProfile = val;
      this.changeProfile()
    }))

  }

  @Input() currentProfile: ProfileStructStruct;
  @Input() availableProfiles: Array<ProfileStructStruct>

  async asyncStuff() {

   
    const profil_image_cid = this.currentProfile.imageURI.replace('https://ipfs.io/ipfs/','');
    const profil_json_cid  = this.currentProfile.followNFTURI.replace('https://ipfs.io/ipfs/','');
    try {
      
      this.image_src = await this.ipfsService.getImage(profil_image_cid)
      const jsonFile = await this.ipfsService.getFile(profil_json_cid)

      this.loading_image = false;
    } catch (error) {
      this.image_src =avatarBase64;
      this.nft_src= nftBase64
      this.loading_image = false;
    }


  }
  changeProfile() {
    this.loading_image = true;
    this.asyncStuff();
    this.dappInjectorService.currentProfile = this.currentProfile;
  }


  ngOnChanges(): void {

    this.loading_image = true;
    this.currentProfileCtrl.setValue(this.currentProfile, { emitEvent: false })
    this.asyncStuff();

  }
  goProfile() {
    this.router.navigateByUrl(`/app/create-profile`)
  }
  gotoPub() {
    this.router.navigateByUrl('/app/create-publication')
  }

}
