const Payment = require('../models/Payment');
const paymentService = require('../app');

exports.createPayment = async (req, res) => {
  const paymentData = req.body;

  try {
    // Check if the payment is valid
    const isValidPayment = await paymentService.processPayment(paymentData);

    if (!isValidPayment) {
      return res.status(400).json({ message: 'Payment could not be processed' });
    }

    const newPayment = new Payment(paymentData);
    await newPayment.save();

    res.status(201).json({ message: 'Payment processed and created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while creating the payment' });
  }
};

exports.getPayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching the payment' });
  }
};

exports.updatePayment = async (req, res) => {
  const { paymentId } = req.params;
  const updateData = req.body;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Payment to be updated not found' });
    }

    Object.assign(payment, updateData);
    await payment.save();

    res.status(200).json({ message: 'Payment updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while updating the payment' });
  }
};

exports.deletePayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'The payment to be deleted was not found' });
    }

    await payment.remove();

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while deleting the payment' });
  }
};
