import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { EditChannelComponent } from './components/edit-channel/edit-channel.component';
import { ViewChannelComponent } from './components/view-channel/view-channel.component';

const routes: Routes = [
  {path: '' , redirectTo: '/home' , pathMatch: 'full'},
  {path: 'home' , component: HomeComponent},
  {path: 'editchannel' , component:ChannelsComponent},
  {path: 'updatechannel/:id' , component:EditChannelComponent},
  {path: 'viewchannel' , component:ViewChannelComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
