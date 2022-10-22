import { useRef, useState } from 'react';


//establecemos una enumeracion para las operaciones a realizar
enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setNumero] = useState('0');

    //usamos el useRef para memorizar la operacion a realizar sin tener que renderizar usamos el enum
    //definido arriba Operadores
    const ultimaOperacion = useRef<Operadores>();

    //funcion para el boton c
    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    };

    //funcion al pulsar un numero con validaciones
    const armarNumero = (numeroTexto: string) => {

        //validamos si ya exite un punto para que no podamos poner mas puntos
        if (numero.includes('.') && numeroTexto === '.') return;

        //comprobamos si el numero comienza por 0 o -0 para hacer validaciones, ne caso contrario concatenamos 
        //el numero mumero con el numeroTexto recibido por parametro
        if (numero.startsWith('0') || numero.startsWith('-0')) {

            //Punto decimal
            if (numeroTexto === '.') {
                setNumero(numero + numeroTexto);

                // Evaluar si es otro cero el numeroTexto  y hay un punto en el numero, indicandonos que sera un numero decimal de tipo 0.0000
            } else if (numeroTexto === '0' && numero.includes('.')) {
                setNumero(numero + numeroTexto);

                //Evaluar si es diferente de cero y no tiene punto es decir no es decimal
                //de esta manera no saldra el 0 incial ya que solo mostramos el numero pulsado
            } else if (numeroTexto !== '0' && !numero.includes('.')) {
                setNumero(numeroTexto);

                //Evitar 0000.0 evitamos que al pulsar el cero de incio no se concatene con mas ceros
            } else if (numeroTexto === '0' && !numero.includes('.')) {
                setNumero(numero);
            } else {
                setNumero(numero + numeroTexto);
            }

        } else {
            setNumero(numero + numeroTexto);
        }
    };

    //funcion para el boton +/-
    const positivoNegativo = () => {
        if (numero.includes('-')) {
            setNumero(numero.replace('-', ''));
        } else {
            setNumero('-' + numero);
        }
    };

    //borramos el ultimo numero introducido
    const btnDelete = () => {

        //codigo implementado por mi que funciona lo comentamos usamos el completado por el video
        // if (  numero.length === 2 && numero.includes('-') || numero.length === 1){
        //     setNumero('0');
        // }
        // else {
        //     setNumero(numero.substring(0,numero.length - 1));
        // }

        //codigo implementado en el video 93
        let negativo = '';
        let numeroTemporal = numero;

        //comprobamos si es un numero negativo
        if (numero.includes('-')) {
            negativo = '-'; //asignamos a negativo el simbolo negativo
            numeroTemporal = numero.substr(1); //le quitamos al numero el signo negativo del incio
        }

        //comprobamos que el numeroTemporal sea mayor que 1, tanto negativos como positivos no tienen el signo de menos por tanto la longitud es la misma
        if (numeroTemporal.length > 1) {
            //le damos un nuevo valor al numero si es negativo ponemos el signo si no es positivo no ya que arriba negativo lo iniciamos como un string vacio
            //al numeroTemporal con slice le quitamos el ultimo digito del numero
            setNumero(negativo + numeroTemporal.slice(0, -1));
        } else {
            //en caso de que sea el ultimo digito o ultimo digito negativo cambiamos el valor por cero
            setNumero('0');
        }

    };

    //funcion para poner el valor al numero pequeño ubicado arriba del numero con la variable numeroAnterior
    //este metodo es llamado cuando realizamos cualquier operacion como sumar,restar,multiplicar o dividir
    //para preparar la operacion a realizar
    const cambiarNumPorAnterior = () => {
        //si el numero registrado en el display termina con punto lo eliminamos
        if (numero.endsWith('.')) {
            setNumeroAnterior(numero.slice(0, -1));
        } else {
            setNumeroAnterior(numero);
        }
        setNumero('0'); //establecemos el numero a cero para estar preparado cuando le damos al boton de cualquier operacion sumar,etc, el numero pequeño de arriba toma el valor al que se le debe efectuar la operacion
    };

    const btnDividir = () => {
        //llamamos al metodo de arriba
        cambiarNumPorAnterior();
        //usamos el useRef creado arriba ultimaOperacion para que memorize la operacion sin tener que renderizar
        ultimaOperacion.current = Operadores.dividir;
    };

    const btnMultiplicar = () => {
        //llamamos al metodo de arriba
        cambiarNumPorAnterior();
        //usamos el useRef creado arriba ultimaOperacion para que memorize la operacion sin tener que renderizar
        ultimaOperacion.current = Operadores.multiplicar;
    };

    const btnRestar = () => {
        //llamamos al metodo de arriba
        cambiarNumPorAnterior();
        //usamos el useRef creado arriba ultimaOperacion para que memorize la operacion sin tener que renderizar
        ultimaOperacion.current = Operadores.restar;
    };

    const btnSumar = () => {
        //llamamos al metodo de arriba
        cambiarNumPorAnterior();
        //usamos el useRef creado arriba ultimaOperacion para que memorize la operacion sin tener que renderizar
        ultimaOperacion.current = Operadores.sumar;
    };

    const calcular = () => {
        //pasamos numero y numero anterior a numeros no strings
        const num1 = Number(numero);
        const num2 = Number(numeroAnterior);

        //creamos un switch para hacer la operacion que tenemos memorizada en ultimaOperacion que es un useRef donde tenemos memorizado la ultima operacion que indico el usuario
        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero(`${ num1 + num2 }`); //pasamos a string con los templates
                break;
            case Operadores.restar:
                setNumero(`${ num2 - num1 }`); //pasamos a string con los templates
                break;
            case Operadores.multiplicar:
                setNumero(`${ num1 * num2 }`); //pasamos a string con los templates
                break;
            case Operadores.dividir:
                setNumero(`${ num2 / num1 }`); //pasamos a string con los templates
                break;
        }

        setNumeroAnterior('0'); //ponemos el numero anterior a cero
    };

    return {
        numero,
        numeroAnterior,
        limpiar,
        armarNumero,
        positivoNegativo,
        btnDelete,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular,
    };

};
