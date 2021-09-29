
class Table{
    id:number;
    element: HTMLElement;
    constructor(num:number){
        this.id=num;
        let table= document.createElement("table")
        let div= document.createElement("div")
        div.setAttribute("class","tables")
        div.style.overflow="auto";
        table.setAttribute("class","table table-bordered")
        table.style.border="1.2px solid black";
        table.style.tableLayout= "fixed";
        table.style.backgroundColor= "white";
        // table.style.borderCollapse= "collapse";
        table.style.fontSize= "1px bold";
        table.style.padding="1px";
        table.style.width="500px";
        table.setAttribute("id",this.id.toString())
        let th= document.createElement("tr")
        th.setAttribute("class","thead-dark")
        let td= document.createElement("td")
        td.innerText="TEAM"+this.id;
        th.appendChild(td)
        for (let i = 0; i < 6; i++) {
            let td= document.createElement("td")
            td.style.padding="1px";
            // td.style.border="1px solid black";
            // td.style.height="2px"
            td.innerText="B"+(i+1);
            th.appendChild(td)
        }
        let td1= document.createElement("td")
        td1.innerText="TOTAL";
        th.appendChild(td1)
        table.appendChild(th)
        for (let i = 0; i < 10; i++) {
            let tr= document.createElement("tr")
            let td= document.createElement("td")
            // td.style.width="70px";
            td.innerHTML="Player "+ (i + 1);
            td.style.width="40px"
            td.style.padding="1px";
            // td.style.border="1px solid black";
            tr.appendChild(td)
            for (let j = 0; j < 7; j++) {
                let td= document.createElement("td")
                td.setAttribute("id",this.id.toString()+i.toString()+j.toString())
                // td.style.width="40px";
                // td.style.height="2px"
                td.style.padding="0px";
                // td.style.border="1px solid black";
                tr.appendChild(td)
            }
            table.appendChild(tr)
            div.appendChild(table)
        }
        if(num==2)
            document.getElementById("con").appendChild(div)
        else
            document.getElementById("con").prepend(div)
    }
}
let current1: string;
let count1=0
class Timer{
    time:number;
    interval;
    count:number;
    current:string;
    notcurrent:string;
    constructor(time:number){
        this.time=time;
        this.count=0;
        let interval=setInterval(this.functime(), 1000);
        this.interval=interval;
    }
    functime():()=>void{
        return()=>{
                document.getElementById("timer").innerText=this.time.toString()
                this.time-=1;
                if (this.time == -1){
                    clearInterval(this.interval);
                    count1+=1;
                    document.getElementById(current1).click();
                    if(count1==2){
                        console.log("hi")
                        let element1 = <HTMLInputElement> document.getElementById("hit1");
                        let element2 = <HTMLInputElement> document.getElementById("hit2");
                        let gen = <HTMLInputElement> document.getElementById("gen");
                        element1.disabled = true;
                        element2.disabled = true;
                        gen.disabled = false;
                    }
                  }
        }
    }
}

