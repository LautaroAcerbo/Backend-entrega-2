const socket = io();

let productID = document.getElementById("productID");
let button = document.getElementById("btn");
let productTitle = document.getElementById("productTitle");
let productDescription = document.getElementById("productDescription");
let productCode = document.getElementById("productCode");
let productPrice = document.getElementById("productPrice");
let productStock = document.getElementById("productStock");

let buttonSubmit = document.getElementById("btn");

buttonSubmit.addEventListener("click", () => {
  if (
    productID.value.trim().length > 0 &&
    productTitle.value.trim() > 0 &&
    productDescription.value.trim() > 0 &&
    productCode.value.trim() > 0 &&
    productPrice.value.trim() > 0 &&
    productStock.value.trim() > 0
  ) {
    socket.emit("message", {
      id: productID.value,
      title: productTitle.value,
      description: productDescription.value,
      code: productCode.value,
      price: productPrice.value,
      stock: productStock.value,
    });
    // console.log(productID.value);
    productID.value = "";
    productTitle.value = "";
    productDescription.value = "";
    productCode.value = "";
    productPrice.value = "";
    productStock.value = "";
  }
});

//--------------------------------------------------------------------

socket.on("infoProduct", (productList) => {
  let log = document.getElementById("infoProduct");
  log.innerHTML = ""; // Limpiar contenido previo

  // Crear ul
  let ul = document.createElement("ul");

  // Iterar sobre cada producto
  productList.forEach((product) => {
    // Crear li
    let li = document.createElement("li");
    li.innerHTML = `ID: ${product.id}, Title: ${product.title}, Description: ${product.description}, Code: ${product.code}, Price: ${product.price}, Stock: ${product.stock}`;

    // Crear el botón de eliminar
    let button = document.createElement("button");
    button.innerHTML = "Eliminar";

    button.addEventListener("click", () => {
      ul.removeChild(li);
    });

    // Agregar boton a li
    li.appendChild(button);

    // Agregar ul a la li
    ul.appendChild(li);
  });
  // Agregar la lista desordenada al contenedor
  log.appendChild(ul);
});
