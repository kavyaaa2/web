var Table = /** @class */ (function () {
    function Table(num) {
        this.id = num;
        var table = document.createElement("table");
        var div = document.createElement("div");
        div.setAttribute("class", "col-lg-4 tables");
        table.setAttribute("class", "table table-bordered");
        table.style.border = "1.2px solid black";
        table.style.backgroundColor = "white";
        table.setAttribute("id", this.id.toString());
        var th = document.createElement("tr");
        var td = document.createElement("td");
        td.style.backgroundColor = "white";
        td.innerText = "TEAM" + this.id;
        td.style.backgroundColor = "white";
        th.appendChild(td);
        for (var i = 0; i < 6; i++) {
            var td_1 = document.createElement("td");
            td_1.style.padding = "1px";
            td_1.style.backgroundColor = "white";
            td_1.innerText = "B" + (i + 1);
            th.appendChild(td_1);
        }
        var td1 = document.createElement("td");
        td1.innerText = "TOTAL";
        td1.style.backgroundColor = "white";
        th.appendChild(td1);
        table.appendChild(th);
        for (var i = 0; i < 10; i++) {
            var tr = document.createElement("tr");
            var td_2 = document.createElement("td");
            td_2.innerHTML = "Player " + (i + 1);
            td_2.style.width = "40px";
            td_2.style.padding = "1px";
            td_2.style.backgroundColor = "white";
            tr.appendChild(td_2);
            for (var j = 0; j < 7; j++) {
                var td_3 = document.createElement("td");
                td_3.setAttribute("id", this.id.toString() + i.toString() + j.toString());
                td_3.style.backgroundColor = "white";
                td_3.style.padding = "0px";
                tr.appendChild(td_3);
            }
            table.appendChild(tr);
            div.appendChild(table);
        }
        if (num == 2)
            document.getElementById("con").appendChild(div);
        else
            document.getElementById("con").prepend(div);
    }
    return Table;
}());
var current1;
var count1 = 0;
var Timer = /** @class */ (function () {
    function Timer(time) {
        this.time = time;
        this.count = 0;
        var interval = setInterval(this.functime(), 1000);
        this.interval = interval;
    }
    Timer.prototype.functime = function () {
        var _this = this;
        return function () {
            document.getElementById("timer").innerText = _this.time.toString();
            _this.time -= 1;
            if (_this.time == -1) {
                clearInterval(_this.interval);
                count1 += 1;
                document.getElementById(current1).click();
                if (count1 == 2) {
                    console.log("hi");
                    var element1 = document.getElementById("hit1");
                    var element2 = document.getElementById("hit2");
                    var gen = document.getElementById("gen");
                    element1.disabled = true;
                    element2.disabled = true;
                    gen.disabled = false;
                }
            }
        };
    };
    return Timer;
}());
var TeamPlay = /** @class */ (function () {
    function TeamPlay(btn1, btn2, team) {
        this.i = 0;
        this.j = 0;
        this.total = 0;
        this.playerTotal = 0;
        this.c = 0;
        this.t = team.toString();
        this.current = btn1;
        this.notcurrent = btn2;
        console.log("team" + team);
        var button = document.getElementById(btn1);
        button.onclick = this.bat(team, btn1, btn2);
    }
    TeamPlay.prototype.bat = function (team, btn1, btn2) {
        var _this = this;
        return function () {
            if (_this.c == 0) {
                _this.ctime = new Timer(60);
                _this.c = 1;
                current1 = btn1;
                var element2 = document.getElementById(btn2);
                element2.disabled = true;
            }
            if (_this.ctime.time > 0) {
                var run = Math.floor(Math.random() * (6 + 1));
                _this.total += run;
                _this.playerTotal += run;
                document.getElementById("score" + team).innerText =
                    _this.total.toString();
                var td = document.getElementById(team.toString() + _this.i.toString() + _this.j.toString());
                if (td != null) {
                    td.innerText = run.toString();
                    _this.j += 1;
                    if (_this.j == 6 || run == 0) {
                        document.getElementById(team.toString() + _this.i.toString() + 6).innerText = _this.playerTotal.toString();
                        _this.playerTotal = 0;
                        _this.j = 0;
                        _this.i += 1;
                    }
                }
                if (_this.i == 10) {
                    var element1 = document.getElementById(btn1);
                    var element2 = document.getElementById(btn2);
                    _this.playerTotal = 0;
                    element1.disabled = true;
                    element2.disabled = false;
                    _this.ctime.time = 0;
                    _this.ctime.curent = btn1;
                    _this.ctime.notcurent = btn2;
                    alert("ALL OUT!");
                }
            }
            else {
                var element1 = document.getElementById(btn1);
                var element2 = document.getElementById(btn2);
                element1.disabled = true;
                element2.disabled = false;
                if (_this.playerTotal != 0) {
                    document.getElementById(team.toString() + _this.i.toString() + 6).innerText = _this.playerTotal.toString();
                    _this.playerTotal = 0;
                }
                alert("TIME OVER!");
            }
        };
    };
    TeamPlay.prototype.timeout = function () {
        var _this = this;
        return function () {
            console.log("hello from timeout");
            if (_this.playerTotal != 0) {
                document.getElementById(_this.t + _this.i.toString() + 6).innerText =
                    _this.playerTotal.toString();
                _this.playerTotal = 0;
            }
            var element1 = document.getElementById(_this.current);
            var element2 = document.getElementById(_this.notcurrent);
            element1.disabled = true;
            element2.disabled = false;
        };
    };
    return TeamPlay;
}());
var Winner = /** @class */ (function () {
    function Winner() {
        var score1 = parseInt(document.getElementById("score1").textContent);
        var score2 = parseInt(document.getElementById("score2").textContent);
        if (score1 > score2) {
            var max = 0;
            var k = void 0;
            for (var j = 0; j < 9; j++) {
                var text = document.getElementById(1 + (j + 1).toString() + 6).textContent;
                if (text == null)
                    break;
                var num = parseInt(text);
                if (num > max) {
                    max = num;
                    k = j;
                }
            }
            document.getElementById("result").innerHTML =
                "MATCH WON BY: <br>Team 1" +
                    "<br> MAN OF THE MATCH: <br> Player" +
                    (k + 2) +
                    "<br> Score:" +
                    max;
            // alert("Team 1 won")
        }
        else if (score1 < score2) {
            var max = 0;
            var k = void 0;
            for (var j = 0; j < 9; j++) {
                var text = document.getElementById(2 + (j + 1).toString() + 6).textContent;
                if (text == null)
                    break;
                var num = parseInt(text);
                if (num > max) {
                    max = num;
                    k = j;
                }
            }
            document.getElementById("result").innerHTML =
                "<b>MATCH WON BY:<b> <br>Team 2" +
                    "<br> <b>MAN OF THE MATCH:</b> <br> PLAYER " +
                    (k + 2) +
                    "<br> <b>Score: </b>" +
                    max;
        }
        else {
            document.getElementById("tie").innerText = "Team 1 won";
            document.getElementById("result").innerHTML =
                "<b> THE MATCH HAS BEEN DRAWN";
        }
    }
    return Winner;
}());
var Play = /** @class */ (function () {
    function Play() {
        var gen = document.getElementById("gen");
        gen.disabled = true;
        new Table(1);
        new Table(2);
        var t1 = new TeamPlay("hit1", "hit2", 1);
        var t2 = new TeamPlay("hit2", "hit1", 2);
        if (t1.c == 1 && t2.c == 1) {
            console.log("hello");
        }
    }
    return Play;
}());
new Play();
function result() {
    new Winner();
}
