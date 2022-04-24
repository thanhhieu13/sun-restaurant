<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    function addProduct(Request $req){
        $product = new Product;
        $product->name = $req->input('name');
        $product->price = $req->input('price');
        $product-> description = $req->input('description');

        $product-> file_path = $req->file('file')->store('products');
        $product->save();

        return $product;
    }
    function list(){
        return Product::all();
    }

    function delete($Id){
        $result= Product::where('Id',$Id)->delete();
        if($result){
            return ["result"=>"product has been deleted"];
        }
        else {
            return ["result"=>"operation failed"];
        }
    }

    function getProduct($Id){
        return Product::find($Id);
        
    }
    
   function updateProduct(Request $req, $Id){
    // //    return $Id;
        $product = Product::find($Id);
        $product->name = $req->input('name');
        $product->price = $req->input('price');
        $product-> description = $req->input('description');
        if($req->file('file'))
        {
            $product-> file_path = $req->file('file')->store('products');
        }
        

        $product->update();
        return $product;
    }

   
}
