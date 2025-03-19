import React from "react";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { loadStripe } from "@stripe/stripe-js";

const PricingCard = ({ card, active, onClick, currentPlan = false }) => {
    const handleCheckout = async () => {
        // Load Stripe.js
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      
        // Call the backend to create a checkout session
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priceId: "price_1R4PjxPFeWozK4w0xh6lAuic" }), // Pass the Stripe Price ID
        });
      
        const session = await response.json();
      
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
          console.error(result.error.message);
        }
      };

  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-4 border ${
        active
          ? "border-[#21ADFD] scale-105 shadow-lg shadow-[##21ADFD]/20"
          : "border-[#0093E87D]"
      } bg-[#217DFE08] backdrop-blur-[70px] rounded-[20px] p-4 transition-all duration-300 cursor-pointer hover:scale-[1.02]`}
    >
      <div className="flex flex-col gap-2">
        <h1 className={`${active ? "text-[#21ACFD]" : "text-white"} text-2xl font-bold transition-colors`}>
          {card.title}
        </h1>
        <p className="text-gray-400 text-sm">{card.description}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-white text-4xl font-bold">{card.price == 0 ? "Free" : `$${card.price}`}</p>
        <p className="text-gray-400 text-sm">\ Per {card.type}</p>
      </div>

      <div className="flex flex-col py-2 gap-2">
        <p className="text-white text-sm">Features</p>
        <div className="w-full h-[1px] bg-gray-700"></div>
      </div>

      <ul className="list-disc list-inside text-gray-400 text-lg">
        {card.features.map((feature) => (
          <li key={feature.id} className="flex items-center gap-2">
            <CheckCircleIcon className={`w-4 h-4 ${active ? "text-[#21ACFD]" : "text-gray-400"}`} />
            {feature.feature}
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        className={`text-white text-lg font-semibold my-4 border ${
          currentPlan
            ? "bg-gradient-to-r from-[#21ACFD] to-[#2174FE] border-transparent"
            : "border-gray-700 bg-[#217DFE08]"
        } backdrop-blur-[70px] rounded-lg items-center justify-center flex gap-2 p-2 transition-all hover:bg-gradient-to-r hover:from-[#21ACFD] hover:to-[#2174FE] hover:border-transparent`}
      >
        {currentPlan ? "Current plan" : "Get Started"}
      </button>
    </div>
  );
};

export default PricingCard;