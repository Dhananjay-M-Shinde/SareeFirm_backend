class newProduct {
    constructor(data) {
      this.products = [];
  
      data.forEach((item) => {
        let product = {
          product_Id: item.product_Id,
          Branch_Id: item.Branch_Id,
          Product_name: item.Product_name,
          Description: item.Description,
          Fabric: item.Fabric,
          Price_range: item.Price_range,
          Varients: item.Varients.map((variant) => {
            return {
              Color: variant.Color,
              Price: variant.Price,
              Design: variant.Design,
              Image: variant.Image,
              Quantity_Available: variant.Quantity_Available
            };
          })
        };
  
        this.products.push(product);
      });
    }
  }
  
class newVarient{
  constructor(variant){
              this.Color = variant.Color,
              this.Price =  variant.Price,
              this.Design =  variant.Design,
              this.Image =  variant.Image,
              this.Quantity_Available = variant.Quantity_Available
  }
}
 
module.exports = {
    newProduct,
    newVarient
  };