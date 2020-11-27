import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit  {

  posts = [];
  constructor() { }
  
  ngOnInit() {
    this.getPosts();
  }

  getPosts(){
    for(let i = 0; i< 20;i++){
      let post = {
        uname: 'ynathan'+(i+1),
        title: 'the oop in the async languages',
        topics : ['oop','C#','car'],
        kind : 'txt',
        obj: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: new Date(Date.now())       
      }
      post.date.setHours(post.date.getHours() - 1);
      post.date.setMinutes(post.date.getMinutes() - 1);
      
      this.posts.push(post);
    }
  }
 
  onScrollDown() {
    console.log('scrolled down!!');
  }
 
  onScrollUp() {
    console.log('scrolled up!!');
  }

  }
