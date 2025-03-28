const PurchaseProduct = ({ sale }) => {

  return (
    <div className="flex items-center gap-4 border rounded-lg p-4 bg-gray-400 text-white border-primary w-full">
      <img
        src={sale?.product?.url.split(',')[0]}
        alt={`${sale?.product?.nombre}`}
        width={80}
        height={80}
        className="rounded-md"
        style={{ aspectRatio: "80/80", objectFit: "cover" }}
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{sale?.product?.nombre}</h3>
        <p className="text-sm text-muted-foreground">
           {sale?.marca}
        </p>
        <p className="text-sm text-muted-foreground">
          Cantidad: {sale?.quantity}
        </p>
        <p className="text-sm text-muted-foreground">
          Medida: {sale?.measure}
        </p>
        <p className="text-sm text-muted-foreground">Fecha: {sale?.date}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">${sale?.totalPrice}</p>
        <p className="text-sm text-muted-foreground">Pago: {sale?.paymentMethod}</p>
        <p className="text-sm text-muted-foreground">Envio: {sale?.shipping}</p>
      </div>
    </div>
  );
};

export default PurchaseProduct;
