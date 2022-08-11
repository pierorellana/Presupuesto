const ingresos = [
    new Ingreso('Salario', 2100),
    new Ingreso('Venta casa', 50000)
];

const egresos = [
    new Egreso('Comida', 700),
    new Egreso('Ropa', 400)
];

let cargar = () => {
    cargarHeader();
    cargarIngreso();
    cargarEgreso();
}

let totalIngreso = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgreso = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarHeader = () => {
    let presupuesto = totalIngreso() - totalEgreso();
    let porcentajeEgreso = totalEgreso() / totalIngreso();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngreso());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgreso());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimunFractionDigits: 2 });
}

const cargarIngreso = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento-valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento-eliminar">
                <button class="eliminar-btn"><ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon></button>
            </div>
    </div>
</div>`;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let eliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(eliminar, 1);
    cargarHeader();
    cargarIngreso();
}

const cargarEgreso = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento-valor">${formatoMoneda(egreso.valor)}</div>
            <div class="elemento-porcentaje">${formatoPorcentaje(egreso.valor / totalEgreso())}</div>
            <div class="elemento-eliminar">
                <button class="eliminar-btn"><ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon></button>
            </div>
    </div>
</div>`;
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let eliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(eliminar, 1);
    cargarHeader();
    cargarEgreso();
}

let agregarDato = () => {
    let forms = document.forms['forms'];
    let tipo = forms['tipo'];
    let descripcion = forms['descripcion'];
    let valor = forms['valor'];
    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarHeader();
            cargarIngreso();
        } else if (tipo.value === 'egreso') {
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarHeader();
            cargarEgreso();
        }
    }
}