import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const TermsModal = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "#0a1e12",
          color: "#fff",
          borderRadius: 8,
          border: "1px solid #238f3e",
          boxShadow: "0 0 30px #1f5733",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ color: "#7cff7c", fontWeight: "bold" }}>
          Official Investment Agreement for Alvand Eco (ALEC) Token Contract
          No.: AE-001 Project Start Date: July 17, 2025
        </Typography>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          whiteSpace: "pre-line",
          fontSize: "14px",
          maxHeight: "70vh",
          overflowY: "auto",
          pr: 2,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4E9F3D",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#0a1e12",
            borderRadius: "8px",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#4E9F3D #0a1e12",
        }}
      >
        {`Article 1 – Parties to the Agreement
This agreement is entered into between:

The Official Owner of Alvand Eco (ALEC) Token – Mr. Alvand Parsa, the owner of the project focused on generating electrical energy from body heat to charge wearable smart devices such as smartphones, AR glasses, and other portable gadgets,

and

The Investor – Any individual or legal entity who accepts the terms of this agreement and proceeds to purchase and invest in the ALEC token.

Article 2 – Subject of the Agreement
The subject of this agreement is investment in the industrial production of smart wearable energy-generating devices powered by body heat.
By purchasing the Alvand Eco (ALEC) token, the investor digitally participates in the project's profits and receives monthly returns based on their investment amount.

Article 3 – Duration and Profit Payments
This agreement is valid for a period of 18 months, starting from July 17, 2025.

Profit payments begin from the first day of the month following the token purchase.

Profits are paid monthly, on the 1st day of each Gregorian month.

Article 4 – Monthly Return Rate
The monthly return rate ranges between 5% to 12% of the invested amount.

The exact percentage is determined individually, based on the investment amount and confirmed wallet address.

Profits are managed and distributed by ALEC_ROBO_1, a smart trading bot active in the global Forex market.

Example: Investments over $5,000 may qualify for monthly returns of 9% to 12%.

Article 5 – Pre-Sale & Discount
Investors who join the project before August 31, 2025, will receive a 2% discount on their initial token purchase.

This discount is applicable only at the time of the initial purchase.

Article 6 – Termination Conditions
Termination of the agreement is not permitted within the first 6 months.

After the 6-month period, early termination is possible upon mutual agreement, and the original investment will be refunded minus the initial discount.

Article 7 – Token Details
The Alvand Eco (ALEC) token is launched on the BEP-20 blockchain with the following official contract address:
🔗 View on BscScan

Article 8 – Payment of Capital and Profits
Investments must be made in USDT to the official project wallet, which will be provided at the time of investor registration.

Monthly profits will be transferred to the investor’s registered wallet or another officially updated address.

Article 9 – Obligations of the Parties
The project owner commits to paying monthly profits as agreed and will provide trading reports of the bot upon request.

The investor agrees to hold the purchased tokens throughout the contract period and refrain from selling or transferring them without prior notice.

Article 10 – Dispute Resolution
In case of any dispute, both parties shall first seek to resolve it through mutual negotiation.
If unsuccessful, an independent and transparent digital arbitration mechanism, agreed upon by both parties, will be employed.

Article 11 – Investment Risk Disclosure
The investor confirms full awareness of the risks of the crypto market, including price volatility and trading bot performance.
The project owner shall not be liable for market-related losses unless there is a breach of this agreement.

Article 12 – Signature and Confirmation
Project Owner: Alvand Parsa Arfa
(Digital Signature)

Investor:
By digitally confirming this agreement, I hereby acknowledge and accept all its terms and conditions.
This confirmation shall serve as a valid digital signature.`}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#238f3e",
            color: "#000",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#1c7b33",
              color: "#fff",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsModal;
