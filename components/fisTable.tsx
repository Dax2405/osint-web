import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

interface FisDataItem {
  [key: string]: string;
}

interface FisTableProps {
  fisData: FisDataItem[][];
}

export default function FisTable({ fisData }: FisTableProps) {
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!Array.isArray(fisData) || fisData.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  return (
    <div className="space-y-4">
      {fisData.map((tableData, tableIndex) => (
        <Card key={tableIndex} className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <CardHeader>
            <p className="font-bold text-xl">
              Información del caso {tableIndex + 1}
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            {tableData.map((item, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold text-lg">
                  {capitalizeFirstLetter(Object.keys(item)[0])}:{" "}
                </p>
                <p>{Object.values(item)[0] as string}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}