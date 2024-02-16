import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productForSeller } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchresult : productForSeller[] | undefined;
  constructor(private activeRoute: ActivatedRoute, private product:ProductService){}
  ngOnInit(): void {
   let query = this.activeRoute.snapshot.paramMap.get('query');
  //  console.log(query)
   query &&this.product.searchQuery(query).subscribe((data)=>{
    //  console.log(data)
    this.searchresult = data;
   })
  }

}
