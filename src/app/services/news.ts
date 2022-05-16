
import get from "lodash/get";
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject, from } from "rxjs";
import { map, switchMap, tap, debounceTime } from "rxjs/operators";

var random = Math.floor(Math.random() * 10000);

@Injectable({
    providedIn: 'root'
  })

export class NewsService {

  private API_URL:any = 'https://mopays.com/wp-json/wp/v2/';
  fetchallPost: any;
  setting;
 
  constructor(private http: HttpClient) {

    this.setting = firebase.database().ref('announce');
    
 
   
  }

  getSettings() {
    return this.setting
  }

  private baseURL = "https://mopays.com";

  fetchPosts() {
    const config = {
      headers: {
        "user-agent": "Mozilla/4.0 (compatible; MSIE 6.0; " + "Windows NT 5.2; .NET CLR 1.0.3705;)"
      }
    }
    return this.http
      .get(`${this.baseURL}/wp-json/wp/v2/posts?_embed`, config)
      .pipe(
        map((posts: Array<any>) => posts.map(this.setEmbeddedFeaturedImage))
      );
  }

  getFeedPost(): any{
    return this.fetchallPost;
  }

  get(query:string){
    return this.http.get(this.API_URL + query + '&v=' + random);
  }
  

  fetchPost(post_id: string) {
    const config = {
      headers: {
        "user-agent": "Mozilla/4.0 (compatible; MSIE 6.0; " + "Windows NT 5.2; .NET CLR 1.0.3705;)"
      }
    }
    return this.http
      .get(`${this.baseURL}/wp-json/wp/v2/posts/${post_id}?_embed`, config)
      .pipe(map((post: any) => this.setEmbeddedFeaturedImage(post)));
  }

  
getRecentPosts(categoryId:number, page:number = 1){
  const config = {
    headers: {
      "user-agent": "Mozilla/4.0 (compatible; MSIE 6.0; " + "Windows NT 5.2; .NET CLR 1.0.3705;)"
    }
  }
  let category_url = categoryId? ("&categories=" + categoryId): "";
    return this.http.get(`${this.baseURL}/wp-json/wp/v2/posts?_embed&page=` + page + category_url, config)
      .pipe(
        map((posts: Array<any>) => posts.map(this.setEmbeddedFeaturedImage))
      );
}

  private setEmbeddedFeaturedImage(p) {
    const config = {
      headers: {
        "user-agent": "Mozilla/4.0 (compatible; MSIE 6.0; " + "Windows NT 5.2; .NET CLR 1.0.3705;)"
      }
    }
    return Object.assign({}, p, {
      featured_image: get(p, "_embedded['wp:featuredmedia'][0].source_url", config)
    });
  }

  fetchPostCategories() {
    const config = {
      headers: {
        "user-agent": "Mozilla/4.0 (compatible; MSIE 6.0; " + "Windows NT 5.2; .NET CLR 1.0.3705;)"
      }
    }
    return this.http.get(`${this.baseURL}/wp-json/wp/v2/categories`, config); 
  }

  fetchPostsByCategory(category_id: string) {
    const config = {
      headers: {
        "user-agent": "Mozilla/4.0 (compatible; MSIE 6.0; " + "Windows NT 5.2; .NET CLR 1.0.3705;)"
      }
    }
    return this.http
      .get(
        `${this.baseURL}/wp-json/wp/v2/posts?_embed&categories=${category_id}`, config
      )
      .pipe(
        map((posts: Array<any>) => posts.map(this.setEmbeddedFeaturedImage))
      );
  }

getNewsCat(): Observable<any> {
  const config = {
    headers: {
      "user-agent": "Mozilla/4.0 (compatible; MSIE 6.0; " + "Windows NT 5.2; .NET CLR 1.0.3705;)"
    }
  }
  return this.http.get("https://ashekboy.github.io/audioapis/mopays_news.json", config);
}

search(key: Observable<string>, page){
  return key.pipe(debounceTime(700),switchMap(val => {
    console.log(val);
    return this.searchPost(val, page)
    })
  ) // .subscribe(res => this.book = res); 
}

searchPost(key, page) : Observable<any> {
  let result = this.http.get(this.API_URL + 'posts?_embed&per_page=20&page=' + page + '&search=' + key)
  if (result) {
      return result
  }
 }


 getPosts(page = 1, categoryId = null, search = ''): Observable<any> {
  let options = {
    observe: "response" as "body",
    params: {
      per_page: "5",
      page: "" + page,
    },
  };

  let url = `${this.API_URL}posts?_embed`;

  if(categoryId){
    url += `&categories=${categoryId}`;
  }

  if(search != '') {
    url += `&search=${search}`;
  }

  console.log('request: ', url);

  return this.http
    .get<any[]>(url, options)
    .pipe(
      map((res) => {
        let mediaUrl = "../assets/img/no-image-available.jpg";
        let data = res["body"];
        

        for (let post of data) {
          console.log(post);
          if (post["_embedded"]["wp:featuredmedia"]) {
            post.media_url =
              post["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes[
                "full"
              ].source_url;
          }
          else {
                 post.media_url = "../assets/img/no-image-available.jpg";
                 //post.source_url = "../assets/img/no-image-available.jpg";
               }
        
        }

        return {
          
          posts: data,
          pages: res["headers"].get("x-wp-totalpages"),
          totalPosts: res["headers"].get("x-wp-total"),
        };
      })
    );
}


}