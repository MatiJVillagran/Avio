import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-12 px-6 my-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        ¿Por qué elegir Avio?
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-gray-100 border border-secondary rounded-lg p-6 max-w-sm shadow-lg">
          <h3 className="text-xl font-bold flex gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Productos de calidad
          </h3>
          <p>Ofrecemos productos agroecologicos  y orgánicos, garantizando la mejor calidad del mercado.</p>
        </div>
        
        <div className="bg-gray-100 border border-secondary rounded-lg p-6 max-w-sm shadow-lg">
          <h3 className="text-xl flex gap-2 font-bold mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
              />
            </svg>
            Fácil
          </h3>
          <p>Compra fácil y rápida con nuestra plataforma intuitiva y amigable para el usuario. ¡Encontra lo que necesitas!</p>
        </div>
        <div className="bg-gray-100 border border-secondary rounded-lg p-6 max-w-sm shadow-lg">
          <h3 className="text-xl flex gap-2 font-bold mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 6a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H12v9a.75.75 0 0 1-1.5 0V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 10.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 9.75a.75.75 0 0 0 0 1.5H6v1.5a.75.75 0 0 0 1.5 0V9.75a.75.75 0 0 0-.75-.75h-1.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 10.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75a.75.75 0 0 0 0 1.5H18v1.5a.75.75 0 0 0 1.5 0V9.75a.75.75 0 0 0-.75-.75h-1.5z"
              />
            </svg>
            De confianza
          </h3>
          <p>Apostando a las economias regionales. Llevando el producto del productor a tu mesa.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
