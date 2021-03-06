import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, from } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const JWT_KEY = "mytoken";

@Injectable({
  providedIn: "root",
})
export class ApiService {

  private user = new BehaviorSubject(null);
  //private postId = this.post;
  
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private plt: Platform) {
    this.plt.ready().then(() => {
      this.storage.get(JWT_KEY).then(data => {
        if (data) {
          console.log('JWT from storage: ', data);
          this.user.next(data);
        }
      })
    })
      
    }

  getPosts(page = 1, categoryId = null): Observable<any> {
    let options = {
      observe: "response" as "body",
      params: {
        per_page: "5",
        page: "" + page,
      },
    };
   
    let url = `${environment.apiUrl}posts?_embed`;

    if(categoryId){
      url += `&categories=${categoryId}`;
    }

    /*if(search != '') {
      url += `&search=${search}`;
    }*/

    console.log('request: ', url);

    return this.http
      .get<any[]>(url, options)
      .pipe(
        map((res) => {
          let mediaUrl = "../assets/icon.png";
          let data = res["body"];
          

          for (let post of data) {
            console.log(post);
            if (post["_embedded"]["wp:featuredmedia"]) {
              /*post.media_url =
                post["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes[
                  "full"
                ].source_url;*/

                post.media_url =  post["_embedded"]["wp:featuredmedia"][0].source_url;

                //post._embedded["wp:featuredmedia"][0].source_url
            }
            else {
                   post.media_url = "../assets/icon.png";
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

  getPostContent(id) {
    return this.http
      .get<any>(`${environment.apiUrl}posts/${id}?_embed`)
      .pipe(map (post => {

        if (post["_embedded"]["wp:featuredmedia"]) {
          /*post.media_url =
            post["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes[
              "full"
            ].source_url;*/
            post.media_url =  post["_embedded"]["wp:featuredmedia"][0].source_url;
        }
        else if (!post["_embedded"]["wp:featuredmedia"]) {
          post.media_url = "../assets/icon.png";
          //post.source_url = "../assets/img/no-image-available.jpg";
        }
        return post;
      })
      );
  }

  getCategories() {
    return this.http.get<any[]>(`${environment.apiUrl}categories`).pipe(
      map(res => {
        const items = [];
        for (let item of res) {
          items.push({
            id: item.id,
            name: item.name,
            slug: item.slug
          });
        }
        return items;
      })
    )
  }

  getPages() {

    return this.http.get<any[]>(`${environment.apiUrl}pages`).pipe(
      map(res => {
        const items = [];
        for (let item of res) {
          items.push({
            url: `page/${item.id}`,
            title: item.title.rendered,
            icon: 'file-tray'
          });
        }
        return items;
      })
    )

  }

  getPageContent(id) {

    return this.http
      .get<any>(`${environment.apiUrl}pages/${id}?_embed`)
      .pipe(map(page => {

        if (page["_embedded"]["wp:featuredmedia"]) {
          /*page.media_url =
            page["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes[
              "full"
            ].source_url;*/
            page.media_url =  page["_embedded"]["wp:featuredmedia"][0].source_url;
        }
        else {
          page.media_url = "../assets/icon.png";
        }
        return page;
      })
      );

  }

 

  getPrivatePosts() {
    return this.http.get<any[]>(`${environment.apiUrl}posts?_embed`).pipe( // posts?_embed&status=private` ne fonctionne plus mais sans le private ca marche bizarre
      map(data => {
        for (let post of data) {
          if (post["_embedded"]["wp:featuredmedia"]) {
            /*post.media_url =
              post["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes[
                "full"
              ].source_url;*/
              post.media_url =  post["_embedded"]["wp:featuredmedia"][0].source_url;
          }
          else {
            post.media_url = "../assets/icon.png";
            
          }
        }
        return data;
      })
    );
  }

  getCurrentUser() {
    return this.user.asObservable();
  }

  getUserValue() {
    return this.user.getValue();
  }

  logout() {
    this.storage.remove(JWT_KEY).then(() => {
      this.user.next(null);
    });
  }

  getComments(postId) {
    return this.http.get<any[]>(`${environment.apiUrl}comments?post=${postId}`);
  }

  addComment(postId, comment) {
    const user = this.getUserValue();

     const body = {
      post: postId,
      content: comment,
      author_email: user.user_email,
      author_name: user.user_display_name,
    }

    return this.http.post(`${environment.apiUrl}comments`, body);
  }

}