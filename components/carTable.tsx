import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

interface CarDataItem {
  [key: string]: string;
}

interface CarTableProps {
  carData: CarDataItem[];
}

export default function CarTable({ carData }: CarTableProps) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Card className="w-full md:w-3/4 lg:w-1/2 mx-auto">
      <CardHeader>
        <p className="font-bold text-xl">Información del vehículo</p>
      </CardHeader>
      <Divider />
      <CardBody>
        {carData.map((item, index) => (
          <div key={index}>
            <p className="font-bold text-lg">
              {capitalizeFirstLetter(Object.keys(item)[0])}:{" "}
            </p>
            <p>{Object.values(item)[0] as string}</p>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}