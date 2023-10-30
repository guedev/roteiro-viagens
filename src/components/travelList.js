import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db/firebaseConfig";
import { Card } from "primereact/card";

const TravelList = () => {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tripsp"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        data.sort((a, b) => {
          const dateComparison = new Date(a.data) - new Date(b.data);
          if (dateComparison === 0) {
            return a.hora.localeCompare(b.hora);
          }
          return dateComparison;
        });

        setTravelData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
      }
    };

    fetchTravelData();
  }, []);

  // Esta função permite adicionar um novo item à lista

  if (loading) {
    return <p className="mt-4">Carregando dados...</p>;
  }

  if (travelData.length === 0) {
    return <p className="mt-10">Nenhum dado encontrado.</p>;
  }

  const groupedData = {};
  travelData.forEach((data) => {
    const date = data.data;
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(data);
  });

  return (
    <div className="mt-10">
      <h2 className="text-center w-full">Lista de Locais/Atividades:</h2>
      {Object.keys(groupedData).map((date) => (
        <div key={date} className="flex flex-col justify-center items-center">
          <h3 className="bg-white text-black p-2 mt-10 rounded-lg w-40 text-center"><strong>{date}</strong></h3>
          <div className="flex flex-wrap justify-center"> 
            {groupedData[date]
              .sort((a, b) => a.hora.localeCompare(b.hora))
              .map((data, index) => (
                <div key={index} className="w-full sm:w-48 md:w-1/3 p-4">
                  <Card className="bg-white rounded-lg text-black p-4 md:min-h-[28rem]"> 
                    <img src={data.urlImagem} alt={`Imagem para ${data.nome}`} className="w-full h-full mb-4" />
                    <p>Local/Atividade: {data.nome}</p>
                    <p>Endereço: <em>{data.endereco}</em></p>
                    <p>Data: {data.data}</p>
                    <p>Hora: {data.hora}</p>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelList;
