function ocultarElemento(elemento){
  elemento.style.display = "none";
}
function mostrarElemento(elemento){
  elemento.style.display = "";
}
function cargarsom(){
  const som = document.createElement("audio");
  som.src = "timer.wav";
  som.loop = true;
  som.setAttribute("preload", "auto");
  som.setAttribute("controls", "none");
  som.style.display = "none";
  document.body.appendChild(som);
  return som;
}
document.addEventListener("DOMContentLoaded", () => {
	const $tempo = document.querySelector("#tempo")
	const	$btnIniciar = document.querySelector("#btnIniciar")
	const	$btnPausar = document.querySelector("#btnPausar")
	const	$btnResetar = document.querySelector("#btnResetar")
	const	$minutos = document.querySelector("#minutos")
	const	$segundos = document.querySelector("#segundos")
	const	$inputs = document.querySelector("#inputs");
	let idInterval = null
  let dft = 0
	let fechaFuturo = null;
	const som = cargarsom("timer.wav");
	
 

	const iniciarTemporizador = (minutos, segundos) => {
		ocultarElemento($inputs);
		mostrarElemento($btnPausar);
		ocultarElemento($btnIniciar);
		ocultarElemento($btnResetar);
		if (fechaFuturo) {
			fechaFuturo = new Date(new Date().getTime() + dft);
			dft = 0;
		} else {
			const milisegundos = (segundos + (minutos * 60)) * 1000;
			fechaFuturo = new Date(new Date().getTime() + milisegundos);
		}
		clearInterval(idInterval);
		idInterval = setInterval(() => {
			const tempo = fechaFuturo.getTime() - new Date().getTime();
			if (tempo <= 0) {
				clearInterval(idInterval);
				som.play();
				ocultarElemento($btnPausar);
				mostrarElemento($btnResetar);
			} else {
				$tempo.textContent = milisegundosAMinutosYSegundos(tempo);
			}
		}, 50);
	};




//add zero se for necessario
	const zr = valor => {
		if (valor < 10) {
			return "0" + valor;
		} else {
			return "" + valor;
		}
	}
	const milisegundosAMinutosYSegundos = (milisegundos) => {
		const minutos = parseInt(milisegundos / 1000 / 60);
		milisegundos -= minutos * 60 * 1000;
		segundos = (milisegundos / 1000);
		return `${zr(minutos)}:${zr(segundos.toFixed(1))}`;
	};
	const init = () => {
		$minutos.value = "";
		$segundos.value = "";
		mostrarElemento($inputs);
		mostrarElemento($btnIniciar);
		ocultarElemento($btnPausar);
		ocultarElemento($btnResetar);
	};
	$btnIniciar.onclick = () => {
		const minutos = parseInt($minutos.value);
		const segundos = parseInt($segundos.value);
		if (isNaN(minutos) || isNaN(segundos) || (segundos <= 0 && minutos <= 0)) {
			return;
		}
		iniciarTemporizador(minutos, segundos);
	};
	init();
	$btnPausar.onclick = () => {
		ocultarElemento($btnPausar);
		mostrarElemento($btnIniciar);
		mostrarElemento($btnResetar);
		dft = fechaFuturo.getTime() - new Date().getTime();
		clearInterval(idInterval);
	};
	$btnResetar.onclick = () => {
		clearInterval(idInterval);
		fechaFuturo = null;
		dft = 0;
		som.currentTime = 0;
		som.pause();
		$tempo.textContent = "00:00.0";
		init();
	};
});































/* Váriaveis para o cronometro */
const miliseg = document.querySelector('.milissegundos')
const seg = document.querySelector('.segundos')
const min = document.querySelector('.minutos')
/* Botões */
const iniciar=document.querySelector(".iniciar")
const parar=document.querySelector(".parar")
const resetar=document.querySelector(".resetar")
let miliNum = 0
let segNum = 0
let minNum = 0
let INTERVALO
function milissegundos() {
  miliNum++
    miliseg.innerHTML = miliNum
  if (miliNum == 9) {
    miliNum = 0
    segundos()
  }
}
function segundos() {
  segNum++
  if (segNum < 10) {
    seg.innerHTML = '0' + segNum
  } else {
    seg.innerHTML = segNum
  }

  if (segNum == 59) {
    segNum = 0
    minutos()
  }
}
function minutos() {
  minNum++
  if (minNum < 10) {
    min.innerHTML = '0' + minNum
  } else {
    min.innerHTML = minNum
  }
}
iniciar.addEventListener("click",()=>{
  clearInterval(INTERVALO)
  INTERVALO = setInterval(() => {
    milissegundos()
  }, 100)
})
parar.addEventListener("click",()=>{
  alert("Cronemetro parado")
  clearInterval(INTERVALO)
})
resetar.addEventListener("click", ()=>{
  clearInterval(INTERVALO)
  miliNum = 0
  segNum = 0
  minNum = 0
  miliseg.innerHTML = '00'
  seg.innerHTML = '00'
  min.innerHTML = '00'
})
