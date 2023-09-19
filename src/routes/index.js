import { createBrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import NotFound from '../components/NotFound';
import ProtectedGallery from '../components/ProtectedGallery';

export const router = createBrowserRouter([
  {
    name: '404',
    path: '*',
    element: <NotFound />
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/image-gallery',
    element: <ProtectedGallery />
  }
]);
