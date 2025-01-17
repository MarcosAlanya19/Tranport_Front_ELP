import { createRoot } from 'react-dom/client';
import './index.css';

import 'react-loading-skeleton/dist/skeleton.css';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './@routes/index.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster richColors />
    <RouterProvider router={router} />
  </>
);
