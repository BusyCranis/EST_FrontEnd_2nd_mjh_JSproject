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

        // console.log("삭제 버튼에 의한");
        checkpropagation(dataid);
      },
      false
    );
  }
  console.log(data);
};

async function openList(arr0) {
  console.log(arr0);
  console.log(menu);

  await getList(arr0);
}

function preExecute(callback) {
  menu.innerHTML = "";

  console.log(menu);
  callback();
}

function prefer0Time(listarr) {
  console.log(listarr);
  console.log(menu);
  preExecute(() => {
    openList(listarr);
  });
}

function asyncSetFocus(callback) {
  console.log(menu);
  preExecute(() => {
    openList();
  });

  callback();
}

btnvanila.addEventListener("click", setListToShare, false);

function setListToShare() {
  let newitemtoshare = {
    id: Date.now(),
    type: "rtshare",
    // fieldContent: ,
  };

  console.log(newitemtoshare);
  vanillaListArr.push(newitemtoshare);

  prefer0Time(vanillaListArr);
}

function updatevanillaitem(cutid, aidx) {
  console.log(updatevanila.value);
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
