import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  videos: any[] = [];
  isGridView: boolean = true;

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(videos => {
      this.videos = videos
    }, (error) => {
      console.error('Failed to fetch the videos:', error);
    });
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }
}
