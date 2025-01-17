export const calculateDistanceAndPrice = (origen: string, destino: string) => {
  const distanciaPorDepartamentos: { [key: string]: { [key: string]: number } } = {
    Ayacucho: { Lima: 300, Ica: 150, Junín: 200 },
    Lima: { Ayacucho: 300, Ica: 200, Junín: 250 },
    Ica: { Ayacucho: 150, Lima: 200, Junín: 120 },
    Junín: { Ayacucho: 200, Lima: 250, Ica: 120 },
  };

  const precioBasePorDistancia = (distancia: number) => {
    return distancia * 0.5;
  };

  if (origen && destino && distanciaPorDepartamentos[origen] && distanciaPorDepartamentos[origen][destino]) {
    const distancia = distanciaPorDepartamentos[origen][destino];
    const precioBase = precioBasePorDistancia(distancia);
    return { distancia, precioBase };
  }

  return { distancia: 0, precioBase: 0 };
};
