import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import TextInputAdd from '../TextInputAdd.jsx';
import TodoItemDisplay from './TodoItemDisplay.jsx';

const TodoItemsView = () => {
   const [todoItems, setTodoItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const { id } = useParams();

   const handleTodoItemAdded = async (value) => {
      await postTodo(value);
      await fetchTodos();
   };

   const handleTodoItemClicked = async (dto) => {
      await putTodo(dto);
      await fetchTodos();
   };

   const deleteCompletedTodos = async () => {
      try {
         const response = await fetch(`http://localhost:5234/TodoLists/${id}/Clean`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         if (!response.ok) {
            throw new Error(response.statusText);
         }

         await fetchTodos();
      } catch (e) {
         console.error(e);
      }
   };

   const postTodo = async (value) => {
      try {
         const response = await fetch(`http://localhost:5234/TodoLists/${id}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: value }),
         });

         if (!response.ok) {
            throw Error(response.statusText);
         }
      } catch (e) {
         console.error(e);
      }
   };

   const putTodo = async (dto) => {
      try {
         const response = await fetch(`http://localhost:5234/TodoLists/${id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               id: dto.id,
               isComplete: dto.isComplete,
            }),
         });

         if (!response.ok) {
            throw Error(response.statusText);
         }
      } catch (e) {
         console.error(e);
      }
   };

   const fetchTodos = async () => {
      try {
         const response = await fetch(`http://localhost:5234/TodoLists/${id}`, {
            method: 'GET',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
         });

         if (!response.ok) {
            throw new Error('Failed to fetch todos');
         }

         const json = await response.json();
         console.log(json);
         setTodoItems(json);
         setLoading(false);
      } catch (e) {
         console.error(e);
      }
   };

   useEffect(() => {
      void fetchTodos();
   }, []);

   return (
      <div className={'flex max-w-1/2 min-w-1/6 flex-col justify-center gap-4'}>
         <Link to="/" className={'mb-4 flex flex-row justify-center'}>
            <img
               src={'/logo.svg'}
               alt={'logo'}
               className={
                  'w-1/2 min-w-48 transition-transform duration-250 ease-out hover:scale-102'
               }
            />
         </Link>
         <div>
            <Link to="/">
               <button
                  className={
                     'cursor-pointer rounded-md bg-zinc-700 p-1 px-3 text-start text-sm transition-all duration-150 ease-out hover:scale-105 hover:bg-zinc-600 active:scale-95 active:bg-zinc-800 active:text-zinc-400'
                  }>
                  Back
               </button>
            </Link>
         </div>
         <TextInputAdd buttonClicked={handleTodoItemAdded} />
         <div className={'flex flex-col justify-center gap-2'}>
            {loading ? (
               <span></span>
            ) : (
               <>
                  {todoItems
                     .filter((i) => !i.isComplete)
                     .map((item) => (
                        <TodoItemDisplay
                           key={item.id}
                           id={item.id}
                           name={item.name}
                           isComplete={item.isComplete}
                           onClick={handleTodoItemClicked}
                        />
                     ))}

                  <hr className={'m-2 border-1 border-dashed border-zinc-600'} />

                  {todoItems
                     .filter((i) => i.isComplete)
                     .map((item) => (
                        <TodoItemDisplay
                           key={item.id}
                           id={item.id}
                           name={item.name}
                           isComplete={item.isComplete}
                           onClick={handleTodoItemClicked}
                        />
                     ))}

                  <div className={'flex flex-row items-center justify-center'}>
                     <button
                        className={
                           'cursor-pointer items-center rounded-md bg-rose-600 p-2 px-5 text-center transition-all duration-150 hover:scale-105 hover:bg-rose-400 active:scale-98 active:bg-rose-800'
                        }
                        onClick={deleteCompletedTodos}>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="20"
                           height="20"
                           fill="currentColor"
                           viewBox="0 0 16 16">
                           <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                           <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                     </button>
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default TodoItemsView;
