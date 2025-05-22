import React, { useEffect, useState } from 'react';
import TextInputAdd from '../TextInputAdd.jsx';
import TodoListDisplay from './TodoListDisplay.jsx';
import { Link } from 'react-router';

const TodoListsView = () => {
   const [todoLists, setTodoLists] = useState([]);
   const [loading, setLoading] = useState(true);

   const handleTodoListAdded = async (value) => {
      await postTodoList(value);
      await fetchTodoLists();
   };
   
   const handleTodoListDeleted = async (value) => {
      await deleteTodoList(value);
      await fetchTodoLists();
   }
   
   const deleteTodoList = async (value) => {
      const response = await fetch(`http://localhost:5234/TodoLists/${value}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      })
   }

   const postTodoList = async (value) => {
      try {
         const response = await fetch('http://localhost:5234/TodoLists', {
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

   const fetchTodoLists = async () => {
      try {
         const response = await fetch('http://localhost:5234/TodoLists', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         if (!response.ok) {
            throw new Error('Response not ok.');
         }

         const json = await response.json();
         console.log(json);
         setTodoLists(json);
         setLoading(false);
      } catch (e) {
         console.error(e);
      }
   };

   useEffect(() => {
      void fetchTodoLists();
   }, []);

   return (
      <div className={'flex max-w-1/2 min-w-1/6 flex-col justify-center gap-4'}>
         <div to="/" className={'mb-4 flex flex-row justify-center'}>
            <img
               src={'/logo.svg'}
               className={
                  'cursor-pointer w-1/2 min-w-48 transition-transform duration-250 ease-out hover:scale-102'
               }
            />
         </div>
         <TextInputAdd buttonClicked={handleTodoListAdded} />
         <div className={'flex flex-col justify-center gap-4'}>
            {loading ? (
               <span></span>
            ) : (
               <>
                  {todoLists.map((item) => (
                     <TodoListDisplay key={item.id} id={item.id} name={item.name} deleteClicked={handleTodoListDeleted}/>
                  ))}
               </>
            )}
         </div>
      </div>
   );
};

export default TodoListsView;
