import React from 'react';
import StripeCheckout from "react-stripe-checkout";


const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publisableKey ="pk_test_51Jaim0D0PgBUzPbunBunygeoPSrlcYHaQjwiW66PDr93Hqf2llQe133rQ190sFQ6qiwQUQ6wazMeOUxD8aRdeT1o00RFuqcLIy";

  const onToken = token => {
    console.log(token);
    alert("Payment Successful");
  }
  
  
  return (
    <StripeCheckout
      label="Pay now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      allowRememberMe
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publisableKey}
    />
  )
}

export default StripeCheckoutButton;