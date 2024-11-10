import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Blog, BlogRequest } from '../models/personalBlog.model';

@Injectable({
  providedIn: 'root',
})
export class HomeApiService {
  constructor(private _http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this._http.get<Blog[]>(environment.API_ENDPOINT + '/blogs');
  }
  getBlogById(blogId: number): Observable<Blog> {
    return this._http.get<Blog>(environment.API_ENDPOINT + '/blog/' + blogId);
  }
  addBlogs(requestBody: BlogRequest): Observable<Blog[]> {
    return this._http.post<Blog[]>(
      environment.API_ENDPOINT + '/blog',
      requestBody
    );
  }
  updateBlogs(blog: Blog): Observable<Blog[]> {
    return this._http.put<Blog[]>(
      environment.API_ENDPOINT + '/blog/' + blog.id,
      blog
    );
  }
  deleteBlog(blogId: number): Observable<Blog[]> {
    return this._http.delete<Blog[]>(
      environment.API_ENDPOINT + '/blog/' + blogId
    );
  }
}
