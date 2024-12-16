class Dado {
    constructor(caras, veces = 1) {
        this.caras = caras
        this.veces = veces
    }

    tirarDado() {
        document.getElementById("resultado_total").innerHTML = ""

        let resultadoTirada = Math.floor(Math.random() * this.caras) + 1
        let modificador = parseInt(document.getElementById("mods").value) || 0
        let resultadoFinal = resultadoTirada + modificador

        let menor = document.getElementById("menor").checked
        let mayor = document.getElementById("mayor").checked
        let valorObjetivoElement = document.getElementById("valor_objetivo")
        let valorObjetivo = valorObjetivoElement && valorObjetivoElement.value !== "" ? 
        parseInt(valorObjetivoElement.value) : null
        
        // Verificar si el usuario ingresó un valor objetivo pero no seleccionó "mayor" o "menor"
        if ((valorObjetivo !== null && valorObjetivo > 0 && !mayor && !menor) || 
            ((mayor || menor) && (valorObjetivo === null || valorObjetivo <= 0))) {
            alert("No olvides eleccionar si la tirada debe ser mayor o menor que el número objetivo.");
            return // Detener ejecución si no marcó ninguna opción
        }

        let resultadoHTML = ` 
        <div class="resultado_dado"> 
        <p class="resultado_header">Resultado del D${this.caras}:</p> 
        <p class="resultado_valores">${resultadoTirada} ${modificador >= 0 ? '+' : '-'} ${Math.abs(modificador)} = ${resultadoTirada + modificador}</p>`

        if (valorObjetivo !== null && valorObjetivo > 0) {
            let exito = (mayor && resultadoFinal >= valorObjetivo) || 
                        (menor && resultadoFinal <= valorObjetivo);
    
            resultadoHTML += `<p class="resultado_estado">${exito ? "¡Exitosa!" : "¡Fallida!"}</p>`;
        }

        resultadoHTML += `</div>`
        
        document.getElementById("resultado_total").innerHTML = resultadoHTML
    
        //Deslizar hacia abajo
        document.getElementById("resultado_total").scrollIntoView({ behavior: 'smooth', block: 'center' })

    }

    tirarDados() {
        let checkbox = document.getElementById("sumatoria")
        let resultados = [];
        let suma = 0
        let modificador = parseInt(document.getElementById("mods").value) || 0
    
         // Obtener valores compartidos
        const { menor, mayor, valorObjetivo } = obtenerValoresCompartidos()

        let detalleExitos = []
    
        if (this.veces > 0) {
            for (let index = 0; index < this.veces; index++) {
                let resultado = Math.floor((Math.random() * this.caras) + 1)
                resultado += modificador
                resultados.push(resultado)
                suma += resultado

                if (valorObjetivo !== null && valorObjetivo > 0) {
                    let exito = (mayor && resultado >= valorObjetivo) || 
                                (menor && resultado <= valorObjetivo)
                    
                    // Guardar el estado de la tirada
                    detalleExitos.push(`Tirada ${index + 1}: ${exito ? "¡Exitosa!" : "¡Fallida!"} (${resultado})`)
                }
            }

            // Construir HTML para mostrar resultados con todas las tiradas
            let resultadoHTML = `
            <div class="resultado-dado">
                <p class="resultado_header">Resultados del D${this.caras}:</p>
                <p class="resultado_valores">${resultados.join(", ")}</p>`

            if (checkbox.checked) {
                resultadoHTML += `
                    <p class="resultado_suma">En total suman: ${suma}</p>`
                // Imprimir estado solo si los parámetros son válidos
                if (valorObjetivo !== null && valorObjetivo > 0 && (mayor || menor)) {
                    resultadoHTML += `
                        <p class="resultado_estado">Tu tirada fue: ${(mayor && suma >= valorObjetivo) || (menor && suma <= valorObjetivo) ? "¡Exitosa!" : "¡Fallida!"}</p>`
                }    
            } else if (detalleExitos.length > 0) {
                resultadoHTML += `
                    <p class="resultado_detallado">Recuento de tiradas:</p>
                    <p class="resultado_exitos">${detalleExitos.join("<br>")}</p>`
            }

            resultadoHTML += `</div>`

            document.getElementById("resultado_total").innerHTML += resultadoHTML

            document.getElementById("resultado_total").scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }
}

// Crear variables de los dados
let D4 = new Dado(4)
let D6 = new Dado(6)
let D8 = new Dado(8)
let D10 = new Dado(10)
let D12 = new Dado(12)
let D20 = new Dado(20)
let D100 = new Dado(100)

// Función para validar los valores de los inputs 
function validarInputs() { 
    const valorObjetivo = document.getElementById("valor_objetivo")
    const inputsCantidad = document.querySelectorAll('input[name="n_veces"]')
    // Validar el input de número objetivo 
    if (parseFloat(valorObjetivo.value) < 0) { 
        valorObjetivo.value = 0
    } 

    // Validar los inputs de cantidad 
    inputsCantidad.forEach(input => { 
        if (parseFloat(input.value) < 0) { 
            input.value = 0
        } 
    });
} 

// Asignar validaciones a los eventos de cambio y entrada 
document.getElementById("valor_objetivo").addEventListener("change", validarInputs) 
document.getElementById("valor_objetivo").addEventListener("input", validarInputs)

const inputsCantidad = document.querySelectorAll('input[name="n_veces"]')
inputsCantidad.forEach(input => { 
    input.addEventListener("change", validarInputs)
    input.addEventListener("input", validarInputs)
});

// Función para mostrar u ocultar los inputs de cantidad 
function toggleCantidadInputs() { 
    const inputsCantidad = document.querySelectorAll('.input_veces') 
    const checkboxTiradasMultiples = document.getElementById('tiradas_multiples')
    const diceRollButton = document.getElementById('dice_roll') 
    inputsCantidad.forEach(input => { 
        input.style.display = checkboxTiradasMultiples.checked ? 'block' : 'none'
    }) 
    diceRollButton.style.display = checkboxTiradasMultiples.checked ? 'block' : 'none'
} 
    
// Asignar el event listener al checkbox de tiradas múltiples 
document.getElementById('tiradas_multiples').addEventListener('change', toggleCantidadInputs) 
// Inicialmente ocultar los inputs de cantidad 
toggleCantidadInputs()

// Asignar el botón de cada dado a la función de tirada individual 
document.getElementById("D4").querySelector('.boton_elegir').addEventListener("click", function() { D4.tirarDado(); }) 
document.getElementById("D6").querySelector('.boton_elegir').addEventListener("click", function() { D6.tirarDado(); })
document.getElementById("D8").querySelector('.boton_elegir').addEventListener("click", function() { D8.tirarDado(); })
document.getElementById("D10").querySelector('.boton_elegir').addEventListener("click", function() { D10.tirarDado(); })
document.getElementById("D12").querySelector('.boton_elegir').addEventListener("click", function() { D12.tirarDado(); }) 
document.getElementById("D20").querySelector('.boton_elegir').addEventListener("click", function() { D20.tirarDado(); }) 
document.getElementById("D100").querySelector('.boton_elegir').addEventListener("click", function() { D100.tirarDado(); })

// Función para obtener y validar los valores comunes
function obtenerValoresCompartidos() {
    const menor = document.getElementById("menor").checked;
    const mayor = document.getElementById("mayor").checked;
    const valorObjetivoElement = document.getElementById("valor_objetivo");

    const valorObjetivo = valorObjetivoElement && valorObjetivoElement.value !== "" ? 
        parseInt(valorObjetivoElement.value) : null;

    return { menor, mayor, valorObjetivo };
}


// TIRAR DADOS - Asignar el botón a la función de tirada múltiple
document.getElementById("dice_roll").addEventListener("click", function() {
    document.getElementById("resultado_total").innerHTML = "" // Limpiar resultados previos

    // Obtener los valores de los inputs de cantidad y actualizar los objetos Dado
    D4.veces = parseInt(document.getElementById("veces_D4").value) || 0
    D6.veces = parseInt(document.getElementById("veces_D6").value) || 0
    D8.veces = parseInt(document.getElementById("veces_D8").value) || 0
    D10.veces = parseInt(document.getElementById("veces_D10").value) || 0
    D12.veces = parseInt(document.getElementById("veces_D12").value) || 0
    D20.veces = parseInt(document.getElementById("veces_D20").value) || 0
    D100.veces = parseInt(document.getElementById("veces_D100").value) || 0

    //Lista de dados
    const dados = [D4, D6, D8, D10, D12, D20, D100];
    // Verificar si al menos un dado tiene un valor > 0 antes de ejecutar
    const hayTiradas = dados.some(dado => dado.veces > 0);

    if (!hayTiradas) {
        alert("Por favor, selecciona al menos un dado con un número de tiradas mayor que 0.");
        return; // Detener ejecución si no hay tiradas configuradas
    }

    // Obtener valores compartidos
    const { menor, mayor, valorObjetivo } = obtenerValoresCompartidos()
    
    if ((valorObjetivo !== null && valorObjetivo > 0 && !mayor && !menor) || 
        ((mayor || menor) && (valorObjetivo === null || valorObjetivo <= 0))) {
        alert("Por favor, asegúrate de ingresar un número objetivo mayor a 0 y seleccionar 'mayor' o 'menor'.");
        return;
    }

    // Llamar a la función tirarDados de cada objeto Dado
    dados.forEach(dado => {
        if (dado.veces > 0) {
            dado.tirarDados();
        }
    })
})

// RESET - Función para reiniciar todos los inputs a su valor por defecto 
document.getElementById("reset").addEventListener("click", function() { 
    //Inputs de cantidad
    document.getElementById("veces_D4").value = 0 
    document.getElementById("veces_D6").value = 0 
    document.getElementById("veces_D8").value = 0
    document.getElementById("veces_D10").value = 0
    document.getElementById("veces_D12").value = 0
    document.getElementById("veces_D20").value = 0
    document.getElementById("veces_D100").value = 0
    //Checkbox de sumartoria
    document.getElementById("sumatoria").checked = false
    //Inputs radio
    document.getElementById("mayor").checked = false
    document.getElementById("menor").checked = false
    //Resultados previos
    document.getElementById("resultado_total").innerHTML = ""
    //Número objetivo
    document.getElementById("valor_objetivo").value = 0
    //Modificadores
    document.getElementById("mods").value = 0
    //Tirada múltiple y ocultar inputs de cantidad nuevamente
    document.getElementById("tiradas_multiples").checked = false
    toggleCantidadInputs()
})

//NEXT: conseguir que sume el total de todas las tiradas de dados que se hagan