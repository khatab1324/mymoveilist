import React, { useState, useEffect } from 'react';
import { useDebouncedValue } from '../hooks/useDebounce';


export default function Appone() {
  const [value, setValue] = useState('');
  const debouncedSearchTerm = useDebouncedValue(value, 1000);

  useEffect(() => {
    console.log(value);
  }, [debouncedSearchTerm]);

  return (
    <div className="h-screen flex justify-center items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
