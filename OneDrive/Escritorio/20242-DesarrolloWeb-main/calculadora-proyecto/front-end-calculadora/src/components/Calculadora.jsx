import { useState } from "react";
import '../styles/Calculadora.css';

function Calculadora() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');
    const [ecuacionInput, setEcuacionInput] = useState('');
    const [ecuacionResultado, setEcuacionResultado] = useState('');
    const [checks, setChecks] = useState([false, false, false, false, false, false]);
    const [sortedNumbersAsc, setSortedNumbersAsc] = useState('');
    const [sortedNumbersDesc, setSortedNumbersDesc] = useState('');
    const labels = ['A', 'B', 'C', 'D', 'E', 'F'];

    function handleSubmit(e) {
        e.preventDefault();
        const operacion = e.target.value;
        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number1, number2 })
        })
            .then(res => res.json())
            .then(responseData => {
                setResultado(responseData.resultado);
            });
    }

    const handleCheckboxChange = (index) => {
        const newChecks = [...checks];
        newChecks[index] = !newChecks[index];
        setChecks(newChecks);
    };

    const handleSort = (order) => {
        const selectedNumbers = labels
            .map((label, index) => checks[index] ? document.querySelector(`#input-${label}`).value : null)
            .filter(value => value !== null)
            .map(value => parseFloat(value));

        if (order === 'ascendente') {
            selectedNumbers.sort((a, b) => a - b);
            setSortedNumbersAsc(selectedNumbers.join(', '));
            setSortedNumbersDesc(''); // Limpiar el resultado descendente
        } else if (order === 'descendente') {
            selectedNumbers.sort((a, b) => b - a);
            setSortedNumbersDesc(selectedNumbers.join(', '));
            setSortedNumbersAsc(''); // Limpiar el resultado ascendente
        }
    };

    const handleEcuacionSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3500/v1/calculadora/evaluar', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ecuacion: ecuacionInput })
        })
            .then(res => res.json())
            .then(responseData => {
                setEcuacionResultado(responseData.resultado);
            })
            .catch(() => {
                setEcuacionResultado('Error en la ecuación');
            });
    };

    return (
        <div className="container">
            <h1 id="txtCalculadora">Calculadora Intelligent</h1>
            <form>
                {labels.map((label, index) => (
                    <div key={index} className="inputGroup">
                        <input
                            type="checkbox"
                            checked={checks[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <input
                            id={`input-${label}`}
                            type="text"
                            className="number"
                            onChange={(e) => setNumber1(e.target.value)} // Aquí puedes ajustar para múltiples inputs si es necesario
                        />
                        <span className="labelRight">{label}</span>
                    </div>
                ))}

                {/* Ascendente con campo para resultado */}
                <div className="inputGroup">
                    <button type="button" className="btnEnviar" onClick={() => handleSort('ascendente')}>Ascendente</button>
                    <input
                        type="text"
                        className="number"
                        placeholder="Resultado ascendente"
                        value={sortedNumbersAsc}
                        readOnly
                    />
                </div>

                {/* Descendente con campo para resultado */}
                <div className="inputGroup">
                    <button type="button" className="btnEnviar" onClick={() => handleSort('descendente')}>Descendente</button>
                    <input
                        type="text"
                        className="number"
                        placeholder="Resultado descendente"
                        value={sortedNumbersDesc}
                        readOnly
                    />
                </div>

                {/* Ecuaciones con campos para entrada y respuesta */}
                <div className="inputGroup">
                    <button type="button" className="btnEnviar" onClick={handleEcuacionSubmit}>Ecuaciones</button>
                    <input
                        type="text"
                        className="number"
                        placeholder="Introduce la ecuación"
                        onChange={(e) => setEcuacionInput(e.target.value)}
                    />
                    <input
                        type="text"
                        className="number"
                        placeholder="Resultado"
                        value={ecuacionResultado}
                        readOnly
                    />
                </div>
            </form>
        </div>
    );
}

export default Calculadora;
