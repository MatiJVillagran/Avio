// /src/componentes/Support/SupportDevelopers.jsx

import React from 'react';
import ButtonWhatsapp from './ButtonWhatsapp';
import matiLogo from '../../../assets/matiLogo.jpg'

const developers = [
  
  {
    name: 'Matias',
    whatsappLink: 'https://wa.me/3424093379', // Reemplaza con el número de Matias
    logo: matiLogo // Reemplaza con la ruta del logo de Matias
  },

];

const SupportDevelopers = () => {
  return (
    <div className='flex gap-16 max-md:flex-col justify-center items-center'>
      {developers.map((developer, index) => (
        <ButtonWhatsapp
          key={index}
          whatsappLink={developer.whatsappLink}
          logo={developer.logo}
          name={developer.name}
        />
      ))}
    </div>
  );
};

export default SupportDevelopers;
