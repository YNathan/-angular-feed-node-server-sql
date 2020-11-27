import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  
  constructor(private http: HttpClient) { }
  
  getTopicByUserId(userId : number) {
    return this.http.get<any[]>(`${environment.apiUrl}user_topics/?user_id=${userId}`);
  }
  insertTopicByUserId(userTopics: JSON) {
    return this.http.post(`${environment.apiUrl}insert_user_topics`, userTopics);
  }
  getTopicByPrefix(prfx : String) {
    return this.http.get<any[]>(`${environment.apiUrl}prefix_topic/?topic_prefix=${prfx}`);
  }
}
