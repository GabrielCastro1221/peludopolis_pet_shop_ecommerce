let productImg = document.getElementById("productImg");
let smallImg = document.getElementsByClassName("small-img");

for (let i = 0; i < smallImg.length; i++) {
  smallImg[i].onclick = function () {
    productImg.src = this.src; 
  };
}
