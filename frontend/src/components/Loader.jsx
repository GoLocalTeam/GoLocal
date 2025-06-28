import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ loading = true, size = 48 }) => (
  <div className="flex items-center justify-center min-h-[200px] w-full">
    <ClipLoader color="#0ea5e9" loading={loading} size={size} />
  </div>
);

export default Loader; 