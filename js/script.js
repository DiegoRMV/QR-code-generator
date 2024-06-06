const containerModal = document.querySelector(".qr-container");
const qrInput = document.getElementById("qr-input");
const qrModal = document.querySelector(".qr-content");
const qr = document.querySelector(".qr");
const btnDownload = document.querySelector(".btn-download");
const btnShare = document.querySelector(".btn-share");
const btnClose = document.querySelector(".btn-close");
const btnQr = document.getElementById("btn-qr");

let qrcode;
let file = {};

console.log(qrModal);

btnShare.addEventListener("click", () => {
	if (navigator.share) {
		try {
			navigator.share(file);
		} catch (error) {
			console.log(error);
		}
	} else {
		alert("no soportado");
	}
});

btnClose.addEventListener("click", () => {
	containerModal.style.display = "none";
});

btnDownload.addEventListener("click", () => {
	let canvas = qr.querySelector("canvas");
	let urlImage = canvas
		.toDataURL("image/png")
		.replace("image/png", "image/octet-stream");

	btnDownload.setAttribute("href", urlImage);
	btnDownload.setAttribute("download", "QRcode.png");
});

btnQr.addEventListener("click", () => {
	containerModal.style.display = "flex";
	qr.innerHTML = "";
	if (qrInput.value) {
		qrcode = new QRCode(qr, {
			text: qrInput.value,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H,
		});
		let canvas = qr.querySelector("canvas");
		let urlImage = canvas.toDataURL("image/png");
		let fl = new File([urlImage], "image.png", { type: "image/png" });
		file["title"] = "QRcode";
		file["text"] = qrInput.value;
		file["url"] = urlImage;
		file["files"] = [fl];
	}
});

window.addEventListener("click", (event) => {
	if (event.target == containerModal) {
		containerModal.style.display = "none";
	}
});
