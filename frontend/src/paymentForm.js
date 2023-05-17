import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    amount: '',
  });

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/payments', paymentData);

      if (response.data.message === 'Payment processed and created successfully') {
        alert('Payment was successful');
      } else {
        alert('Payment failed');
      }
    } catch (error) {
      console.error('Error occurred while processing payment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        value={paymentData.cardNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="expirationDate"
        placeholder="Expiration Date"
        value={paymentData.expirationDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={paymentData.cvv}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={paymentData.amount}
        onChange={handleChange}
      />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
