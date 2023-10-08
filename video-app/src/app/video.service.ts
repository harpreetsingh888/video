import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private BASE_URL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/videos`);
  }

  getVideo(videoId: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/videos/${videoId}`).pipe(
        catchError(error => {
            console.error('Error fetching video:', error);
            return throwError('Error fetching video, please try again later.');
        })
    );
  }

  getReactions(videoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/videos/${videoId}/reactions`).pipe(
        catchError(error => {
            console.error('Error fetching reactions:', error);
            return throwError('Error fetching reactions, please try again later.');
        })
    );
  }

  updateTitle(videoId: string, title: string): Observable<any> {
    return this.http.patch<any>(`${this.BASE_URL}/videos/${videoId}`, { title }).pipe(
        catchError(error => {
            console.error('Error updating video title:', error);
            return throwError('Error updating video title, please try again later.');
        })
    );
  }

  addReaction(videoId: string, type: string, timestamp: number): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/videos/${videoId}/reactions`, { videoId, type, timestamp }).pipe(
        catchError(error => {
            console.error('Error adding reaction:', error);
            return throwError('Error adding reaction, please try again later.');
        })
    );
  }

  getLoggedInUser() {
    return this.http.get<any>(`${this.BASE_URL}/users/self`).pipe(
        catchError(error => {
            console.error('Error getting user:', error);
            return throwError('Error getting user, please try again later.');
        })
    );
  }
}
