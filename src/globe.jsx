import React from 'react'
import Globe from 'react-globe.gl';


const globe = () => {
  return (
    <div className="w-full h-32">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        width={150}
        height={150}
        showAtmosphere={false}
        atmosphereColor="rgba(0,0,0,0)"
      />
    </div>
  );
};

export default globe