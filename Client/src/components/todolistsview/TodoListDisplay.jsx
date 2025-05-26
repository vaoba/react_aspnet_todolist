import React from 'react';
import { Link } from 'react-router';

const TodoListDisplay = ({ id, name, deleteClicked }) => {
   return (
      <div className={'flex w-full flex-row gap-4'}>
         <Link
            to={`/TodoList/${id}`}
            className={
               'group flex w-full flex-row content-center items-center justify-between gap-3 rounded-lg bg-zinc-700 p-3 transition-all duration-150 ease-out hover:scale-102'
            }>
            <h3
               className={
                  'cursor-pointer transition-colors duration-150 group-hover:text-zinc-400'
               }>
               {name}
            </h3>
         </Link>
         <div className={'flex flex-row'}>
            <button
               className={
                  'cursor-pointer rounded-md bg-rose-600 px-4 text-center transition-all duration-150 hover:scale-105 hover:bg-rose-400 active:scale-98 active:bg-rose-800'
               }
               onClick={() => deleteClicked(id)}>
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
      </div>
   );
};

export default TodoListDisplay;
