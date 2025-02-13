import Navigation from "../../componentes/Ecommerce/Nav/Navigation";

const AboutUs = () => {
    return (
        <div className="w-full bg-primary">
            <Navigation />
            <div className="flex flex-col items-center p-4 space-y-6">
                <h1 className="text-center text-white font-bold text-3xl mb-6">SOBRE NOSOTROS</h1>

                {/* Sección unificada: texto y círculo */}
                <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 space-y-6">
                    {/* Primer nivel */}
                    <div className="flex flex-col items-center">
                        <p className="text-white font-bold text-wrap md:text-xl mb-4">
                            "Avío, Mercado Itinerante” surge como la formalización del entendimiento personal y de una práctica cotidiana de ejercer un consumo responsable y que promueva prácticas y valores de la Agroecología, el comercio justo y la valorización de las y los productores.
                        </p>
                        <div className="relative w-72 h-72 flex items-center justify-center">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                    src="https://res.cloudinary.com/dfj3xkyd5/image/upload/v1726798976/a57bocyysjij6iuywkv5.webp"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute w-3/4 h-3/4 rounded-full overflow-hidden border-4 border-white">
                                <img
                                    src="https://res.cloudinary.com/dfj3xkyd5/image/upload/v1726802603/iy3dznwi41fm5vnccxku.webp"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Segundo nivel */}
                    <div className="flex flex-col items-center">
                    <p className="text-white font-bold text-wrap md:text-xl mb-4">
                            Quienes hacemos Avío estamos atravesados por la conciencia ambiental desde mucho antes de que este proyecto haya salido a la luz; somos educadores y activistas ambientales.
                        </p>
                        <div className="relative w-72 h-72 flex items-center justify-center">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                    src="https://res.cloudinary.com/dfj3xkyd5/image/upload/v1726798976/a57bocyysjij6iuywkv5.webp"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute w-3/4 h-3/4 rounded-full overflow-hidden border-4 border-white">
                                <img
                                    src="https://res.cloudinary.com/dfj3xkyd5/image/upload/v1726802633/mql5mpvjencgvvcvocls.webp"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Tercer nivel */}
                    <div className="flex flex-col items-center">
                        <p className="text-white font-bold text-wrap md:text-xl mb-4">
                            En Avío comercializamos productos y alimentos agroecológicos y orgánicos generados en diferentes regiones de la Argentina, que siempre son probados en el hogar para asegurarnos de su calidad y calidez humana.
                        </p>
                        <div className="relative w-72 h-72 flex items-center justify-center">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                    src="https://res.cloudinary.com/dfj3xkyd5/image/upload/v1726798976/a57bocyysjij6iuywkv5.webp"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute w-3/4 h-3/4 rounded-full overflow-hidden border-4 border-white">
                                <img
                                    src="https://res.cloudinary.com/dfj3xkyd5/image/upload/v1726802655/e6bj3qn3okezkxbic8op.webp"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
