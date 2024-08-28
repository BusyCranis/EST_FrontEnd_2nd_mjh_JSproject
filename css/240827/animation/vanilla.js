var vanilainputfield = document.getElementById("vanila");
var btnvanila = document.getElementById("btnvanila");
let menu = document.getElementById("Menu_Background");
var updatevanila = document.getElementById("updatevanila");
var vanillaListArr = [];

const getList = async (list) => {
  console.log(list);

  createListCard(list);
};

const createListCard = (data) => {
  console.log(data);

  for (var i = 0; i < data.length; i++) {
    let preindex = i;
    let dataid = data[i].id;
    // let writterId = data[i].playerId;

    const menuCardWrapper = document.createElement("div");
    menuCardWrapper.className = "menuCardWrapper0";
    menuCardWrapper.setAttribute("data-id", dataid);
    // menuCardWrapper.setAttribute("data-playerid", writterId);

    const menuCardImgBox = document.createElement("div");
    menuCardImgBox.className = "Menu_Card_ImgBox";

    const menuCardName = document.createElement("div");
    menuCardName.className = "Menu_Card_Name";
    menuCardName.textContent = data[i].fieldContent + " of " + data[i].id;

    const innerupdate = document.createElement("button");
    innerupdate.textContent = "수정";

    const innerButton = document.createElement("button");
    innerButton.textContent = "삭제";

    menuCardWrapper.appendChild(menuCardImgBox);
    menuCardWrapper.appendChild(menuCardName);
    menuCardWrapper.appendChild(innerupdate);
    menuCardWrapper.appendChild(innerButton);

    menu.appendChild(menuCardWrapper);

    innerupdate.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        console.log(dataid);
        console.log(preindex);

        updatevanillaitem(dataid, preindex);
      },
      false
    );

    innerButton.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        console.log("삭제 버튼에 의한");
        checkpropagation(dataid);
      },
      false
    );

    // console.log(menuCardWrapper.dataset);
    // console.log(menuCardWrapper.dataset.id);
  }
  console.log(data);
};

async function openList(arr0) {
  console.log("메뉴리스트에 의한 게시판 리스트 갱신");
  console.log(arr0);
  // console.log(menu.innerHTML);
  console.log(menu);

  await getList(arr0);
}

function preExecute(callback) {
  console.log("메뉴리스트에 의한 기존 찌꺼기 삭제");
  menu.innerHTML = "";
  console.log(menu);
  // console.log(menu.innerHTML);

  callback();
}

function prefer0Time(listarr) {
  console.log(listarr);
  console.log(menu);
  // console.log(menu.innerHTML);
  preExecute(() => {
    // console.log(menu.innerHTML);
    openList(listarr);
  });
}

// function makeOneWrapperMethod() {
//   prefer0Time();
// }

function asyncSetFocus(callback) {
  console.log(menu);
  // console.log(menu.innerHTML);
  preExecute(() => {
    // console.log(menu.innerHTML);
    openList();
  });

  callback();
}

btnvanila.addEventListener("click", setListToShare, false);

function setListToShare() {
  let newitemtoshare = {
    id: Date.now(),
    type: "rtshare",
    fieldContent: vanilainputfield.value,
  };

  console.log(newitemtoshare);
  vanillaListArr.push(newitemtoshare);

  prefer0Time(vanillaListArr);
}

function updatevanillaitem(cutid, aidx) {
  console.log(updatevanila.value);
  // console.log("수정 버튼")
  let newvalueupdate = updatevanila.value;

  console.log(cutid);
  console.log(aidx);
  vanillaListArr[aidx].fieldContent = newvalueupdate;

  prefer0Time(vanillaListArr);
}

function checkpropagation(cutid) {
  console.log(cutid);
  let restArr = vanillaListArr.filter((item) => item.id !== cutid);

  vanillaListArr = restArr;

  prefer0Time(vanillaListArr);
}

// axios.get("http://localhost:3000/getany").then(function (res) {
//   console.log(res);
// });

// window.onload = function () {
//   axios.get("http://localhost:3000/getany").then(function (res) {
//     console.log(res);
//   });
// };
