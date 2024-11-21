import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { EditChannelComponent } from './components/edit-channel/edit-channel.component';
import { ViewChannelComponent } from './components/view-channel/view-channel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChannelsComponent,
    EditChannelComponent,
    ViewChannelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
