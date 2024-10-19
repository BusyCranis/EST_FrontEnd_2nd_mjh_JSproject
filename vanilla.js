var wrapproductlist = document.getElementById("wrapproductlist");
var vanillaListArr = [];
var mimicMiniStore = {};



function increaseAmountToBuy(eachName) {
  console.log(eachName);
  console.log(mimicMiniStore);
  console.log(mimicMiniStore[eachName]);
  console.log(wrapproductlist.innerHTML);
  mimicMiniStore[eachName] = mimicMiniStore[eachName] + 1;
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
                                      <button   onclick="increaseAmountToBuy('${eachname}')">+</button>
                                      총 상품 금액  총 수량 ${json.stock}개    
                                      ${json.price + json.shipping_fee}원
                                      <button>바로 구매</button>
                                      <button>장바구니</button>
                                    </div>
                                   </div>`;
    }).catch((error) => console.error(error));

}




fetch("https://estapi.openmarket.weniv.co.kr/products/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    vanillaListArr = json.results;

    prefer0Time(vanillaListArr);
  })
  .catch((error) => console.error(error));

const getList = async (list) => {
  console.log(list);
  createListCard(list);
};

const createListCard = (data) => {
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    // let preindex = i;
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

    menuCardWrapper.addEventListener("click", (event) => {
      // console.log(event);
      event.stopPropagation();
      mimicMiniStore[nameOf] = defaultAmountToBuy;
      console.log(dataid);

      setEachItemDetailPage(dataid, nameOf);

      // fetch("https://estapi.openmarket.weniv.co.kr/products/" + dataid + "/", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }).then((response) => response.json()).then((json) => {
      //     console.log(json);
      //     wrapproductlist.innerHTML = `<div   class="eachdetailpagecontents" >
      //                                   <img  src="${json.image}"></img>
      //                                   <div>
      //                                     ${json.seller.name}
      //                                     ${json.name}
      //                                     ${json.price}원
      //                                     ${json.shipping_method} / ${json.shipping_fee}
      //                                     <button>-</button>  
      //                                     ${mimicMiniStore[nameOf]}  
      //                                     <button   onclick="increaseAmountToBuy('${nameOf}')">+</button>
      //                                     총 상품 금액  총 수량 ${json.stock}개    
      //                                     ${json.price + json.shipping_fee}원
      //                                     <button>바로 구매</button>
      //                                     <button>장바구니</button>
      //                                   </div>
      //                                  </div>`;
      //   }).catch((error) => console.error(error));


    });
  }
};

async function openList(arr0) {
  await getList(arr0);
}

function preExecute(callback) {
  wrapproductlist.innerHTML = "";

  console.log(wrapproductlist);
  callback();
}

function prefer0Time(listarr) {
  console.log(wrapproductlist);
  preExecute(() => {
    openList(listarr);
  });
}

function setListToShare() {
  // let tempReader = new FileReader();
  // console.log(btnvanila.files);
  // tempReader.onload = (ef) => {
  //   console.log(ef.target.result);
  //   let newitemtoshare = {
  //     id: Date.now(),
  //     type: "rtshare",
  //     fieldContent: ef.target.result,
  //   };
  //   console.log(newitemtoshare);
  //   vanillaListArr.push(newitemtoshare);
  //   prefer0Time(vanillaListArr);
  // };
  // tempReader.readAsDataURL(btnvanila.files[0]);
}

// function updatevanillaitem(cutid, aidx) {
//   console.log(updatevanila.value);
//   let newvalueupdate = updatevanila.value;
//   vanillaListArr[aidx].fieldContent = newvalueupdate;
//   prefer0Time(vanillaListArr);
// }
// function checkpropagation(cutid) {
//   let restArr = vanillaListArr.filter((item) => item.id !== cutid);
//   vanillaListArr = restArr;
//   prefer0Time(vanillaListArr);
// }
