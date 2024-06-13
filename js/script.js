const containerModal = document.querySelector(".qr-container");
const qrInput = document.getElementById("qr-input");
const qrModal = document.querySelector(".qr-content");
const qr = document.querySelector(".qr");
const btnDownload = document.querySelector(".btn-download");
const btnShare = document.querySelector(".btn-share");
const btnClose = document.querySelector(".btn-close");
const btnQr = document.getElementById("btn-qr");

let qrcode;
let patternUrl =
	/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
let file = {};

btnDownload.addEventListener("click", () => {
	let canvas = qr.querySelector("canvas");
	console.log(canvas.toDataURL());
	let urlImage = canvas
		.toDataURL("image/png")
		.replace("image/png", "image/octet-stream");

	btnDownload.setAttribute("href", urlImage);
	btnDownload.setAttribute("download", "QRcode.png");
});

qrInput.addEventListener("input", (e) => {
	if (patternUrl.test(e.target.value)) {
		qrInput.classList.remove("error");
	} else {
		qrInput.classList.add("error");
	}
});

btnQr.addEventListener("click", () => {
	qr.innerHTML = "";
	if (qrInput.value && !qrInput.classList.contains("error")) {
		containerModal.style.display = "flex";
		qrcode = new QRCode(qr, {
			text: qrInput.value,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H,
		});
	} else {
		qrInput.classList.add("error");
	}
});

const dataURLtoFile = (dataurl, filename) => {
	var arr = dataurl.split(","),
		mimeType = arr[0].match(/:(.*?);/)[1],
		decodedData = atob(arr[1]),
		lengthOfDecodedData = decodedData.length,
		u8array = new Uint8Array(lengthOfDecodedData);
	while (lengthOfDecodedData--) {
		u8array[lengthOfDecodedData] = decodedData.charCodeAt(lengthOfDecodedData);
	}
	return new File([u8array], filename, { type: mimeType });
};

const shareFile = () => {
	let text = "image";
	let canvas = qr.querySelector("canvas");
	let file = dataURLtoFile(canvas.toDataURL(), "qrcode.jpg");
	
	if (navigator.canShare && navigator.canShare({ files: [file] })) {
		navigator
			.share({
				files: [file],
				title: text,
				text: text,
			})
			.then(() => console.log("Share was successful."))
			.catch((error) => console.log("Sharing failed", error));
	} else {
		console.log(`Your system doesn't support sharing files.`);
	}
};

btnShare.addEventListener("click", shareFile);

btnClose.addEventListener("click", () => {
	containerModal.style.display = "none";
});

window.addEventListener("click", (event) => {
	if (event.target == containerModal) {
		containerModal.style.display = "none";
	}
});
