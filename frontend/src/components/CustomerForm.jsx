import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    customerName: "",
    mobileNo: "",
    address: "",
    products: [{ productName: "", qty: 0, rate: 0, amount: 0 }],
    discount: 0,
    shippingCharges: 0,
    roundOff: 0,
    totalAmount: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/customers/${id}`)
        .then((response) => {
          setCustomer(response.data);
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [id]);

  // Handle input changes for the products
  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...customer.products];

    // Update the field in the specific product being changed
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value,
    };

    // Convert qty and rate to numbers after updating the product state
    const qty = parseFloat(updatedProducts[index].qty) || 0;
    const rate = parseFloat(updatedProducts[index].rate) || 0;

    // Calculate the amount using the updated qty and rate values
    updatedProducts[index].amount = qty * rate;

    // Set the updated product array back into customer state
    setCustomer((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }));
  };

  const handleAddProduct = () => {
    setCustomer((prevState) => ({
      ...prevState,
      products: [
        ...prevState.products,
        { productName: "", qty: 0, rate: 0, amount: 0 },
      ],
    }));
  };

  const calculateTotal = () => {
    const grossAmount = customer.products.reduce(
      (sum, product) => sum + product.amount,
      0
    );
    const total =
      grossAmount - customer.discount + parseFloat(customer.shippingCharges);
    const roundOff = Math.round(total) - total;
    return {
      totalAmount: Math.round(total),
      roundOff: parseFloat(roundOff.toFixed(2)),
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { totalAmount, roundOff } = calculateTotal();

    const updatedCustomer = {
      ...customer,
      totalAmount,
      roundOff,
    };

    if (id) {
      axios
        .put(`http://localhost:5000/api/customers/${id}`, updatedCustomer)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error updating customer:", error));
    } else {
      axios
        .post("http://localhost:5000/api/customers", updatedCustomer)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error creating customer:", error));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-5">
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        GO to List page
      </Link>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-gray-700">
            Customer Name
          </label>
          <input
            id="customerName"
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={customer.customerName}
            onChange={(e) =>
              setCustomer({ ...customer, customerName: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobileNo" className="block text-gray-700">
            Mobile Number
          </label>
          <input
            id="mobileNo"
            type="text"
            name="mobileNo"
            placeholder="Mobile Number"
            value={customer.mobileNo}
            onChange={(e) =>
              setCustomer({ ...customer, mobileNo: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {customer.products.map((product, index) => (
          <div key={index} className="flex mb-4 grid-rows-4 gap-4">
            <div>
              <label
                htmlFor={`productName-${index}`}
                className="block text-gray-700"
              >
                Product Name
              </label>
              <input
                id={`productName-${index}`}
                type="text"
                name="productName"
                placeholder="Product Name"
                value={product.productName}
                onChange={(e) => handleProductChange(index, e)}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor={`qty-${index}`} className="block text-gray-700">
                Quantity
              </label>
              <input
                id={`qty-${index}`}
                type="number"
                name="qty"
                placeholder="Quantity"
                value={product.qty}
                onChange={(e) => handleProductChange(index, e)}
                className="p-2 border border-gray-300 rounded w-24"
              />
            </div>
            <div>
              <label htmlFor={`rate-${index}`} className="block text-gray-700">
                Rate
              </label>
              <input
                id={`rate-${index}`}
                type="number"
                name="rate"
                placeholder="Rate"
                value={product.rate}
                onChange={(e) => handleProductChange(index, e)}
                className="p-2 border border-gray-300 rounded w-24"
              />
            </div>
            <div>
              <label
                htmlFor={`amount-${index}`}
                className="block text-gray-700"
              >
                Amount
              </label>
              <input
                id={`amount-${index}`}
                type="number"
                name="amount"
                placeholder="Amount"
                value={product.amount}
                readOnly
                className="p-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
          </div>
        ))}

        <div className="mb-4">
          <button
            type="button"
            onClick={handleAddProduct}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="discount" className="block text-gray-700">
            Discount
          </label>
          <input
            id="discount"
            type="number"
            name="discount"
            placeholder="Discount"
            value={customer.discount}
            onChange={(e) =>
              setCustomer({
                ...customer,
                discount: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="shippingCharges" className="block text-gray-700">
            Shipping Charges
          </label>
          <input
            id="shippingCharges"
            type="number"
            name="shippingCharges"
            placeholder="Shipping Charges"
            value={customer.shippingCharges}
            onChange={(e) =>
              setCustomer({
                ...customer,
                shippingCharges: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="roundOff" className="block text-gray-700">
            Round Off
          </label>
          <input
            id="roundOff"
            type="number"
            name="roundOff"
            placeholder="Round Off"
            value={customer.roundOff}
            onChange={(e) =>
              setCustomer({
                ...customer,
                roundOff: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
