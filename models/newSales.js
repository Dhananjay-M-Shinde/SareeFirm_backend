class Sales {
    constructor(data) {
      this.salesId = data.salesId;
      this.customerName = data.customerName;
      this.customerMobile = data.customerMobile;
      this.salesDate = data.salesDate;
      this.productCart = [];
      data.productCart.forEach(product => {
        this.productCart.push({
          productId: product.productId,
          branchId: product.branchId,
          productName: product.productName,
          color: product.color,
          quantity: product.quantity,
          totalAmount: product.totalAmount
        });
      });
      this.totalAmount = data.totalAmount;
    }
  }

  module.exports = Sales;