import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/features/cartSlice";
import { updateItem } from "../../services/cartServicer";
import { RootState } from "../../redux/store";
import { BuyProduct } from "../../utils/interfaces";
import {
	incrementQuantity,
	decrementQuantity,
} from "../../redux/features/cartSlice";
interface CartItemProps {
	item: BuyProduct;
	index: number;

}
import { Link } from "react-router-dom";

const CartItem = ({ item, index }: CartItemProps) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user.userLogin.user);
	const product = useSelector((state:RootState)=> state.product.products)
	const items = useSelector(
		(state: RootState) => state.cart.cartItems.productID
	);

	// const product: any = {
	// 	data: [...products],
	// };

	// console.log(product);
	const productFound = product.find( match => match.id === item.id)

	const handleRemoveFromCart = async (item: BuyProduct) => {
		const arrayID = items.map((item: BuyProduct) => {
			return {
				productId: item.id,
				quantity: item.quantity,
			};
		});
		dispatch(removeFromCart(item.id));
		await updateItem(Number(user.id), arrayID);
	};

	const handleIncrementQuantity = () => {
			dispatch(incrementQuantity(item.id));
		
		// product.data[index].unities = product.data[index].unities - 1;
	};

	const handleDecrementQuantity = () => {
		dispatch(decrementQuantity(item.id));
		//setUnities(unities + 1)
	};

	return (
		<div key={index} className="cart-detail-container">
			<div className="cart-image-container">
				<Link to={`/product/detail/${item.id}`}>
					<img className="cart-detail-image" src={item.image} alt={item.name} />
				</Link>
			</div>

			<div className="cart-detail-div-section">
				<section className="cart-detail-section">
					<h4>Nombre</h4>
					<p>{item.name}</p>
				</section>

				<section className="cart-detail-section">
					<h4>Precio</h4>
					<p>{item.price * item.quantity}</p>
				</section>

				<section className="cart-detail-section">
					<h4>Cantidad</h4>
					<div className="cart-detail-quantity">
						<button
							onClick={handleDecrementQuantity}
							className="cart-detail-btn-quantity"
							//disabled={products[index]?.unities === 0 ? true : false}
						>
							-
						</button>
						<p>{item.quantity}</p>
						<button
							onClick={handleIncrementQuantity}
							disabled={productFound!.unities > item.quantity ? false : true}
							className="cart-detail-btn-quantity"
							// disabled={product.data[index]?.unities === 0 ? true : false}
						>
							+
						</button>
					</div>
				</section>
				<button
					className="cart-detail-btn"
					onClick={() => handleRemoveFromCart(item)}
				>
					X
				</button>
			</div>
		</div>
	);
};

export default CartItem;
