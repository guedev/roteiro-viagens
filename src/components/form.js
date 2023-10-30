"use client";

import React, { useState } from "react";
import { Card } from "primereact/card";
import { db } from "../db/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";



export const TravelForm = () => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [urlImagem, setUrlImagem] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const imagemFinal = urlImagem.trim() === "" ? "https://img.freepik.com/vetores-premium/fundo-do-retangulo-branco-de-perspectiva-padrao-para-sites_518299-1638.jpg" : urlImagem;

    
  
    try {
      const docRef = await addDoc(collection(db, "tripsp"), {
        nome,
        endereco,
        data,
        hora,
        urlImagem: imagemFinal,
      });

      alert("Dados salvos com sucesso.");
      
      setNome("");
      setEndereco("");
      setData("");
      setHora("");
      setUrlImagem("");
      window.location.reload();


      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Houve um erro ao enviar os dados.");
    }
  };


  return (
    <div className="lg:flex flex-col items-center lg:h-fit ">
      <div className="card w-full">
        <Card title="" className="bg-slate-900 mb-8 p-4 rounded-xl text-center w-80 lg:w-96">
          <p className="m-0 text-xl">Add Local/Atividade</p>
        </Card>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-slate-900 p-4 rounded-xl shadow-lg shadow-indigo-700 md:w-96"
        id="formConfirm"
      >
        <div className="mb-4">
          <label htmlFor="nome" className="block text-white font-bold">
            Local/Atividade:
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border border-gray-300 text-slate-900"
            required
          />
        </div>


        <div className="mb-4">
          <label htmlFor="endereco" className="block text-white font-bold">
            Endereço:
          </label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className="w-full p-2 border border-gray-300 text-slate-900"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="data" className="block text-white font-bold">
            Data:
          </label>
          <input
            type="date"
            id="data"
            name="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full p-2 border border-gray-300 text-slate-900"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hora" className="block text-white font-bold">
            Hora:
          </label>
          <input
            type="time"
            id="hora"
            name="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="w-full p-2 border border-gray-300 text-slate-900"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="urlImagem" className="block text-white font-bold">
            Imagem (Url):
          </label>
          <input
            type="url"
            id="urlImagem"
            name="urlImagem"
            value={urlImagem}
            onChange={(e) => setUrlImagem(e.target.value)}
            className="w-full p-2 border border-gray-300 text-slate-900"
          />
        </div>


        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
