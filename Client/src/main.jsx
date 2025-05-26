import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import TodoListsView from './components/todolistsview/TodoListsView.jsx';
import TodoItemsView from './components/todoitemsview/TodoItemsView.jsx';

const router = createBrowserRouter([
   {
      path: '/',
      element: <TodoListsView />,
   },
   {
      path: '/TodoList/:id',
      element: <TodoItemsView />,
   },
   {
      path: '*',
      element: <h1 className={'text-center text-2xl font-bold'}>Not found.</h1>,
   },
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
