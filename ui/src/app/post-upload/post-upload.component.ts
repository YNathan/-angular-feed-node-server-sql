import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, pipe } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { startWith, map, first } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TopicService } from '../_services/topic.service';
import { AlertService } from '../_services';
import { PostesService as PostsService } from '../_services/postes.service';
@Component({
  selector: 'app-post-upload',
  templateUrl: './post-upload.component.html',
  styleUrls: ['./post-upload.component.css']
})
export class PostUploadComponent implements OnInit {
  title: String;
  textarea: String;
  currentUser: JSON;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  topicCtrl = new FormControl();
  filteredTopics: Observable<string[]>;
  topics = [];
  allTopics: string[];

  @ViewChild('topicInput', { static: true }) topicInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: true }) matAutocomplete: MatAutocomplete;

  @Input('userTopicPrefix')
  set userTopicPrefix(value: String) {
    if (value !== undefined && value) {
      this.topicService.getTopicByPrefix(value).pipe(first())
        .subscribe(
          data => {
            this.allTopics = data['results'];
            this.allTopics = this.allTopics.map((x) => x['name'])

            this.filteredTopics = this.topicCtrl.valueChanges.pipe(
              startWith(null),
              map((topic: string | null) => topic ? this._filter(topic) : this.allTopics.slice()));

          },
          error => {
            this.alertService.error(error);
          });
    }
  }

 


  ngOnInit() {
  }

  constructor(private topicService: TopicService, private alertService: AlertService,private postsService: PostsService) {
  
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getFiltredOption();

  }


  getFiltredOption() {
    this.topicService.getTopicByUserId(this.currentUser['id']).pipe(first())
      .subscribe(
        data => {
          this.allTopics = data['results'];
          this.allTopics = this.allTopics.map((x) => x['name'])

          this.filteredTopics = this.topicCtrl.valueChanges.pipe(
            startWith(null),
            map((topic: string | null) => topic ? this._filter(topic) : this.allTopics.slice()));

        },
        error => {
          this.alertService.error(error);
        });
  }


  // start topics section
  add(event: MatChipInputEvent): void {
    // Add topic only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our topic
      if ((value || '').trim()) {
        this.topics.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.topicCtrl.setValue(null);
    }
  }

  remove(topic: string): void {
    const index = this.topics.indexOf(topic);

    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.topics.push(event.option.viewValue);
    this.topicInput.nativeElement.value = '';
    this.topicCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTopics.filter(topic => topic.toLowerCase().indexOf(filterValue) === 0);
  }

  private uploadAPost(){
    console.log("user", this.currentUser['id']);
    console.log("title", this.title);
    console.log("textarea", this.textarea);
    console.log("topics", this.topics);
    
    this.postsService.uploadPost({user_id : this.currentUser['id'], title : this.title, textarea : this.textarea, topics :  this.topics});
  }






}
