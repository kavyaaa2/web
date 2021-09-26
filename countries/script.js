fetch("https://restcountries.com/v3/all")
  .then(function (data) {
    return data.json();
  })
  .then(function (jsondata) {
    console.log(jsondata);
    createDisplay(jsondata);
  });

function createDisplay(data) {
  var html = makeCards(data);
  document.getElementById("con").append = html;
}
var modal, btn;

function getWeather(code) {
  const arr = code.split(",");
  var link = "https://api.openweathermap.org/data/2.5/weather?lat=" +arr[0] +"&lon=" +arr[1] +
    "&appid=68364d702adf8588f4e4e1ab3ff1db5a";
  fetch(link)
    .then(function (data) {
      return data.json();
    })
    .then(function (jsondata) {
      console.log(jsondata);
      var div1 = document.createElement("div");
      div1.setAttribute("id", "myModal");
      div1.setAttribute("class", "modal");
      div1.setAttribute("tabindex", "-1");
      div1.setAttribute("role", "dialog");
      var div2 = document.createElement("div");
      div2.setAttribute("class", "modal-dialog");
      div1.setAttribute("role", "document");
      var div3 = document.createElement("div");
      div3.setAttribute("class", "modal-content");
      var div4 = document.createElement("div");
      div4.setAttribute("class", "modal-header");
      div4.setAttribute("class", " text-center");
      div4.innerHTML = "<h1><img src=\"clouds.png\" height=\"45px\" width=\"45px\"> WEATHER </h1>";
      div4.style.fontFamily="'Cinzel', serif";
      div4.style.color="white";
      div3.appendChild(div4);
      var div5 = document.createElement("div");
      div5.setAttribute("class", "modal-body");
      div5.setAttribute("class", "text-center");
      div5.innerHTML =
        "Description: " +
        jsondata.weather[0].description +
        "<br>Temp: " +
        jsondata.main.temp +
        "K" +
        "<br>Feels like: " +
        jsondata.main.feels_like +
        "K" +
        "<br> Visibility: " +
        jsondata.visibility +
        "<br> Wind speed: " +
        jsondata.wind.speed +
        "Kmph";
      div5.style.fontFamily="'Cinzel', serif";
      div5.style.color="white";
      div3.appendChild(div5);
      var div6 = document.createElement("div");
      div6.setAttribute("class", "modal-footer");
      div6.setAttribute("id", "div-close");
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn btn-primary");
      button.setAttribute("data-dismiss", "modal");
      button.setAttribute("data-dismiss", "modal");
      button.setAttribute("data-dismiss", "modal");
      button.setAttribute("id", "modal-close");
      button.innerText = "Close";
      div6.appendChild(button);
      div3.appendChild(div6);
      div2.appendChild(div3);
      div1.appendChild(div2);
      document.getElementById("con").appendChild(div1);

      btn = document.getElementById("modal-close");
      modal = document.getElementById("myModal");
      modal.style.display = "block";
      btn.onclick = function () {
        modal.style.display = "none";
        modal.remove();
      };
    })
    .catch();
}

