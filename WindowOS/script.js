
function fullscreen() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'f' || event.key === 'F') {
            toggleFullscreen();
        }
    });

    function toggleFullscreen() {
        const elem = document.documentElement;

        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        }
    }

}
fullscreen();

function updateClock() {
    const clock = document.getElementById("taskbar_clock");
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    clock.innerHTML = `${hours}:${minutes} ${ampm}<br>${day}-${month}-${year}`;
}
updateClock();
setInterval(updateClock, 1000);


document.addEventListener("click", (e) => {
    const img = e.target;

    if (img.tagName !== "IMG") return;

    if (img.classList.contains("chrome")) return;

    e.preventDefault();

    showComingSoon();
});

function showComingSoon() {
    const msg = document.createElement("div");
    msg.textContent = "These features aren't available right now. Coming soon. Currently, only Chrome works.";

    msg.style.position = "fixed";
    msg.style.bottom = "30px";
    msg.style.right = "30px";
    msg.style.padding = "12px 18px";
    msg.style.background = "rgba(0,0,0,0.85)";
    msg.style.color = "#fff";
    msg.style.fontSize = "14px";
    msg.style.borderRadius = "6px";
    msg.style.zIndex = "9999";
    msg.style.fontFamily = "sans-serif";

    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
}


const chromeIcon = document.querySelector("#test");

let zIndexCounter = 1000;

chromeIcon.addEventListener("click", () => {
    createWindow();
});

function createWindow() {
    const windowEl = document.createElement("div");
    const header = document.createElement("div");
    const title = document.createElement("span");
    const controls = document.createElement("div");
    const closeBtn = document.createElement("button");
    const minBtn = document.createElement("button");
    const content = document.createElement("div");

    windowEl.className = "app-window";
    header.className = "window-header";
    content.className = "window-content";

    title.textContent = "Chrome";
    minBtn.textContent = "—";
    closeBtn.textContent = "✕";

    controls.append(minBtn, closeBtn);
    header.append(title, controls);
    windowEl.append(header, content);
    document.body.appendChild(windowEl);

    windowEl.style.zIndex = ++zIndexCounter;

    closeBtn.onclick = () => windowEl.remove();

    minBtn.onclick = () => {
        content.style.display =
            content.style.display === "none" ? "block" : "none";
    };

    windowEl.addEventListener("mousedown", () => {
        windowEl.style.zIndex = ++zIndexCounter;
    });

    dragWindow(windowEl, header);
}

function dragWindow(windowEl, header) {
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - windowEl.offsetLeft;
        offsetY = e.clientY - windowEl.offsetTop;

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", stop);
    });

    function move(e) {
        if (!isDragging) return;

        windowEl.style.left = e.clientX - offsetX + "px";
        windowEl.style.top = e.clientY - offsetY + "px";
    }

    function stop() {
        isDragging = false;
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", stop);
    }
}
