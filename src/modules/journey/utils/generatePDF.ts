import { jsPDF } from 'jspdf';
import { IJourney } from '../types/IJourney.type';

export const generatePDF = (row: IJourney) => {
  const doc = new jsPDF();

  // Establecer color de fondo para el encabezado
  doc.setFillColor(35, 65, 85); // Azul oscuro
  doc.rect(0, 0, doc.internal.pageSize.width, 20, 'F'); // Rellenar la parte superior

  // Título
  doc.setTextColor(255, 255, 255); // Color blanco para el texto
  doc.setFontSize(22);
  doc.text('Comprobante de Viaje', 20, 15);

  // Linea separadora
  doc.setDrawColor(0, 0, 0); // Color negro para la línea
  doc.line(20, 25, doc.internal.pageSize.width - 20, 25);

  // Información del Viaje (con bordes y colores)
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0); // Negro para el texto

  // Detalles del viaje
  doc.text(`Ticket: ${row.ticket}`, 20, 35);
  doc.text(`Fecha de Salida: ${new Date(row.fechaHoraSalida).toLocaleString()}`, 20, 45);
  doc.text(`Fecha de Llegada Estimada: ${new Date(row.fechaHoraLlegadaEstimada).toLocaleString()}`, 20, 55);

  // Información del Cliente
  doc.setFontSize(16);
  doc.setTextColor(35, 65, 85); // Azul para los títulos
  doc.text('Cliente:', 20, 70);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0); // Negro para los datos
  doc.text(`Nombre: ${row.cliente.nombres} ${row.cliente.apellidos}`, 20, 80);
  doc.text(`DNI: ${row.cliente.dni}`, 20, 90);
  doc.text(`Email: ${row.cliente.email}`, 20, 100);
  doc.text(`Teléfono: ${row.cliente.telefono}`, 20, 110);
  doc.text(`Dirección: ${row.cliente.direccion}`, 20, 120);

  // Información del Conductor
  doc.setFontSize(16);
  doc.setTextColor(35, 65, 85);
  doc.text('Conductor:', 20, 140);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Nombre: ${row.conductor.nombres} ${row.conductor.apellidos}`, 20, 150);
  doc.text(`DNI: ${row.conductor.dni}`, 20, 160);
  doc.text(`Licencia: ${row.conductor.licencia}`, 20, 170);

  // Información de la Ruta
  doc.setFontSize(16);
  doc.setTextColor(35, 65, 85);
  doc.text('Ruta:', 20, 190);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Origen: ${row.ruta.origen}`, 20, 200);
  doc.text(`Destino: ${row.ruta.destino}`, 20, 210);
  doc.text(`Distancia: ${row.ruta.distancia} km`, 20, 220);
  doc.text(`Precio Base: S/. ${row.ruta.precioBase.toFixed(2)}`, 20, 230);

  // Tabla para Precio Final y Estado del Viaje
  doc.setFontSize(16);
  doc.setTextColor(35, 65, 85);
  doc.text('Detalles Finales:', 20, 250);

  // Linea separadora
  doc.line(20, 260, doc.internal.pageSize.width - 20, 260);

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`IGV: S/. ${row.ruta.precioBase * 0.18}`, 20, 270);
  doc.text(`Precio Final: S/. ${row.precioFinal.toFixed(2)}`, 20, 270);
  doc.text(`Estado: ${row.estado}`, 20, 280);

  // Línea de separación para el pie de página
  doc.setDrawColor(0, 0, 0); // Negro
  doc.line(20, 290, doc.internal.pageSize.width - 20, 290);

  // Pie de página
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100); // Gris para pie de página
  doc.text('Gracias por viajar con nosotros. ¡Que tengas un buen día!', 20, 300);

  // Guardar el PDF
  doc.save(`comprobante-viaje-${row.ticket}.pdf`);
};
