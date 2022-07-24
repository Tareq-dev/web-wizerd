document.querySelector("#files").addEventListener("change", (e) => {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const files = e.target.files;
    const output = document.querySelector("#result");
    output.innerHTML = "";
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image")) continue; 

      const picReader = new FileReader(); 
      
      picReader.addEventListener("load", function (event) {
       
        const picFile = event.target;
        const div = document.createElement("div");
        div.innerHTML = `<img class="thumbnail" src="${picFile.result}" title="${picFile.name}"/>`;
        output.appendChild(div);
      });
      picReader.readAsDataURL(files[i]); 
    }
  } else {
    alert("Your browser does not support File API");
  }
});

var scale = 1,
  panning = false,
  pointX = 0,
  pointY = 0,
  start = { x: 0, y: 0 },
  zoom = document.getElementById("zoom");

function setTransform() {
  zoom.style.transform =
    "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

zoom.onmousedown = function (e) {
  e.preventDefault();
  start = { x: e.clientX - pointX, y: e.clientY - pointY };
  panning = true;
};

zoom.onmouseup = function (e) {
  panning = false;
};

zoom.onmousemove = function (e) {
  e.preventDefault();
  if (!panning) {
    return;
  }
  pointX = e.clientX - start.x;
  pointY = e.clientY - start.y;
  setTransform();
};

zoom.onwheel = function (e) {
  e.preventDefault();
  var xs = (e.clientX - pointX) / scale,
    ys = (e.clientY - pointY) / scale,
    delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
  delta > 0 ? (scale *= 1.1) : (scale /= 1.1);
  pointX = e.clientX - xs * scale;
  pointY = e.clientY - ys * scale;

  setTransform();
};
