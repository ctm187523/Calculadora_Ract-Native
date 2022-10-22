import React from 'react'
import { Text, TouchableOpacity, View, } from 'react-native';
import { styles } from '../theme/appTheme';



interface Props {
    texto: string;
    color?: string; //color opcional si no recibe el color se pone el color por defecto
    ancho?: boolean; //opcional si el boton es ancho como es el unico caso del 0
    accion: ( numeroTexto: string ) => void //accion del boton
}

export const BotonCalc = ({ texto, color = '#2D2d2D', ancho = false, accion  }: Props) => {
    return (
        // usamos TouchableOpacity para que el boton tenga opacidad al hacer click
        //con onPress ejecutamos la accion que tiene el boton pulsado, recibimos la accion en las props del componente
        <TouchableOpacity
            //mandamos en el onPress el texto como argumento que es el numero que hemos pulsado y recibimos en el primer argumento de las props
            onPress = { () => accion( texto ) }>
            <View style={{
                ...styles.boton,
                backgroundColor: color,
                width: (ancho) ? 180 : styles.boton.width,
            }}>
                <Text style={{
                    ...styles.botonTexto,
                    color: (color === '#9B9B9B') ? 'black' : 'white',
                }}> {texto} </Text>
            </View>
        </TouchableOpacity>
    );
};



