import React from 'react';


interface IProps {
    heading: string
}

const Heading:React.FC<IProps> = (props) => {
 
  return (
    <>
    <div className='heading'>
        <h1>{props.heading}</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum reprehenderit est atque, nihil ipsa, at inventore id neque dicta sequi ipsum fuga quibusdam expedita suscipit facere maxime eum repellendus. Enim.</p>
        </div>
    </>
  );
}

export default Heading;