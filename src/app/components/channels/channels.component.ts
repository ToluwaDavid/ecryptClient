import { Component } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { IChannel } from '../../interface/channel';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.css',
})
export class ChannelsComponent {
  channels: IChannel[] = [];

  constructor(private channelService: ChannelService) {}
  ngOnInit(): void {
    this.gettAllChannel();
  }

  gettAllChannel(): void {
    this.channelService.getAllChannels().subscribe(
      (data) => {
        this.channels = data;
      },
      (error) => {
        console.error('Failed to load channels', error);
      }
    );
  }

  deleteChannel(id: string) {
    this.channelService.deleteAChannel(id).subscribe((response) => {
      alert('Channel has been deleted');
      this.gettAllChannel();
    });
  }
}
