
const idInsumo = document.getElementById(`idInsumo`);
const formSelect = document.getElementById(`insumoId`);
const formInput = document.getElementById(`searchValue`);
const alternativeText = document.getElementById(`alternativeText`);
const formInputQuantity = document.getElementById(`insumoQuantity`);
const formShowInfo = document.getElementById(`spaceQuantityForInsumo`);
const goAction = document.querySelectorAll(`.goAction`);
// const formUpdateQuantity = document.getElementById(`formUpdateQuantity`);

const urlUnique = `/api/insumo/`;
const urlAll = `/api/insumos/`;

formSelect.addEventListener(`change`, async (e) => {
    const id = e.target.value;
    await HandleInner(id);
});

formInput.addEventListener(`keyup`, async (e) => {
    const param = formInput.value;
    if(param == ``) return;
    const result = await FindAllInsumos(param);
    if (result.length == 0) {
        formSelect.innerHTML = `<option value="">No se hay resultados para: "${param}"</option>`;
        return;
    }
    // print in select
    let template = ``;
    template += `
        <option value="">Resultados para: "${param}"</option>
    `
    result.forEach(item => {
        template += `
            <option value="${item.id}">${item.name}</option>
        `
    })
    formSelect.innerHTML = ``;
    formSelect.innerHTML = template;

    return;
});

goAction.forEach(element => {
    const id = element.getAttribute('data-id');

    element.addEventListener(`click`, async (e) => {
        await HandleInner(id);
    });
})

const HandleInner = async (id) => {
    const result = await FindOneInsumo(id);

    idInsumo.value = id;

    formInputQuantity.value = result.quantity;
    alternativeText.innerHTML = `Actualizar <b>${result.name}</b>`;

    searchValue.value = result.name

    // formShowInfo.innerHTML = `<li>Actual: ${result.quantity}</li><li>Mínimo: ${result.minStock}</li><li>Máximo: ${result.maxStock}</li>`;
}

const FindOneInsumo = async (id) => {
    const result = await fetch(`/api/insumo/?id=${id}`);
    const json = await result.json();
    return json.body;
}

const FindAllInsumos = async (param) => {
    const result = await fetch(`/api/insumos/?param=${param}`);
    const json = await result.json();
    return json.body;
}
