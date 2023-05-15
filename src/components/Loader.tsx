import React from 'react';



const Loader:React.FC = () => {
 
  return (
    <>
    <div className='loaderConatiner'>
  <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div> </>
  );
}

export default Loader;