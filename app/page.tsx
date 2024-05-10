"use client"
import { useEffect, useState } from "react";
import { obtenerAnuros, agregarAnuros, eliminarAnuro, modificarAnuro } from "./database";

export default function Home() {
  const [anurosData, setAnurosData] = useState<{ id: string; especie: any; familia: any; conservacion: any; }[]>([]);
  const [familia, setFamilia] = useState<string>("");
  const [especie, setEspecie] = useState<string>("");
  const [conservacion, setConservacion] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    obtenerAnuro();
  }, []);

  async function obtenerAnuro() {
    try {
      const data = await obtenerAnuros();
      setAnurosData(data);
    } catch (error) {
      console.error("Error al obtener anuros: ", error);
    }
  }

  const handleAgregarAnuro = async () => {
    try {
      // Llamar a la función para agregar anuro con los datos ingresados
      await agregarAnuros(especie, familia, conservacion);
      // Limpiar los campos después de agregar el anuro
      setFamilia("");
      setEspecie("");
      setConservacion("");
      obtenerAnuro();
    } catch (error) {
      console.error("Error al agregar un nuevo anuro: ", error);
    }
  };

 const handleModificarAnuro = async () => {
    try {
      await modificarAnuro(id, especie, familia, conservacion);
      setFamilia("");
      setEspecie("");
      setConservacion("");
      setId("");
      obtenerAnuro();
    } catch (error) {
      console.error("Error al modificar anuro: ", error);
    }
  }

  const handleEliminarAnuro = async () => {
    try {
      await eliminarAnuro(id);
      setId("");
      obtenerAnuro();
    } catch (error) {
      console.error("Error al eliminar anuro: ", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-24">
      {anurosData.map(anuro => (
        <div className="m-5" key={anuro.id}>
          <p><span className="text-xl bolder text-red-300">Id: </span>{anuro.id}</p>
          <p><span className="text-xl bolder text-red-300">Especie: </span>{anuro.especie}</p>
          <p><span className="text-xl bolder text-red-300">Familia: </span>{anuro.familia}</p>
          <p><span className="text-xl bolder text-red-300">Conservacion: </span>{anuro.conservacion}</p>
        </div>
      ))}
       <div>
        <h2>Agregar Anuro</h2>
        <div>
          <label htmlFor="especie">Especie:</label>
          <input
          className="text-black"
            type="text"
            id="especie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="familia">Familia:</label>
          <input
          className="text-black"
            type="text"
            id="familia"
            value={familia}
            onChange={(e) => setFamilia(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="conservacion">Conservación:</label>
          <input
          className="text-black"
            type="text"
            id="conservacion"
            value={conservacion}
            onChange={(e) => setConservacion(e.target.value)}
          />
          <div>
            <label htmlFor="id">id:</label>
            <input
            className="text-black"
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        </div>
      </div>
          <button onClick={handleAgregarAnuro}>Agregar Anuro</button>
          <button onClick={handleEliminarAnuro}>eliminar Anuro</button>
          <button onClick={handleModificarAnuro}>modificar Anuro</button> 
          <p>completar especie, familia y conservacion para AGREGAR</p>
          <p>completar SOLO id para eliminar</p>
          <p>completar TODO para modificar</p>
    </main>
  );
}
