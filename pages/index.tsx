import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import CarTable from "@/components/carTable";
import FisTable from "@/components/fisTable";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [carData, setCarData] = useState([]);
  const [data, setData] = useState([]);

  const handleSubmitName = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("https://dax-ec.ru/osint-api/get_info_by_name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const data2 = await response.json();
      setData(data2);
      console.log(data);
    }
  };

  const handleSubmitPlate = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("https://dax-ec.ru/osint-api/get_info_by_plate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plate }),
    });

    if (response.ok) {
      const data2 = await response.json();
      console.log(data2);
      if (data2[0]) {
        console.log("entre");
        setCarData(data2[0]);
        if (data2[1]) {
          setData(data2[1]);
        }
      }
    }
    console.log(carData.length);
    console.log(data.length);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center text-xl">
          <h1 className={""}>Consultar por Nombre</h1>
        </div>
        <form
          onSubmit={handleSubmitName}
          className="flex flex-row gap-4 max-w-lg text-center justify-center items-center"
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
          />
          <Button type="submit" color="primary">
            Consultar
          </Button>
        </form>
        <div className="inline-block max-w-lg text-center justify-center text-xl">
          <h1 className={""}>Consultar por Placa</h1>
        </div>
        <form
          onSubmit={handleSubmitPlate}
          className="flex flex-row gap-4 max-w-lg text-center justify-center items-center"
        >
          <Input
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="Placa"
          />
          <Button type="submit" color="primary">
            Consultar
          </Button>
        </form>
        {carData.length > 0 && <CarTable carData={carData} />}
        {data.length > 0 && <FisTable fisData={data} />}
      </section>
    </DefaultLayout>
  );
}
