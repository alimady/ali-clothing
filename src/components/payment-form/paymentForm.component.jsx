import { CardElement } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer } from "./paymentForm.style";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import axios from "axios";

const configureCardElement = {
  iconStyle: "solid",
  style: {
    base: {
      fontSize: "16px",
    },
  },
  hidePostalCode: true,
};

const PaymentForm = () => {
  const elements = useElements();
 
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const response = await stripe.confirmCardPayment(clientSecret.toString(),{
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Ali mady',
        },
      },
      
     });

    if (
      (response.error && response.error.type === "card_error") ||
      (response.error && response.error.type === "validation_error")
    ) {
      setMessage(response.error.message);
    } else if (response.paymentIntent.id) {
      //display success message or redirect user
    }

    setIsProcessing(false);
  };
  const [clientSecret, setClientSecret] = useState("");
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/orders/stripe/payment-intent",
          { total: total, currency: "jpy" }
        );
        console.log('response',response)
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log('oops',error);
      }
    };
    fetchData()
    // Create PaymentIntent as soon as the page loads
  }, []);
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={handleSubmit}>
        <h3>Credit card Payment</h3>
        <CardElement options={configureCardElement} />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>PAY NOW</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
