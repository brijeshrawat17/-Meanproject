import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any;
  pc: any = [];
  accessories: any = [];
  xbox: any = [];
  i: any;

  name: String;
  product_id: String;
  img: String;
  price: 350;
  added: boolean;


  constructor(private authService: AuthService,
    private router: Router, private flashMessage: FlashMessagesService,
    private toastr: ToastrService) {
  }


  ngOnInit() {
    this.authService.getProducts().subscribe(data => {
      this.products = data;
      for (const product of this.products) {
        // tslint:disable-next-line: triple-equals
        // tslint:disable-next-line: quotemark
        // tslint:disable-next-line: triple-equals
        if (product.Catag == "pc") {
          // 1, "string", false
          this.pc.push(product);
        // tslint:disable-next-line: triple-equals
        } else if (product.Catag == 'xbox') {
          this.xbox.push(product);
        // tslint:disable-next-line: triple-equals
        } else if (product.Catag == 'accessories') {
          this.accessories.push(product);
        }
      }
    }, err => {
      console.log(err);
      return false;
    });
  }

  onEditProduct(product: any) {
    this.authService.storeProductData(product);
    this.router.navigate(['editproduct']);
  }
  onDeleteProduct(product: any) {
    this.authService.deleteProduct(product._id).subscribe(data => {
      if (data.success) {
        this.toastr.success('Successfully Deleted!', 'Delete!', { timeOut: 2000, });
        this.router.navigate(['/products']);
      } else {
        this.toastr.error('Something went wrong!', 'Error!', { timeOut: 2000, });
        this.router.navigate(['/products']);
      }
    });
  }

  onAddProductToCart(product) {
    const item = {
      name: product.name,
      product_id: product._id,
      img: product.img,
      price: 350,
      added: true,
      quantity: 1
    }
    this.authService.storeItemToOrder(item);
    this.toastr.success('Item is Added to your Cartng!', 'Cart!', {
      timeOut: 1000,
    });

  }
}
