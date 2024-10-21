var wrapproductlist = document.getElementById("wrapproductlist");
var vanillaListArr = [];
var mimicMiniStore = {};



fetch("https://estapi.openmarket.weniv.co.kr/products/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
}).then((response) => response.json()).then((json) => {
  console.log(json);
  vanillaListArr = json.results;

  showProductListElement(vanillaListArr);
}).catch((error) => console.error(error));



function increaseAmountToBuy(eachName, productid) {
  console.log(mimicMiniStore);
  console.log(mimicMiniStore[eachName]);
  console.log(productid);
  // console.log(wrapproductlist.innerHTML);
  let tempName = "amountToBuy" + productid;
  mimicMiniStore[eachName] = mimicMiniStore[eachName] + 1;


  setEachItemDetailPage(productid, tempName);
}


function setEachItemDetailPage(eachid, eachname) {
  fetch("https://estapi.openmarket.weniv.co.kr/products/" + eachid + "/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json()).then((json) => {
      console.log(json);
      wrapproductlist.innerHTML = `<div   class="eachdetailpagecontents" >
                                    <img  src="${json.image}"></img>
                                    <div>
                                      ${json.seller.name}
                                      ${json.name}
                                      ${json.price}원
                                      ${json.shipping_method} / ${json.shipping_fee}
                                      <button>-</button>  
                                      ${mimicMiniStore[eachname]}  
                                      <button   onclick="increaseAmountToBuy('${eachname}', '${eachid}')">+</button>
                                      총 상품 금액  총 수량 ${mimicMiniStore[eachname]}개    
                                      ${json.price * mimicMiniStore[eachname] + json.shipping_fee}원
                                      <button>바로 구매</button>
                                      <button>장바구니</button>
                                    </div>
                                   </div>`;
  }).catch((error) => console.error(error));
}



const createListCard = (data) => {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let dataid = data[i].id;

    const menuCardImgBox = document.createElement("img");
    menuCardImgBox.className = "Menu_Card_ImgBox";

    const menuCardWrapper = document.createElement("div");
    menuCardWrapper.className = "menuCardWrapper";

    const menuProductName = document.createElement("div");
    menuProductName.textContent = data[i].name;

    const menuSellerName = document.createElement("div");
    menuSellerName.textContent = data[i].seller.name;

    const menuProductPrice = document.createElement("div");
    menuProductPrice.textContent = data[i].price + "원";

    menuCardWrapper.appendChild(menuCardImgBox);
    menuCardWrapper.appendChild(menuSellerName);
    menuCardWrapper.appendChild(menuProductName);
    menuCardWrapper.appendChild(menuProductPrice);

    wrapproductlist.appendChild(menuCardWrapper);

    menuCardImgBox.setAttribute("src", data[i].image);

    let nameOf = "amountToBuy" + dataid;
    let defaultAmountToBuy = 1;
    let eachdataid = "product" + dataid;

    mimicMiniStore[eachdataid] = dataid;

    menuCardWrapper.addEventListener("click", (event) => {
      event.stopPropagation();
      mimicMiniStore[nameOf] = defaultAmountToBuy;
      console.log(dataid);

      setEachItemDetailPage(dataid, nameOf);
    });
  }
};



function cleanOldListElement(callback) {
  wrapproductlist.innerHTML = "";

  console.log(wrapproductlist);
  callback();
}

function showProductListElement(listarr) {
  console.log(wrapproductlist);
  cleanOldListElement(() => {
    createListCard(listarr);
  });
}




