import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/Calculadora.module.css';

const Calculadora = () => {
    const [currentValue, setCurrentValue] = useState("0");
    const [operacaoPendente, definirOperacaoPendente] = useState(null);
    const [valorPendente, definirValorPendente] = useState(null);
    const [operacaoCompleta, definirOperacaoCompleta] = useState("");

    const numerosTeclado = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "(", ")"];  
    const operacao = ["+", "-", "*", "÷", "%"];  
    

    // lidar com o click
    const handleClick = (val) => {
        setCurrentValue(prevValue => {
            if (prevValue === "0") {
                return val;
            } else {
                return prevValue + val;
            }
        });
        definirOperacaoCompleta(prevOperation => prevOperation + val); 
    };

    // operação inseridas
    const handleOperation = (operacao) => {
        definirOperacaoCompleta(currentValue + " " + operacao)
        definirOperacaoPendente(operacao)
        definirValorPendente(currentValue)
        setCurrentValue("0");
    }

    // limpar
    const handleClear = () => {
        setCurrentValue('0');
        definirOperacaoPendente(null);
        definirValorPendente(null);
        definirOperacaoCompleta("");
    };

    const deleteLastDigit = () => {
        setCurrentValue(prevValue => {
            if (prevValue.length === 1) {
                return "0";
            } else {
                return prevValue.slice(0, -1);
            }
        });
        definirOperacaoCompleta(prevOperation => prevOperation.slice(0, -1));
    };
    
    const handleDelete = () => {
        setCurrentValue(prevValue => {
            if (prevValue.length === 1) {
                return "0";
            } else {
                return prevValue.slice(0, -1);
            }
        });
        definirOperacaoCompleta(prevOperation => prevOperation.slice(0, -1));
    };
    


   // calculando
   const handleCalculator = () => {

     if(!operacaoPendente || !valorPendente) {
        return;
     }

      // parseFloat -> converte pra numerico;
     const num1 = parseFloat(valorPendente);
     const num2 = parseFloat(currentValue);

     let resultado 

     switch (operacaoPendente) {
        case "+":
            resultado = num1 + num2;
             break;
        case "-":
            resultado = num1 - num2;
            break;
        case "*":
            resultado = num1 * num2;
            break;
        case "/":
            if (num2 !== 0) {
                resultado = num1 / num2;
            } else {
                setCurrentValue("Error")
            }
            break;
        case "%":
                resultado = num1 * (num2 / 100);
            break;

        default:
            break;
     }

     definirOperacaoCompleta(
        valorPendente + 
        " " + 
        operacaoPendente + 
        " " +
         currentValue +
          " = " + 
          resultado
    );

    setCurrentValue(resultado.toString());
    definirOperacaoPendente(null);
    definirValorPendente(null);
   };

    return (
        <div className={styles.calculator}>
            <div className={styles.display}>{operacaoCompleta || currentValue}</div>
            <div className={styles.buttons}>
                <button className={styles.buttonClear} onClick={handleClear}> AC </button> {/* limpar a tela */}
                <button onClick={handleDelete}><FontAwesomeIcon icon={faBackspace} /></button> {/* limpar a tela */}
                {numerosTeclado.map(num => (
                    <button key={num} onClick={() => handleClick(num)}>
                      {num} 
                    </button>
                ))}
                {operacao.map(operacao => (
                    <button key={operacao} onClick={() => handleOperation(operacao)}>
                      {operacao} 
                     </button>
                ))}
                <button className={styles.buttonResultado} onClick={handleCalculator}> = </button>
            </div>
        </div>
    );
};

export default Calculadora;