function makeCards(data) {
  for (let i = 0; i < data.length; i++) {
    var cc = document.createElement("div");
    cc.setAttribute("class", "row mt-5");

    //first column
    if (i < data.length) {
        var col = document.createElement("div");
        col.setAttribute("class", "col-lg-4 col-sm-12 col-md-6 d-flex justify-content-center text-center");
        col.style.padding="2%";
        var div = document.createElement("div");
        div.setAttribute("class", "card text-center text-white bg-secondary");
        div.setAttribute("height", "40px");
        div.setAttribute("width", "30px");
        var div2 = document.createElement("div");
        div2.setAttribute("class", "card-header");
        var h4 = document.createElement("h4");
        h4.innerHTML = data[i].name.common;
        h4.style.fontWeight="bold";
        div2.appendChild(h4);
        div.appendChild(div2);
        var pic = document.createElement("img");
        pic.setAttribute("class", "card-img-top");
        pic.setAttribute("src", data[i].flags[0]);
        pic.setAttribute("class", "card-img-top");
        pic.style.height="190px";
        div.appendChild(pic);
        var text = document.createElement("p");
        text.setAttribute("class", "card-text");
        text.innerHTML ="Capital: " + data[i].capital + "<br>Region: " + data[i].region + "<br>Latlng: " + data[i].latlng + "<br>Country code: " + data[i].cca2;
        text.style.padding="3%";
        div.appendChild(text);
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-primary");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#myModal");
        button.setAttribute("onClick", 'getWeather("' + data[i].latlng + '")');
        button.innerHTML = "Click for Weather";
        button.style.position = "absolute";
        button.style.bottom = "0px";
        button.style.width = "100%";
        button.style.backgroundColor="rgb(79, 82, 85)";
        button.style.fontFamily="'Cinzel', serif";
        div.appendChild(button);
        col.appendChild(div);
        cc.appendChild(col);
      i = i + 1;
    }
    //second column
    if (i < data.length) {
        var col = document.createElement("div");
        col.setAttribute("class", "col-lg-4 col-sm-12 col-md-6 d-flex justify-content-center text-center");
        col.style.padding="2%";
        var div = document.createElement("div");
        div.setAttribute("class", "card text-center text-white bg-secondary");
        div.setAttribute("height", "40px");
        div.setAttribute("width", "30px");
        var div2 = document.createElement("div");
        div2.setAttribute("class", "card-header");
        var h4 = document.createElement("h4");
        h4.innerHTML = data[i].name.common;
        h4.style.fontWeight="bold";
        div2.appendChild(h4);
        div.appendChild(div2);
        var pic = document.createElement("img");
        pic.setAttribute("class", "card-img-top");
        pic.setAttribute("src", data[i].flags[0]);
        pic.setAttribute("class", "card-img-top");
        pic.style.height="190px";
        div.appendChild(pic);
        var text = document.createElement("p");
        text.setAttribute("class", "card-text");
        text.innerHTML ="Capital: " + data[i].capital + "<br>Region: " + data[i].region + "<br>Latlng: " + data[i].latlng + "<br>Country code: " + data[i].cca2;
        text.style.padding="3%";
        div.appendChild(text);
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-primary");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#myModal");
        button.setAttribute("onClick", 'getWeather("' + data[i].latlng + '")');
        button.innerHTML = "Click for Weather";
        button.style.position = "absolute";
        button.style.bottom = "0px";
        button.style.width = "100%";
        button.style.backgroundColor="rgb(79, 82, 85)";
        button.style.fontFamily="'Cinzel', serif";
        div.appendChild(button);
        col.appendChild(div);
        cc.appendChild(col);
      i = i + 1;
    }

    //third column
    if (i < data.length) {
        var col = document.createElement("div");
        col.setAttribute("class", "col-lg-4 col-sm-12 col-md-6 d-flex justify-content-center text-center");
        col.style.padding="2%";
        var div = document.createElement("div");
        div.setAttribute("class", "card text-center text-white bg-secondary");
        div.setAttribute("height", "40px");
        div.setAttribute("width", "30px");
        var div2 = document.createElement("div");
        div2.setAttribute("class", "card-header");
        var h4 = document.createElement("h4");
        h4.innerHTML = data[i].name.common;
        h4.style.fontWeight="bold";
        div2.appendChild(h4);
        div.appendChild(div2);
        var pic = document.createElement("img");
        pic.setAttribute("class", "card-img-top");
        pic.setAttribute("src", data[i].flags[0]);
        pic.setAttribute("class", "card-img-top");
        pic.style.height="190px";
        div.appendChild(pic);
        var text = document.createElement("p");
        text.setAttribute("class", "card-text");
        text.innerHTML ="Capital: " + data[i].capital + "<br>Region: " + data[i].region + "<br>Latlng: " + data[i].latlng + "<br>Country code: " + data[i].cca2;
        text.style.padding="3%";
        div.appendChild(text);
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-primary");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#myModal");
        button.setAttribute("onClick", 'getWeather("' + data[i].latlng + '")');
        button.innerHTML = "Click for Weather";
        button.style.position = "absolute";
        button.style.bottom = "0px";
        button.style.width = "100%";
        button.style.backgroundColor="rgb(79, 82, 85)";
        button.style.fontFamily="'Cinzel', serif";
        div.appendChild(button);
        col.appendChild(div);
        cc.appendChild(col);
    }
    document.getElementById("con").appendChild(cc);
  }
}
