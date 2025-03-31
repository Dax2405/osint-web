import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

interface CarDataItem {
  [key: string]: string | number | object; // Acepta diferentes tipos de valores
}

interface CarTableProps {
  carData: CarDataItem[];
}

export default function CarTable({ carData }: CarTableProps) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderDeudas = (deudas: any[]) => {
    return (
      <div className="mt-2">
        <p className="font-bold text-lg">Deudas:</p>
        {deudas.map((deuda, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">Descripción: {deuda.descripcion}</p>
            <p>Subtotal: ${deuda.subtotal.toFixed(2)}</p>
            <p>Rubros:</p>
            <ul className="list-disc pl-5">
              {deuda.rubros.map((rubro: any, rubroIndex: number) => (
                <li key={rubroIndex}>
                  <p>Beneficiario: {rubro.beneficiario}</p>
                  <p>Descripción: {rubro.descripcion}</p>
                  <p>Valor: ${rubro.valor.toFixed(2)}</p>
                  <p>Periodo Fiscal: {rubro.periodoFiscal}</p>
                  <p>Detalles:</p>
                  <ul className="list-disc pl-5">
                    {rubro.detallesRubro.map(
                      (detalle: any, detalleIndex: number) => (
                        <li key={detalleIndex}>
                          <p>
                            Año: {detalle.anio}, Descripción:{" "}
                            {detalle.descripcion}, Valor: $
                            {detalle.valor.toFixed(2)}
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full md:w-3/4 lg:w-1/2 mx-auto">
      <CardHeader>
        <p className="font-bold text-xl">Información del vehículo</p>
      </CardHeader>
      <Divider />
      <CardBody>
        {carData.map((item, index) => (
          <div key={index} className="mb-4">
            {Object.entries(item).map(([key, value]) => (
              <div key={key}>
                <p className="font-bold text-lg">
                  {capitalizeFirstLetter(key)}:{" "}
                </p>
                {key === "deudas" && Array.isArray(value) ? (
                  renderDeudas(value)
                ) : (
                  <p>
                    {typeof value === "object"
                      ? JSON.stringify(value, null, 2) // Convierte objetos a texto legible
                      : value}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
