import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  StepConnector,
  Link,
} from "@mui/material";
import styles from "./TokenPresalePage.module.css";
import "react-phone-input-2/lib/style.css";

import { textFieldStyles } from "../helpers/FormInputsStyles";
import TermsModal from "../Components/TermsModal";
import AnimatedBackground from "../Components/AnimatedBackground";
import dropDownStyles from "../helpers/InputDropDownStyle";
const TOKEN_PRICE = 0.1;
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import { StepperStyels } from "../helpers/StepperStyles";
import { isValidPhoneNumber } from "libphonenumber-js";
import api from "../services/Config";
import { BeatLoader } from "react-spinners";
import CustomAlert from "../Components/CustomAlert";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-root`]: {
    top: 10,
  },
  [`& .MuiStepConnector-line`]: {
    borderColor: "rgb(0, 128, 32)",
    borderTopWidth: 3,
  },
}));

const steps = ["Investment Details", "Payment Code", "Confirmation"];

const TokenPresalePage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    network: "",
    walletAddress: "",
    walletNetwork: "",
    amountUSDT: "",
    tokenQuantity: 0,
    agreeTerms: false,
    transactionCode: "",
  });

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [formStep, setFormStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    state: false,
    message: "",
  });
  useEffect(() => {
    if (form.amountUSDT && !isNaN(form.amountUSDT)) {
      setForm((prev) => ({
        ...prev,
        tokenQuantity: (parseFloat(prev.amountUSDT) / TOKEN_PRICE).toFixed(2),
      }));
    } else {
      setForm((prev) => ({ ...prev, tokenQuantity: 0 }));
    }
  }, [form.amountUSDT]);

  useEffect(() => {
    if (showAlert.show) {
      const setTime = setTimeout(() => {
        setShowAlert((prev) => ({ ...prev, show: false }));
      }, 2000);
      return () => clearTimeout(setTime);
    }
  }, [showAlert]);

  const amountHandler = (e) => {
    const value = e.target.value;
    const onlyDigits = /^\d*$/;
    if (onlyDigits.test(value)) {
      setForm({ ...form, amountUSDT: value });
    }
  };

  const validate = (step) => {
    const newErrors = {};
    if (step == 0) {
      if (!form.fullName) newErrors.fullName = "Full name is required";
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
        newErrors.email = "Please enter a valid email address";
      if (!form.walletAddress) {
        newErrors.walletAddress = "Wallet address is required";
      }
      if (!form.network) newErrors.network = "Please select a payment network";
      if (!form.amountUSDT || isNaN(form.amountUSDT)) {
        newErrors.amountUSDT = "Please enter a valid amount";
      } else if (parseFloat(form.amountUSDT) < 1) {
        newErrors.amountUSDT = "Minimum purchase is 10 tokens";
      }
      if (!form.walletNetwork)
        newErrors.walletNetwork = "Please select a network";
      if (!form.agreeTerms)
        newErrors.agreeTerms = "You must agree to the terms";
      if (form.phoneNumber.length > 3) {
        !isValidPhoneNumber("+" + form.phoneNumber)
          ? (newErrors.phoneNumber = "Plaese enter a valid phone number")
          : null;
      } else if (step == 1) {
        if (!form.transactionCode)
          newErrors.transactionCode = "Transaction code is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formStep)) return;

    formStep < 2 && setFormStep((prev) => prev + 1);
    if (formStep == 2) {
      setIsLoading(true);

      let formData = {
        user_name: form.fullName.trim(),
        email: form.email.trim(),
        payment_network: form.network.trim(),
        user_wallet_address: form.walletAddress.trim(),
        user_wallet_network: "TRC20",
        amount_usdt: form.amountUSDT.trim(),
        transaction_code: form.transactionCode.trim(),
      };

      isValidPhoneNumber("+" + form.phoneNumber)
        ? (formData.phone_number = form.phoneNumber)
        : null;
      try {
        const res = await api.post("/presale/", formData);
        if (res.data) {
          setFormStep((prev) => prev + 1);
          setShowAlert({
            show: true,
            state: true,
            message: "Your request has been submitted successfully",
          });
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setShowAlert({
          show: true,
          state: false,
          message: "Network error. Please try again later",
        });
        console.log(error);
      }
    }
  };

  return (
    <div>
      <AnimatedBackground />

      <Box className={styles.authContainer}>
        <Typography variant="h5" align="center" className={styles.formTitle}>
          Token Presale
        </Typography>
        <Box sx={{ width: "100%", marginBottom: "1rem" }}>
          <Stepper
            activeStep={formStep}
            alternativeLabel
            connector={<CustomConnector />}
          >
            {steps.map((label) => (
              <Step key={label} sx={StepperStyels}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box component="form" className={styles.form} onSubmit={handleSubmit}>
          {formStep == 0 && (
            <Step1
              form={form}
              setForm={setForm}
              errors={errors}
              amountHandler={amountHandler}
              setShowTermsModal={setShowTermsModal}
              setShowAlert={setShowAlert}
            />
          )}

          {formStep == 1 && (
            <Step2 form={form} setForm={setForm} errors={errors} />
          )}

          {formStep == 2 && (
            <Step3 form={form} setForm={setForm} errors={errors} />
          )}

          {formStep == 3 && (
            <>
              <p className={styles.successStepText}>
                Thank you for completing your investment form. Your transaction
                is being processed, and you will receive a confirmation email
                shortly with all the payment and investment details.
              </p>{" "}
            </>
          )}

          <Button
            variant="contained"
            type="submit"
            className={styles.submitBtn}
            sx={{
              backgroundColor: "#238f3e",
              color: "#000",
              fontWeight: "bold",
              boxShadow: "0 0 12px rgb(0, 62, 34)",
              height: "55px",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: "#238f3e",
                boxShadow: "0 0 20px rgb(0, 75, 41)",
              },
            }}
          >
            {isLoading ? (
              <BeatLoader size={"10"} color="#002c0f" />
            ) : formStep == 0 ? (
              "Continue"
            ) : formStep == 1 ? (
              "Confirm Code"
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
        {showAlert.show ? <CustomAlert showAlert={showAlert} /> : null}
        <TermsModal
          open={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        />
      </Box>
    </div>
  );
};

const Step1 = ({
  form,
  setForm,
  errors,
  amountHandler,
  setShowTermsModal,
  setShowAlert,
}) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowAlert({
        show: true,
        state: true,
        message: "Wallet address copied to clipboard!",
      });
    });
  };
  return (
    <>
      <TextField
        label="Full Name"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        fullWidth
        required
        error={!!errors.fullName}
        helperText={errors.fullName}
        sx={textFieldStyles}
      />
      <TextField
        label="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        fullWidth
        required
        error={!!errors.email}
        helperText={errors.email}
        sx={textFieldStyles}
      />
      <div className={styles.phoneWrapper}>
        <label className={styles.phoneLabel}>Phone Number</label>
        <PhoneInput
          required
          country={"us"}
          value={form.phoneNumber}
          onChange={(value) =>
            setForm((form) => ({ ...form, phoneNumber: value }))
          }
          enableSearch
          inputStyle={{ width: "100%" }}
          inputClass={`${styles.phoneInput} ${
            errors.phoneNumber ? styles.phoneInputError : ""
          }`}
          specialLabel=""
          buttonClass={`${styles.buttonContainer} ${
            errors.phoneNumber ? styles.phoneInputError : ""
          }`}
          dropdownClass={styles.dropdownContainer}
          searchClass={styles.searchContainer}
          searchStyle={styles.searchinputContainer}
        />
        {errors.phoneNumber ? (
          <span className={styles.helpertextPhoneInput}>
            Please enter a valid phone number.
          </span>
        ) : null}
      </div>
      <div className={styles.UserwalletCon}>
        <TextField
          className={styles.walletAddress}
          label="Your Wallet Address"
          value={form.walletAddress}
          onChange={(e) => setForm({ ...form, walletAddress: e.target.value })}
          fullWidth
          required
          error={!!errors.walletAddress}
          helperText={
            errors.walletAddress
              ? errors.walletAddress
              : "This address will be used for profit distribution"
          }
          sx={textFieldStyles}
        />
        {form.walletAddress.length > 0 && (
          <select
            className={`${styles.walletNetwork} ${
              errors.walletNetwork ? styles.walletNetworkError : ""
            }`}
            value={form.walletNetwork}
            onChange={(e) =>
              setForm({ ...form, walletNetwork: e.target.value })
            }
          >
            <option value="" disabled>
              Network
            </option>
            <option value="TRC20">TRC20</option>
            <option value="BEP20">BEP20</option>
          </select>
        )}
      </div>

      <TextField
        label="Amount in USDT"
        value={form.amountUSDT}
        onChange={amountHandler}
        fullWidth
        required
        error={!!errors.amountUSDT}
        helperText={errors.amountUSDT}
        sx={textFieldStyles}
      />

      <div className={styles.TokenDetailsCon}>
        <div
          className={`${styles.TokenQuantity} ${styles.tokenDetailsGlobalStyels}`}
        >
          <p>{form.tokenQuantity}</p>
        </div>
        <div
          className={`${styles.TokenPrice} ${styles.tokenDetailsGlobalStyels}`}
        >
          <p>{TOKEN_PRICE} USDT</p>
        </div>
      </div>

      <TextField
        select
        label="Select Payment Network"
        value={form.network}
        onChange={(e) => {
          setForm({ ...form, network: e.target.value });
        }}
        fullWidth
        required
        error={!!errors.network}
        helperText={errors.network}
        sx={{
          ...textFieldStyles,
          "& .MuiInputBase-input": {
            color: "#ccffcc",
            fontFamily: "inherit",
            "@media (max-width:600px)": {
              fontSize: "0.75rem",
              paddingTop: "10px",
              paddingBottom: "20px",
              height: "10px",
              minHeight: "0 !important",
            },
          },
        }}
        SelectProps={dropDownStyles}
      >
        <MenuItem value="TRC20">TRC20</MenuItem>
        <MenuItem value="BEP20">BEP20</MenuItem>
      </TextField>

      {form.network.length ? (
        <div>
          <div className={styles.walletCon}>
            <p>
              {form.network === "TRC20"
                ? "TXMTej3ecvp5nnJRufbhBoRGNygjubrrZa"
                : "0x887b46aBb77B372aC7ae2d4F75C1f93890C31827"}
            </p>
          </div>
          <button
            className={styles.CopyBtn}
            onClick={(e) => {
              e.preventDefault();
              e.target.textContent = "Copied !";
              setTimeout(() => {
                e.target.textContent = "Copy Address";
              }, 900);
              copyToClipboard(
                form.network === "TRC20"
                  ? "TXMTej3ecvp5nnJRufbhBoRGNygjubrrZa"
                  : "0x887b46aBb77B372aC7ae2d4F75C1f93890C31827"
              );
            }}
          >
            Copy Address
          </button>
        </div>
      ) : null}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.agreeTerms}
              onChange={(e) =>
                setForm({ ...form, agreeTerms: e.target.checked })
              }
              sx={{
                color: errors.agreeTerms ? "red" : "#4E9F3D",
                "&.Mui-checked": {
                  color: "#4E9F3D",
                },
              }}
            />
          }
          label={
            <span className={styles.checkboxLable}>
              I agree to the{" "}
              <span
                className={styles.conditionTxt}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTermsModal(true);
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                terms and conditions
              </span>
            </span>
          }
        />

        {errors.agreeTerms && (
          <Typography variant="caption" color="error">
            {errors.agreeTerms}
          </Typography>
        )}
      </div>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          color: "#ccffcc",
          padding: "12px",
          borderRadius: "8px",
          mb: 3,
          textAlign: "center",
          fontSize: "14px",
          border: "1px solid rgba(255,255,255,0.1)",
          marginBottom: "0px",
        }}
        className={styles.AboutToken}
      >
        Learn more about our token presale by{" "}
        <Link
          href="https://blog.alecplus.tech/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#a0ffa0", textDecorationColor: "#a0ffa0" }}
        >
          visiting our blog
        </Link>
        .
      </Box>
    </>
  );
};

const Step2 = ({ form, errors, setForm }) => {
  return (
    <>
      <TextField
        label="Transaction Confirmation Code"
        value={form.transactionCode}
        onChange={(e) => setForm({ ...form, transactionCode: e.target.value })}
        fullWidth
        required
        error={!!errors.transactionCode}
        helperText={errors.transactionCode}
        sx={textFieldStyles}
      />
    </>
  );
};

const Step3 = ({ form }) => {
  return (
    <>
      <div className={styles.paymentDetailsCon}>
        <div>
          <p>Full Name :</p> <span>{form.fullName}</span>
        </div>
        <div>
          <p>Email : </p> <span>{form.email}</span>
        </div>
        {form.phoneNumber && (
          <div>
            <p>Phone Number : </p> <span>{`+${form.phoneNumber}`}</span>
          </div>
        )}
        <div>
          <p>Wallet Address : </p> <span>{form.walletAddress}</span>
        </div>
        <div>
          <p>Amount in USDT :</p> <span>{form.amountUSDT}</span>
        </div>
        <div>
          <p>Token Quantity : </p> <span>{form.tokenQuantity}</span>
        </div>
        <div>
          <p>Payment Network :</p> <span>{form.network}</span>
        </div>
        <div>
          <p>Transaction Code :</p> <span>{form.transactionCode}</span>
        </div>
      </div>
    </>
  );
};

export default TokenPresalePage;
