import NavFooter from "components/NavFooter";
import Referral from "components/referral/Referral";
import React, { useState } from "react";

export default function PaymentForm() {
   const [message, setMessage] = useState("");

   return (
      <NavFooter>
         <Referral />
      </NavFooter>
   );
}
