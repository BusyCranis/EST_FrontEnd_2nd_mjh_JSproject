// var vanilainputfield = document.getElementById("vanila");
// var btnvanila = document.getElementById("btnvanila");
// let menu = document.getElementById("Menu_Background");
// var updatevanila = document.getElementById("updatevanila");
var wrapproductlist = document.getElementById("wrapproductlist");
var vanillaListArr = [];

fetch("https://estapi.openmarket.weniv.co.kr/products/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  // body: JSON.stringify({
  //     username: 'test1',
  //     password: 'test1234',
  // }),
})
  .then((response) => response.json())
  .then((json) => console.log(json))
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
    let dataimgsrc = data[i].fieldContent;

    const menuCardWrapper = document.createElement("li");
    menuCardWrapper.className = "menuCardWrapper0";
    menuCardWrapper.setAttribute("data-id", dataid);

    const menuCardImgBox = document.createElement("img");
    menuCardImgBox.className = "Menu_Card_ImgBox";

    menuCardWrapper.appendChild(menuCardImgBox);

    menu.appendChild(menuCardWrapper);

    menuCardImgBox.setAttribute("src", dataimgsrc);
  }
};

async function openList(arr0) {
  await getList(arr0);
}

function preExecute(callback) {
  menu.innerHTML = "";

  console.log(menu);
  callback();
}

function prefer0Time(listarr) {
  console.log(menu);
  preExecute(() => {
    openList(listarr);
  });
}

// btnvanila.addEventListener("change", setListToShare, false);

function setListToShare() {
  let tempReader = new FileReader();
  // console.log(btnvanila);
  console.log(btnvanila.files);

  tempReader.onload = (ef) => {
    console.log(ef.target.result);
    let newitemtoshare = {
      id: Date.now(),
      type: "rtshare",
      fieldContent: ef.target.result,
    };

    console.log(newitemtoshare);
    vanillaListArr.push(newitemtoshare);

    prefer0Time(vanillaListArr);
  };
  tempReader.readAsDataURL(btnvanila.files[0]);
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
