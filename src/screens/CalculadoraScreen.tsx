import React  from 'react';
import { Text, View } from 'react-native';
import { BotonCalc } from '../components/BotonCalc';
import { styles } from '../theme/appTheme';  // aplicamos los estilos del archivo theme/appTheme.jsx
import { useCalculadora } from '../hooks/useCalculadora';



export const CalculadoraScreen = () => {

    const { numero, numeroAnterior, limpiar, positivoNegativo, btnDelete, armarNumero, btnDividir, btnMultiplicar, btnRestar, btnSumar, calcular } = useCalculadora();

    return (
        <View style={styles.calculadoraContainer}>
            {/* ponemos una condicion para que el numero pequeño de arriba solo se muestre si la el valor numeroAnterior es diferente de 0 */}
            {
                (numeroAnterior !== '0') && (
                    <Text style={styles.resultadoPequeno}>  {numeroAnterior} </Text>
                )
            }
            <Text
                //con numberOfLines decimos que donde ponemos los numeros para el calculo solo acepte una linea
                //con adjustsFontSizeToFit decimos que si ponemos mas numeros y no caben en la linea se hagan mas pequeños los numeros
                style={styles.resultado}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
            >
                {numero}
            </Text>

            {/* filas de botones de la calculadora */}
            <View style={styles.fila}>
                {/* usamos el componente BotonCalc para cada uno de los botones de una fila
                mandamos en las props el texto, color y la accion que realiza */}
                <BotonCalc texto="C" color="#9B9B9B" accion={limpiar} />
                <BotonCalc texto="+/-" color="#9B9B9B" accion={positivoNegativo} />
                <BotonCalc texto="del" color="#9B9B9B" accion={btnDelete} />
                <BotonCalc texto="/" color="#FF9427" accion={btnDividir} />
            </View>

            <View style={styles.fila}>
                {/* usamos el componente BotonCalc para cada uno de los botones de una fila */}
                <BotonCalc texto="7" accion={armarNumero} />
                <BotonCalc texto="8" accion={armarNumero} />
                <BotonCalc texto="9" accion={armarNumero} />
                <BotonCalc texto="x" color="#FF9427" accion={btnMultiplicar} />
            </View>

            <View style={styles.fila}>
                {/* usamos el componente BotonCalc para cada uno de los botones de una fila */}
                <BotonCalc texto="4" accion={armarNumero} />
                <BotonCalc texto="5" accion={armarNumero} />
                <BotonCalc texto="6" accion={armarNumero} />
                <BotonCalc texto="-" color="#FF9427" accion={btnRestar} />
            </View>

            <View style={styles.fila}>
                {/* usamos el componente BotonCalc para cada uno de los botones de una fila */}
                <BotonCalc texto="1" accion={armarNumero} />
                <BotonCalc texto="2" accion={armarNumero} />
                <BotonCalc texto="3" accion={armarNumero} />
                <BotonCalc texto="+" color="#FF9427" accion={btnSumar} />
            </View>

            <View style={styles.fila}>
                {/* usamos el componente BotonCalc para cada uno de los botones de una fila */}
                {/* para la propiedad ancho podriamos poner solo ancho sin tener que poner ancho = { true } */}
                <BotonCalc texto="0" ancho={true} accion={armarNumero} />
                <BotonCalc texto="." accion={armarNumero} />
                <BotonCalc texto="=" color="#FF9427" accion={ calcular } />
            </View>
        </View>
    );
};
