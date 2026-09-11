let historybtn = document.getElementById("history-btn");
let sidebar = document.getElementsByClassName("sidebar")[0];
let buttons = document.getElementsByClassName("btn");
let screen = document.getElementsByClassName("screen")[0];
let screentext = screen.getElementsByTagName("input")[0];


historyarr = JSON.parse(localStorage.getItem("glhistory")) ?? [];


historyarr.forEach(hisitem => {
    sidebar.innerHTML += `
            <div class="single-history-item" onclick="renderhistoryonscreen(this)" data-dltkey='${hisitem.key}'>
                <p>${hisitem.evalexp}</p>
            </div>
            `;
});

for (const butn of buttons) {
    butn.addEventListener("click", () => {
        if (butn.id === "history-btn") {
            sidebar.classList.toggle("animate-sidebar");
            historybtn.getElementsByClassName("historyicn")[0].classList.toggle("rotated");
        }
        else if (butn.innerText === "=") {
            let evalexp = screentext.value;
            let randkey = crypto.randomUUID();
            historyarr.push({ evalexp, key: randkey });
            localStorage.setItem("glhistory", JSON.stringify(historyarr));
            sidebar.innerHTML += `
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
        }
        else if (butn.innerText === "AC") {
            screentext.value = "";
        }
        else if (butn.innerText === "ON") {
            screen.classList.remove("off");
            screentext.disabled = false;
        }
        else if (butn.innerText === "OFF") {
            screen.classList.add("off");
            screentext.disabled = true;
            screentext.value = "";
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
    console.log(e.getAttribute("data-dltkey"));
    historyarr = historyarr.filter(h => h.key !== e.getAttribute("data-dltkey"));
    localStorage.setItem("glhistory", JSON.stringify(historyarr));
    sidebar.classList.toggle("animate-sidebar")
    historybtn.getElementsByClassName("historyicn")[0].classList.toggle("rotated");
}