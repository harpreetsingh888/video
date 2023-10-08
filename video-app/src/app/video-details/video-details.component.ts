import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';

interface User {
  id: string;
  name: string;
  pictureUrl: string;
}

interface Video {
  id: string;
  title: string;
  url: string;
  createdDate: string;
  author: User;
  previewUrl: string;
}

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  video!: Video;
  reactions: any[] = [];
  loggedInUser!: User;
  isOwner: boolean = false;
  showSaveButton: boolean = false;
  @ViewChild('videoPlayer') videoPlayer: any;

  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['videoId'];
    this.videoService.getVideo(id).subscribe(video => {
      this.video = video;
      // After getting the video, fetch the details of the logged-in user
      this.videoService.getLoggedInUser().subscribe((user: any) => {
          this.loggedInUser = user;
          if (this.video.author.id === this.loggedInUser.id) {
              this.isOwner = true;
          }
      }, (error) => {
      console.error('Failed to fetch user:', error);
    });
    }, (error) => {
      console.error('Failed to fetch the video:', error);
    });
    this.videoService.getReactions(id).subscribe(reactions => {
      this.reactions = reactions
    }, (error) => {
      console.error('Failed to fetch reactions:', error);
    });
  }

  saveTitle(): void {
    this.videoService.updateTitle(this.video.id, this.video.title).subscribe(() => {
      this.showSaveButton = false;
    }, (error) => {
      
    });
  }

  addReaction(type: string): void {
    const timestamp = this.videoPlayer.nativeElement.currentTime;
    this.videoService.addReaction(this.video.id, type, timestamp).subscribe(reaction => {
      debugger;
      this.reactions.push(reaction);
    }, (error) => {
      console.error('Failed to add reaction:', error);
    });
  }

  jumpToReaction(reaction: any): void {
    this.videoPlayer.currentTime = reaction.timestamp;
    this.videoPlayer.pause();
  }

  onTitleChange(): void {
      this.showSaveButton = true;
  }
}
