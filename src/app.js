const root = document.querySelector(".container");
const output = document.querySelector("#output");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

let objectURL = "";

root.querySelector("input").addEventListener("change", (e) => {
  const { files } = e.target;

  if (!files || files.length === 0) return;

  const file = files[0];

  const reader = new FileReader();

  reader.addEventListener("load", (ev) => {
    if (ev.target !== null) {
      const { result } = ev.target;

      if (typeof result === "string") {
        const img = document.createElement("img");

        img.addEventListener("load", () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.filter = "grayscale(1)";

          ctx.drawImage(img, 0, 0);

          const { width, height } = canvas;

          ctx.beginPath();
          ctx.moveTo(width * 0.8, height);
          ctx.lineTo(width, height * 0.8);
          ctx.lineTo(width, height * 0.7);
          ctx.lineTo(width * 0.7, height);
          ctx.closePath();
          ctx.fill();

          canvas.toBlob((blob) => {
            if (blob) {
              if (objectURL !== "") URL.revokeObjectURL(objectURL);
              objectURL = URL.createObjectURL(blob);

              output.innerHTML = `<img src="${objectURL}" alt="">`;
            }
          });
        });

        img.src = result;
      }
    }
  });

  reader.readAsDataURL(file);
});

const documentFragment = document.createDocumentFragment();
