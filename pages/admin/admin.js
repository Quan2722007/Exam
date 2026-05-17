const fileImg = document.querySelector("#fileImg");
fileImg.addEventListener("change", encodeImageFileAsURL);

function encodeImageFileAsURL(element = document.querySelector("#import-product-image")) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log(reader.result);
        return reader.result;
    };
    reader.readAsDataURL(file);
}
