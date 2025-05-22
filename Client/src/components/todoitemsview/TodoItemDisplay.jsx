import React from 'react';

const TodoItemDisplay = ({ id, name, isComplete, onClick }) => {
   return (
      <div
         onClick={() => onClick({ id: id, isComplete: !isComplete })}
         className={`group flex w-full cursor-pointer flex-row content-center items-center justify-between gap-4 rounded-lg bg-zinc-700 p-3 transition-all duration-150 ease-out hover:scale-102 active:scale-98 ${!isComplete ? 'active:bg-emerald-700' : 'active:bg-zinc-800'}`}>
         <span className={`${isComplete ? 'text-zinc-400' : ''}`}>{name}</span>
         <input
            type="checkbox"
            checked={isComplete}
            readOnly={true}
            className={`appearance-none rounded-md border-1 border-zinc-300 bg-zinc-500 p-3 checked:bg-emerald-400 ${!isComplete ? 'group-hover:bg-emerald-400' : 'group-hover:bg-zinc-500!'} transition-colors duration-150`}
         />
      </div>
   );
};

export default TodoItemDisplay;
