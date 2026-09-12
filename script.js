let historybtn = document.getElementById("history-btn");
let sidebar = document.getElementsByClassName("sidebar")[0];
let buttons = document.getElementsByClassName("btn");
let screen = document.getElementsByClassName("screen")[0];
let screentext = screen.getElementsByTagName("input")[0];
let clearhistorybtn = document.querySelector(".clrhistorybtn");

historyarr = JSON.parse(localStorage.getItem("glhistory")) ?? [];

historyarr.forEach(hisitem => {
    sidebar.getElementsByClassName("history-items")[0].innerHTML += `
                <div class="single-history-item" onclick="renderhistoryonscreen(this)" data-dltkey='${hisitem.key}'>
                    <p>${hisitem.evalexp}</p>
                </div>
                `;
});

let isError = false;

for (const butn of buttons) {
    butn.addEventListener("click", () => {
        if (isError) {
            screentext.value = "";
            isError = false;
        }
        if (butn.id === "history-btn") {
            sidebar.classList.toggle("animate-sidebar");
            historybtn.getElementsByClassName("historyicn")[0].classList.toggle("rotated");
        }
        else if (butn.innerText === "=") {
            try {


                let evalexp = screentext.value;
                let randkey = crypto.randomUUID();
                historyarr.push({ evalexp, key: randkey });
                localStorage.setItem("glhistory", JSON.stringify(historyarr));
                sidebar.getElementsByClassName("history-items")[0].innerHTML += `
            <div class="single-history-item" onclick="renderhistoryonscreen(this)" data-dltkey='${randkey}'>
                <p>${evalexp}</p>
            </div>
            `;
                if (evalexp.includes("÷")) {
                    evalexp = evalexp.replaceAll("÷", "/");
                }
                if (evalexp.includes("×")) {
                    evalexp = evalexp.replaceAll("×", "*");
                }
                screentext.value = eval(evalexp);
            } catch (error) {
                screentext.value = 'ERROR';
                isError = true;
            }
        }
        else if (butn.innerText === "AC") {
            screentext.value = "";
        }
        else if (butn.innerText === "ON") {
            screen.classList.remove("off");
            screentext.disabled = false;
            for (const butn of buttons) {
                butn.classList.remove("off");
            }
        }
        else if (butn.innerText === "OFF") {
            screen.classList.add("off");
            screentext.disabled = true;
            screentext.value = "";
            for (const butn of buttons) {
                butn.classList.add("off");
            }
            document.getElementById("onbtn").classList.remove("off");
        }
        else if (butn.id === "backspacebtn") {
            screentext.value = screentext.value.slice(0, -1);
        }
        else if (butn.id === "divide") {
            screentext.value += "÷";
        }
        else if (butn.id === "multiply") {
            screentext.value += "×";
        }
        else {
            screentext.value += butn.innerText;
        }
    })
}


function renderhistoryonscreen(e) {
    screentext.value = e.querySelector("p").innerText;
    e.remove();
    historyarr = historyarr.filter(h => h.key !== e.getAttribute("data-dltkey"));
    localStorage.setItem("glhistory", JSON.stringify(historyarr));
    sidebar.classList.toggle("animate-sidebar")
    historybtn.getElementsByClassName("historyicn")[0].classList.toggle("rotated");
}

clearhistorybtn.addEventListener("click", () => {
    localStorage.removeItem("glhistory");

    historyarr = [];

    sidebar.getElementsByClassName("history-items")[0].innerHTML = "";
});

