import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { thumbnail, title, price, id, description, rating } = product;

  return (
    <Link to={`/product/${id}`} className="h-80">
      <div className="transition-shadow h-80 flex flex-col rounded-md hover:shadow-md hover:shadow-gray-300">
        <div className="h-1/2">
          <img
            className="w-full h-full rounded-t-md object-fill"
            src={thumbnail}
            alt="product-image"
            loading="lazy"
          />
        </div>
        <div className="p-2 h-1/2 flex flex-col justify-between gap-2 items-start">
          <div className="w-full">
            <div className="font-bold">{title}</div>
            <Rating defaultValue={rating} precision={0.1} readOnly />
            <div className="w-full overflow-clip whitespace-nowrap overflow-ellipsis">
              {description}
            </div>
          </div>
          <div className="px-2 rounded-xl border-2 border-black">$ {price}</div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
