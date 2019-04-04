import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public apiBooksKey: string = "AIzaSyAIKBVlFQxpdw6VAiAWR-K5zfETR8vlwQM";
  public search: string = "a";
  public bookList: Array<any> = [];
  public index: any = 0;
  public choiceMaxResults: any = 20;

  //Constructor qui a en paramétre une instanciation de la class HttpClient
  constructor(private http: HttpClient) {


    this.loadData(true, null, this.index);
  }
  /**
   * Methode de récupération des livres
   * @param addBeforeContent 
   * @param even 
   */
  private loadData(addBeforeContent: boolean, even, index) {

    let url = "https://www.googleapis.com/books/v1/volumes";
    //Instanciation de la class HttpParams qui contient les paramétre a passer dans l'url
    let requestParams = new HttpParams()
      //Definition des paramétres (paramétre,valeur)
      .set('q', this.search)
      .set('key', this.apiBooksKey)
      .set('maxResults', this.choiceMaxResults)
      .set('startIndex', this.index);
    console.log(this.index);
    //la requet dans la variable req
    let req = this.http.get(url, { params: requestParams });
    //récupération de la réponse a la requet dans la variable data
    req.subscribe((data: any) => {
      console.log(data);
      if (addBeforeContent) {
        this.bookList = data.items.concat(this.bookList);
      } else {
        this.bookList = this.bookList.concat(data.items);
      }
      console.log(even);
      if (even) {
        even.target.complete();
      }
      console.log(this.bookList);
    })



  }

  private refreshData(even) {
    this.index = this.bookList.length;
    this.loadData(true, even, this.index);

  }
  private loadMoreData(even) {
    this.index += this.bookList.length;
    this.loadData(false, even, this.index);

  }

}
