class Dado {
    constructor(caras, veces = 1) {
        this.caras = caras;
        this.veces = veces;
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
        if (valorObjetivo !== null && valorObjetivo > 0 && !mayor && !menor) {
            alert("No olvides eleccionar si la tirada debe ser mayor o menor que el número objetivo.");
            return // Detener ejecución si no marcó ninguna opción
        }

        let resultadoHTML = ` 
        <div class="resultado_dado"> 
        <p class="resultado_header">Resultado del dado de ${this.caras} caras:</p> 
        <p class="resultado_valores">Tirada: ${resultadoTirada + modificador}</p>` 
    
        if (valorObjetivo !== null && valorObjetivo > 0) {
            let exito = (mayor && resultadoFinal >= valorObjetivo) || 
                        (menor && resultadoFinal <= valorObjetivo);
    
            resultadoHTML += `<p class="resultado_estado">${exito ? "¡Exitosa!" : "¡Fallida!"}</p>`;
        }

        resultadoHTML += `</div>`
        
        document.getElementById("resultado_total").innerHTML = resultadoHTML
    
        //Deslizar hacia abajo
        document.getElementById("resultado_total").scrollIntoView({ behavior: 'smooth', block: 'center' });

    }

    tirarDados() {
        let checkbox = document.getElementById("sumatoria");
        let resultados = [];
        let suma = 0;
        let menor = document.getElementById("menor").checked;
        let mayor = document.getElementById("mayor").checked;
        let valorObjetivoElement = document.getElementById("valor_objetivo");
        let modificador = parseFloat(document.getElementById("mods").value) || 0;
    
        if (!valorObjetivoElement || valorObjetivoElement.value === "") {
            valorObjetivoElement = null;
        }
    
        let exito = false;
        let detalleExitos = [];
    
        if (this.veces > 0) { // Verificar si la cantidad de veces es mayor que 0
            for (let index = 0; index < this.veces; index++) {
                let resultado = Math.floor((Math.random() * this.caras) + 1);
                resultado += modificador;
                resultados.push(resultado);
                suma += resultado;
    
                if (valorObjetivoElement) {
                    let valorObjetivo = parseFloat(valorObjetivoElement.value);
                    if (mayor && resultado >= valorObjetivo) {
                        detalleExitos.push(`Tirada ${index + 1}: Exitosa (${resultado})`);
                    } else if (menor && resultado <= valorObjetivo) {
                        detalleExitos.push(`Tirada ${index + 1}: Exitosa (${resultado})`);
                    } else {
                        detalleExitos.push(`Tirada ${index + 1}: Fallida (${resultado})`);
                    }
                }
            }
    
            // Construir HTML para mostrar resultados con todas las tiradas
            let resultadoHTML = `
                <div class="resultado-dado">
                    <p class="resultado_header">Resultados del D${this.caras}:</p>
                    <p class="resultado_valores">Resultados: ${resultados.join(", ")}</p>`;
    
            if (checkbox.checked) {
                resultadoHTML += `
                    <p class="resultado_suma">En total suman: ${suma}</p>
                    <p class="resultado_estado">Tu tirada fue: ${mayor && suma >= valorObjetivo || menor && suma <= valorObjetivo ? "¡Exitosa!" : "¡Fallida! :C"}</p>`;
            } else if (detalleExitos.length > 0) {
                resultadoHTML += `
                    <p class="resultado_detallado">Recuento de tiradas:</p>
                    <p class="resultado_exitos">${detalleExitos.join("<br>")}</p>`;
            }
    
            resultadoHTML += `</div>`;
            document.getElementById("resultado_total").innerHTML += resultadoHTML;
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

// Asignar el botón a la función de tirada de cada dado
document.getElementById("dice_roll").addEventListener("click", function() {
    document.getElementById("resultado_total").innerHTML = "" 
    // Limpiar resultados previos

    // Obtener los valores de los inputs de cantidad y actualizar los objetos Dado
    D4.veces = parseInt(document.getElementById("veces_D4").value) || 0
    D6.veces = parseInt(document.getElementById("veces_D6").value) || 0
    D8.veces = parseInt(document.getElementById("veces_D8").value) || 0
    D10.veces = parseInt(document.getElementById("veces_D10").value) || 0
    D12.veces = parseInt(document.getElementById("veces_D12").value) || 0
    D20.veces = parseInt(document.getElementById("veces_D20").value) || 0
    D100.veces = parseInt(document.getElementById("veces_D100").value) || 0

    // Llamar a la función tirarDados de cada objeto Dado
    D4.tirarDados()
    D6.tirarDados()
    D8.tirarDados()
    D10.tirarDados()
    D12.tirarDados()
    D20.tirarDados()
    D100.tirarDados()
})

// Función para reiniciar todos los inputs a su valor por defecto 
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