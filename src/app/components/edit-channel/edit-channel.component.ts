import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelService } from '../../services/channel.service';
import { IChannel } from '../../interface/channel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.css'],
})
export class EditChannelComponent implements OnInit {
  channelForm!: FormGroup;
  channelId: string = ''; // Correctly declare channelId

  constructor(
    private fb: FormBuilder,
    private channelService: ChannelService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.channelForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      publicKey: ['', Validators.required],
      status: [true],
      createdAt: [new Date()],
      // updatedAt: [new Date()]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.channelId = params['id'];
      if (this.channelId) {
        this.getAChannel(this.channelId);
      }
    });
  }

  getAChannel(id: string): void {
    this.channelService.getAChannel(id).subscribe(
      (data) => {
        this.channelForm.setValue(data);
      },
      (error) => {
        console.error('Failed to load channel', error);
      }
    );
  }

  updateChannel(): void {
    if (this.channelForm.valid) {
      this.channelService
        .updateChannel(this.channelId, this.channelForm.value)
        .subscribe(
          (data) => {
            console.log('Channel updated successfully', data);
            alert('Channel updated successfully');
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Failed to update channel', error);
          }
        );
    }
  }
}
