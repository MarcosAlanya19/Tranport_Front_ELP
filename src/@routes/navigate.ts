export const navigationRoutes = [
  { path: '/route', label: 'Ruta' },
  { path: '/vehicle', label: 'Vehiculo' },
  { path: window.location.pathname === '/driver' ? '/driver' : '/', label: 'Conductor' },
  { path: '/journey', label: 'Viaje' },
];
