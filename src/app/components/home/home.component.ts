import { Component, OnInit } from '@angular/core';
import { IChannel } from '../../interface/channel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncryptService } from '../../services/encrypt.service';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showForm: boolean = false;
  channels: IChannel[] = [];
  filteredChannels: IChannel[] = [];
  selectedChannel: string = '';
  selectedPublicKey: string | null = null;
  channelForm!: FormGroup;
  parameters: Array<{ name: string; value: string }> = [
    { name: '', value: '' },
  ];
  encryptedOutput: string | null = null;
  showDeleteButton: boolean = false;

  constructor(
    private fb: FormBuilder,
    private channelService: ChannelService,
    private encryptService: EncryptService
  ) {
    this.channelForm = this.fb.group({
      name: ['', Validators.required],
      publicKey: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllChannels();
    this.removelastDeletebutton();
  }

  toggleAddChannel(): void {
    this.showForm = !this.showForm;
  }

  addNewChannel(): void {
    if (
      this.channelForm.value.name === '' ||
      this.channelForm.value.publicKey === ''
    ) {
      alert('Field(s) cannot be empty');
    } else {
      this.channelService.createChannel(this.channelForm.value).subscribe(
        (data) => {
          this.channels.push(data);
          // this.filteredChannels = [...this.channels];
          this.channelForm.reset();
          this.showForm = false;
        },
        (error) => console.error('Failed to create channel:', error)
      );
    }
  }

  getAllChannels(): void {
    this.channelService.getAllChannels().subscribe(
      (data) => {
        this.channels = data;
        //this.filteredChannels = data;
      },
      (error) => console.error('Failed to load channels:', error)
    );
  }

  filterchal(query: string): void {
    if (!query) {
      this.filteredChannels = [];
    } else {
      this.filteredChannels = [...this.channels];
      const lowerCaseQuery = query.toLowerCase();
      this.filteredChannels = this.channels.filter((channel) =>
        channel.name.toLowerCase().includes(lowerCaseQuery)
      );
    }
  }

  selectFilteredChannel(channelName: string): void {
    this.selectedChannel = channelName;
    this.filteredChannels = [];
    this.fetchPublicKey();
  }

  fetchPublicKey(): void {
    if (!this.selectedChannel) {
      alert('Please select a channel.');
      return;
    }

    this.channelService.getPublicKey(this.selectedChannel).subscribe(
      (data) => {
        this.selectedPublicKey = data.publicKey;
      },
      (error) => console.error('Failed to fetch public key:', error)
    );
  }

  addParameter(): void {
    this.parameters.push({ name: '', value: '' });
    this.showDeleteButton = true;
  }

  removeParameter(index: number): void {
    if (this.parameters.length > 1) {
      this.parameters.splice(index, 1);
    }
    if (this.parameters.length === 1) {
      this.showDeleteButton = false;
    }
  }

  removelastDeletebutton() {
    if (this.parameters.length === 1) {
      this.showDeleteButton = false;
    }
  }

  resetAll(): void {
    this.parameters = [{ name: '', value: '' }];
    this.encryptedOutput = null;
    this.selectedPublicKey = null;
    this.selectedChannel = '';
    this.filteredChannels = [...this.channels];
    this.showDeleteButton = false;
  }

  encryptParameters(): void {
    if (!this.selectedPublicKey) {
      alert('Please select a channel to get a public key.');
      return;
    }

    const encryptedParams: { [key: string]: string } = {};
    console.log(encryptedParams);
    console.log(this.parameters);

    this.parameters.forEach((param) => {
      if (param.name === '' || param.value === '') {
        alert(
          'Parameter name or Parameter Value cannot be empty for any Paramter to be encrypted'
        );
      } else {
        const encryptedValue = this.encryptService.encryptData(
          this.selectedPublicKey!,
          param.value
        );
        if (encryptedValue) {
          encryptedParams[param.name] = encryptedValue;
        }
        this.encryptedOutput = JSON.stringify(encryptedParams, null, 2);
      }
    });
  }

  copyToClipboard(): void {
    if (this.encryptedOutput) {
      navigator.clipboard.writeText(this.encryptedOutput).then(() => {
        alert('Encrypted parameters copied to clipboard!');
      });
    }
  }
}
