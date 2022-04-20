const formClothing = document.getElementById('form-clothing');
const nameClothing = document.getElementById('name-clothing');
const brandClothing = document.getElementById('brand-clothing');
const colorClothing = document.getElementById('color-clothing');
const quantityClothing = document.getElementById('quantity-clothing');
const priceClothing = document.getElementById('price-clothing');
const tableClothing = document.getElementById('table-clothing');
const clothingButtonsContainer = document.getElementById(
  'clothing-buttons-container'
);

const addClothing = document.getElementById('add-clothing');
addClothing.addEventListener('click', clothingFormAcction);

let clothingFormMode = 'create';
let clothingIndex = undefined;

let currentClothing = {
  name: '',
  brand: '',
  color: '',
  quantity: '',
  price: '',
};

nameClothing.addEventListener('input', (even) => {
  currentClothing.name = even.target.value;
});

brandClothing.addEventListener('input', (even) => {
  currentClothing.brand = even.target.value;
});

colorClothing.addEventListener('input', (even) => {
  currentClothing.color = even.target.value;
});

quantityClothing.addEventListener('input', (even) => {
  currentClothing.quantity = even.target.value;
});

priceClothing.addEventListener('input', (even) => {
  currentClothing.price = even.target.value;
});

function clothingFormAcction() {
  switch (clothingFormMode) {
    case 'create':
      createClothing();
      break;
    case 'update':
      updateClothing();
      break;
    default:
      break;
  }
}

function changeActionClothingButton() {
  switch (clothingFormMode) {
    case 'create':
      addClothing.innerText = 'Crear';
      addClothing.className = 'btn btn-primary';
      break;
    case 'update':
      addClothing.innerText = 'Actualizar';
      addClothing.className = 'btn btn-info text-white';
      break;
    default:
      break;
  }
}

function cancelClothingActionButton() {
  switch (clothingFormMode) {
    case 'create':
      document.getElementById('cancel-clothing-button').remove();
      break;
    case 'update':
      if (document.getElementById('cancel-clothing-button') !== null) {
        return;
      }
      const cancelClothingButton = document.createElement('button');
      cancelClothingButton.className = 'btn btn-secondary';
      cancelClothingButton.innerText = 'Cancelar';
      cancelClothingButton.id = 'cancel-clothing-button';
      cancelClothingButton.addEventListener('click', () => {
        cancelClothingButton.remove();
        clothingFormMode = 'create';
        formClothing.reset();
        changeActionClothingButton();
      });
      clothingButtonsContainer.appendChild(cancelClothingButton);
      break;
    default:
      break;
  }
}

function createClothing() {
  clothings.push(Object.assign({}, currentClothing));
  listClothings();
  formClothing.reset();
}

function updateClothing() {
  clothings[clothingIndex] = Object.assign({}, currentClothing);
  listClothings();
  formClothing.reset();
  clothingFormMode = 'create';
  changeActionClothingButton();
  cancelClothingActionButton();
}

function deleteClothing(index) {
  clothings = clothings.filter((_, i) => {
    return i !== index;
  });
  listClothings();
}

function loadClothingInForm(index) {
  clothingFormMode = 'update';
  clothingIndex = index;
  currentClothing = Object.assign({}, clothings[index]);
  nameClothing.value = currentClothing.name;
  brandClothing.value = currentClothing.brand;
  colorClothing.value = currentClothing.color;
  quantityClothing.value = currentClothing.quantity;
  priceClothing.value = currentClothing.price;

  changeActionClothingButton();
  cancelClothingActionButton();
}

const modalHtmlElement = document.getElementById('view-clothing');
const boostrapModal = new bootstrap.Modal(modalHtmlElement);

function showClothing(index) {
  const modalTitle = document.querySelector('#view-clothing .modal-title');
  const modalBody = document.querySelector('#view-clothing .modal-body');
  boostrapModal.show();
  modalBody.innerHTML = `
      <ul>
        <li><b>Nombre:</b> ${clothings[index].name}</li>
        <li><b>Marca:</b> ${clothings[index].brand}</li>
        <li><b>Color:</b> ${clothings[index].color}</li>
        <li><b>Cantidad:</b> ${clothings[index].quantity}</li>
        <li><b>Precio:</b> ${clothings[index].price}</li>
    </ul>
      `;
  modalTitle.innerText = clothings[index].name;
}

function listClothings() {
  tableClothing.innerHTML = '';
  clothings.forEach((clothing, index) => {
    const clothingRow = document.createElement('tr');
    clothingRow.innerHTML = `
        <th scope="row">${index + 1}</th>
            <td>${clothing.name}</td>
            <td>${clothing.brand}</td>
            <td>${clothing.color}</td>
            <td>${clothing.quantity}</td>
            <td>${clothing.price}</td>
            <td>
                <button
                    type="button"
                    class="btn btn-primary"
                    title="Editar"
                    onclick="loadClothingInForm(${index})">
                    <i class="fas fa-pen"></i>
                </button>
                <button
                    type="button"
                    class="btn btn-info text-white"
                    title="Ver registro"
                    onclick="showClothing(${index})">
                    <i class="fas fa-eye"></i>
                </button>
                <button
                    type="button"
                    class="btn btn-danger"
                    title="Eliminar"
                    onclick="deleteClothing(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
    tableClothing.appendChild(clothingRow);
  });
}
listClothings();
