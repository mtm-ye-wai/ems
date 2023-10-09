const constLogo = localStorage.getItem("ems_main_logo");
const url = CONTEXT_PATH + "/resources/img/logo_green.png";
if (constLogo == null || typeof constLogo == "undefined" || constLogo == "data:,") {
	getBase64(url, function(data) {
		localStorage.setItem("ems_main_logo", data);
	});
}
addProgress();

function addProgress() {
    var title = progressMessage == "null" || progressMessage == "undefined" || progressMessage == "" ? "Loading please wait":progressMessage;
    var logo = localStorage.getItem("ems_main_logo");
    if (document.querySelector("head").dataset['attr'] == "show-progress") {
        var body = document.createElement('body');
        body.id = "temp-id";
        document.querySelector("html").appendChild(body);
        var style = document.createElement("style");
        style.innerHTML = `@keyframes loading{
                        0%{width: 0%;}
                        10%{width: 20%;}
                        20%{width: 40%;}
                        30%{width: 60%;}
                        40%{width: 80%;}
                        50%{width: 100%;}
                        60%{left: 20%;}
                        70%{left: 40%;}
                        80%{left: 60%;}
                        90%{left: 80%;}
                        100%{left: 100%;}
                    }`;
        body.appendChild(style);
        createProgress(title, logo, body);

        //offline handler
        window.addEventListener('offline', () => {
            var lab = document.getElementById("prog-lab");
            if (lab != null) {
                lab.style.color = "#969696";
                lab.innerHTML = `Opps! you have lost network connection!`;
                document.getElementById("prog-logo").innerHTML = offlineSVG;
                document.getElementById("prog-child").style.animation = "none";
                document.getElementById("prog-child").style.width = "100%";
                document.getElementById("prog-child").style.backgroundColor = "#969696";
            }
        });

		//onready
		document.addEventListener('readystatechange', event => {
			if (event.target.readyState === "complete") {
				document.querySelector("html").removeChild(document.getElementById("temp-id"));
				document.querySelector("body").classList.remove("show-progress");
				document.querySelector("head").removeAttribute("data-attr");
			}
		});
	}
}

function createProgress(title, logo, container) {
    var progressScreen = createProgressScreen(title, logo);
    container.appendChild(progressScreen);
}
function createProgressScreen(title, logo) {
    var prog = document.createElement("div");
    prog.id = "progress-screen";
    prog.setAttribute("style", `position: fixed;
                                width: 100%;
                                height: 100%;
                                top: 0;
                                left: 0;
                                z-index: 999;
                                line-height: 1.6;
                                background-color: #edfaf6;
                                background-image: url(../resources/img/img_bg.png);`);

    var progbox = document.createElement("div");
    progbox.id = "progress-box";
    progbox.setAttribute("style", `position: absolute;
    width: 35%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);`);

    var proglogo = document.createElement("div");
    proglogo.id = "prog-logo"
    proglogo.innerHTML = `<img alt="Logo" src="${logo}" style="width: 100%;
    height: 100%;
    margin-bottom: 30px;"/>`;
    proglogo.setAttribute("style", `width: 100px;
    margin: 0px auto;`);

    var lab = document.createElement("h4");
    lab.id = "prog-lab";
    lab.innerHTML = title;
    lab.setAttribute("style", `margin-bottom: 20px;text-align: center;font-size: 16px;`)

    var progbar = document.createElement("div");
    progbar.id = "prog-bar"
    progbar.innerHTML = `<div id="prog-child" style="width: 0%;
    height: 100%;
    position: absolute;
    border-radius: 5px;
    top: 0;
    left: 0;
    animation: loading 2s infinite linear;
    background: #00c292;"></div>`;

    progbar.setAttribute("style", `width: 80%;
    margin: 10px auto;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    padding: 2px;
    background-color: #d9e3e0;`);

    prog.appendChild(progbox);
    progbox.appendChild(proglogo);
    progbox.appendChild(lab);
    progbox.appendChild(progbar);
    return prog;
}
const offlineSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" style="width: 100%;height: 100%;margin-bottom: 30px;vertical-align: middle;fill: #969696;overflow: hidden;" viewBox="0 0 1478 1024" version="1.1"><path d="M17.670255 298.113459C-5.779929 321.557163-5.779929 359.496048 17.670255 382.946232 41.126918 406.389936 79.072283 406.389936 102.522467 382.946232 453.38102 32.184875 1024.168473 32.184875 1375.020547 382.946232 1398.47073 406.389936 1436.416096 406.389936 1459.872759 382.946232 1483.322943 359.496048 1483.322943 321.557163 1459.872759 298.113459 1062.204555-99.347394 415.338459-99.347394 17.670255 298.113459ZM581.161519 872.069505C581.161519 955.975676 649.205283 1024 733.137372 1024 817.075941 1024 885.113225 955.975676 885.113225 872.069505 885.113225 788.156855 817.075941 720.132531 733.137372 720.132531 649.205283 720.132531 581.161519 788.156855 581.161519 872.069505ZM1185.190045 487.380223C1056.884687 487.380223 952.826521 591.386551 952.826521 719.678949 952.826521 847.971347 1056.871728 951.977675 1185.190045 951.977675 1313.521322 951.977675 1417.547089 847.990787 1417.547089 719.678949 1417.547089 591.41247 1313.521322 487.380223 1185.190045 487.380223ZM1321.037822 811.607039C1326.681676 817.218495 1330.148338 824.961786 1330.148338 833.547443 1330.148338 850.718758 1316.262252 864.604843 1299.090938 864.604843 1290.563598 864.604843 1282.75551 861.131702 1277.144054 855.487847L1185.183565 763.605115 1093.287874 855.520246C1087.63106 861.157621 1079.86833 864.630762 1071.282672 864.630762 1054.156716 864.630762 1040.238232 850.744677 1040.238232 833.566882 1040.238232 824.981225 1043.711373 817.263853 1049.322829 811.645918L1141.276838 719.672469 1049.342268 627.770298C1043.717853 622.139403 1040.257671 614.376673 1040.257671 605.797495 1040.257671 588.6521 1054.169676 574.746575 1071.321551 574.746575 1079.881289 574.746575 1087.644019 578.206757 1093.274914 583.831172L1185.177086 675.752783 1277.131095 583.850612C1282.742551 578.239156 1290.550639 574.766014 1299.077978 574.766014 1316.216894 574.766014 1330.141858 588.6521 1330.141858 605.823414 1330.141858 614.402592 1326.668717 622.171802 1321.024862 627.789737L1229.129171 719.66599 1321.037822 811.607039ZM1173.643146 404.990312C1191.235644 404.990312 1208.458796 406.571369 1225.183008 409.584449 919.229063 165.246363 470.591213 184.633749 187.37468 467.772526 163.924496 491.21623 163.924496 529.155115 187.37468 552.598819 210.831343 576.042523 248.776708 576.042523 272.226892 552.598819 481.243908 343.640121 796.612918 304.418247 1045.571059 434.920237 1084.157918 415.772602 1127.636983 404.990312 1173.643146 404.990312ZM940.067911 518.26915C745.46184 440.408578 514.342426 480.116433 356.988388 637.425113 333.531725 660.875297 333.531725 698.807702 356.988388 722.257886 380.438572 745.70159 418.383937 745.70159 441.834121 722.257886 563.024723 601.106163 740.465959 569.666458 890.912593 627.886934 899.26498 587.479267 916.339098 550.259633 940.067911 518.26915Z"/></svg>`;

function getBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
