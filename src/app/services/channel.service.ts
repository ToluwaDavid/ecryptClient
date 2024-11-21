import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChannel } from '../interface/channel';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiUrl =
    'http://localhost:3000/https://encryptserver-fcva.onrender.com/channels';

  constructor(private http: HttpClient) {}

  createChannel(channel: any): Observable<any> {
    return this.http.post(this.apiUrl, channel);
  }

  getAllChannels(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteAChannel(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAChannel(id: string): Observable<IChannel> {
    return this.http.get<IChannel>(`${this.apiUrl}/${id}`);
  }

  updateChannel(id: string, channel: any) {
    return this.http.put(`${this.apiUrl}/${id}`, channel);
  }

  getPublicKey(name: string): Observable<any> {
    const params = new HttpParams().set('name', name); // Add the channel name as a query parameter
    return this.http.get<{ publicKey: string }>(`${this.apiUrl}/getPublicKey`, {
      params,
    });
  }
}