class TeamPlay{
    total:number;
    playerTotal:number;
    i:number;
    j:number;
    c:number;
    t:string;
    ctime;
    current:string;
    notcurrent:string;
    constructor(btn1:string,btn2:string,team:number){
        this.i=0;
        this.j=0;
        this.total=0;
        this.playerTotal=0;
        this.c=0;
        this.t=team.toString();
        this.current=btn1;
        this.notcurrent=btn2;
        console.log("team"+team)
        let button=document.getElementById(btn1)
        button.onclick= this.bat(team,btn1,btn2)
    }
    bat(team:number,btn1:string,btn2:string):()=> void {
        return()=>{
            if(this.c==0){
                this.ctime=new Timer(60)
                this.c=1;
                
                current1=btn1;
                let element2 = <HTMLInputElement> document.getElementById(btn2);
                element2.disabled = true;
            }
            if(this.ctime.time>0){
                
                let run=Math. floor(Math. random() * (6 + 1));
                this.total+=run;
                this.playerTotal+=run;
                document.getElementById("score"+team).innerText=this.total.toString();
                let td=document.getElementById(team.toString()+this.i.toString()+this.j.toString())
                if(td!=null){
                    td.innerText=run.toString();
                    this.j+=1;
                    if(this.j==6 || run==0){
                        document.getElementById(team.toString()+this.i.toString()+6).innerText=this.playerTotal.toString();
                        this.playerTotal=0;
                        this.j=0;
                        this.i+=1;
                    }
                }
                if(this.i==10){
                    let element1 = <HTMLInputElement> document.getElementById(btn1);
                    let element2 = <HTMLInputElement> document.getElementById(btn2);
                    this.playerTotal=0;
                    element1.disabled = true;
                    element2.disabled = false;
                    this.ctime.time=0;
                    this.ctime.curent=btn1;
                    this.ctime.notcurent=btn2;
                    alert("ALL OUT!")
                }
            }
            else{
                    let element1 = <HTMLInputElement> document.getElementById(btn1);
                    let element2 = <HTMLInputElement> document.getElementById(btn2);
                    element1.disabled = true;
                    element2.disabled = false;

                if(this.playerTotal!=0){
                    document.getElementById(team.toString()+this.i.toString()+6).innerText=this.playerTotal.toString();
                    this.playerTotal=0;
                }

                    alert("TIME OVER!")
            }
        }
    }
    timeout():()=>void{
        return()=>{
            console.log("hello from timeout")
            if(this.playerTotal!=0){
                document.getElementById(this.t+this.i.toString()+6).innerText=this.playerTotal.toString();
                this.playerTotal=0;
            }
            let element1 = <HTMLInputElement> document.getElementById(this.current);
            let element2 = <HTMLInputElement> document.getElementById(this.notcurrent);
            element1.disabled = true;
            element2.disabled = false;
        }
    }
}
class Winner{
    constructor(){

        let score1=parseInt(document.getElementById("score1").textContent);
        let score2=parseInt(document.getElementById("score2").textContent);

        if(score1>score2){
           
            let max=0
            let k
            for (let j = 0; j < 9; j++) {
                let text=document.getElementById(1+(j+1).toString()+6).textContent
                if(text==null)
                    break;
                let num = parseInt(text)
                if(num>max){
                    max=num
                    k=j
                }
            }
            document.getElementById("result").innerHTML="MATCH WON BY: <br>Team 1"+"<br> MAN OF THE MATCH: <br> Player"+(k+2)+"<br> Score:"+max;
            // alert("Team 1 won")
        }
        else if(score1<score2){
            let max=0
            let k
            for (let j = 0; j < 9; j++) {
                let text=document.getElementById(2+(j+1).toString()+6).textContent
                if(text==null)
                    break;
                let num = parseInt(text)
                if(num>max){
                    max=num
                    k=j
                }
            }
            document.getElementById("result").innerHTML="<b>MATCH WON BY:<b> <br>Team 2"+"<br> <b>MAN OF THE MATCH:</b> <br> PLAYER "+(k+2)+"<br> <b>Score: </b>"+max;
            // alert("Team 2 won")
        }
        else{
            document.getElementById("tie").innerText="Team 1 won";
            document.getElementById("result").innerHTML="<b> THE MATCH HAS BEEN DRAWN"
            // alert("it's a tie")
        }
    }
}



class Play{
    constructor(){
        let gen = <HTMLInputElement> document.getElementById("gen");
        gen.disabled = true;
        new Table(1)
        new Table(2)
        let t1= new TeamPlay("hit1","hit2",1)
        let t2= new TeamPlay("hit2","hit1",2)
        if(t1.c==1 && t2.c==1){
            console.log("hello")
        }
    }
}

new Play()

function result() {
    new Winner()
}
