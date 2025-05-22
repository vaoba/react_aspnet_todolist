import React, { useState } from 'react';

const TextInputAdd = ({ buttonClicked }) => {
   const [value, setValue] = useState('');

   const handleClick = () => {
      const sanitizedValue = value.trim();
      if (sanitizedValue === '') return;

      buttonClicked(sanitizedValue);
      setValue('');
   };

   return (
      <div className={'flex flex-row justify-center gap-4'}>
         <input
            type={'text'}
            placeholder={'Name'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={
               'transition-color w-full appearance-none rounded-md border-2 border-cyan-500 bg-zinc-100 p-2 text-zinc-900 duration-100 hover:scale-102 focus:border-cyan-700 focus:outline-none'
            }
         />
         <button
            onClick={handleClick}
            className={
               'cursor-pointer rounded-md border-zinc-100 bg-zinc-700 p-2 px-4 font-semibold text-zinc-100 transition-all duration-100 hover:scale-105 hover:bg-zinc-600 active:scale-95 active:bg-zinc-800 active:text-zinc-400'
            }>
            Create
         </button>
      </div>
   );
};

export default TextInputAdd;
