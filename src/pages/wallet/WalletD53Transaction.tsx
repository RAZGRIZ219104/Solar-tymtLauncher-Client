import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import tymt from "../../assets/main/newlogohead.png";
import solar from "../../assets/chains/solar.svg";
import close from "../../assets/settings/x-icon.svg";
import d53 from "../../lib/game/district 53/logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  setMountedFalse,
  setMountedTrue,
} from "../../features/chat/Chat-intercomSupportSlice";
import {
  selectNotification,
  setNotification,
} from "../../features/settings/NotificationSlice";
import {
  languageType,
  notificationType,
  walletType,
} from "../../types/settingTypes";
import { ICurrency, multiWalletType } from "../../types/walletTypes";
import { getMultiWallet } from "../../features/wallet/MultiWalletSlice";
import { invoke } from "@tauri-apps/api/tauri";
import InputText from "../../components/account/InputText";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { nonCustodialType } from "../../types/accountTypes";
import { getNonCustodial } from "../../features/account/NonCustodialSlice";
import createKeccakHash from "keccak";
import { getCurrency } from "../../features/wallet/CurrencySlice";
import { currencySymbols } from "../../consts/currency";
import numeral from "numeral";
import { selectWallet, setWallet } from "../../features/settings/WalletSlice";
import SettingStyle from "../../styles/SettingStyle";
import { ISendTransactionReq } from "../../types/eventParamTypes";
import { emit, listen } from "@tauri-apps/api/event";
import TransactionProviderAPI from "../../lib/api/TransactionProviderAPI";
import { selectLanguage } from "../../features/settings/LanguageSlice";

const WalletD53Transaction = () => {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const notificationStore: notificationType = useSelector(selectNotification);
  const multiWalletStore: multiWalletType = useSelector(getMultiWallet);
  const nonCustodialStore: nonCustodialType = useSelector(getNonCustodial);
  const currencyStore: ICurrency = useSelector(getCurrency);
  const walletStore: walletType = useSelector(selectWallet);
  const langStore: languageType = useSelector(selectLanguage);
  const reserve: number = currencyStore.data[currencyStore.current] as number;
  const price: Number = multiWalletStore.Solar.chain.price;
  const symbol: string = currencySymbols[currencyStore.current];
  const classname = SettingStyle();
  const [copied, setCopied] = useState<boolean>(false);
  const [chain, setChain] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required(t("cca-63_required"))
        .test(
          "checks",
          t("cca-65_please-signup-import"),
          (_value) =>
            nonCustodialStore.password !== "" &&
            nonCustodialStore.mnemonic !== ""
        )
        .test(
          "equals",
          t("cca-60_wrong-password"),
          (value) =>
            createKeccakHash("keccak256").update(value).digest("hex") ===
            nonCustodialStore.password
        ),
    }),
    onSubmit: () => {
      handleApproveClick();
    },
  });

  const handleApproveClick = async () => {
    setLoading(true);
    let res: any;
    try {
      res = await TransactionProviderAPI.sendTransaction(
        chain,
        to,
        amount,
        formik.values.password,
        walletStore.fee
      );
    } catch (err) {
      console.error("Failed to TransactionProviderAPI.sendTransaction: ", err);
      res = {
        status: "failed",
        title: "Send SXP",
        message: err.toString(),
      };
    }
    emit("res-POST-/send-transaction", res);
    setTo("");
    setAmount("");
    setChain("");
    invoke("hide_transaction_window");
    setLoading(false);
    setExpired(true);
  };

  const handleRejectClick = async () => {
    let res = {
      status: "failed",
      title: "Send SXP",
      message: "Request rejected",
    };
    emit("res-POST-/send-transaction", res);
    setTo("");
    setAmount("");
    setChain("");
    invoke("hide_transaction_window");
    setExpired(true);
  };

  const getShortAddr: (_: string) => string = (_wallet: string) => {
    return (
      _wallet.substring(0, 10) + "..." + _wallet.substring(_wallet.length - 10)
    );
  };

  useEffect(() => {
    changeLanguage(langStore.language);
  }, [langStore.language]);

  useEffect(() => {
    dispatch(setMountedTrue());
    dispatch(
      setNotification({
        ...notificationStore,
        alert: false,
      })
    );

    return () => {
      dispatch(setMountedFalse());
      dispatch(
        setNotification({
          ...notificationStore,
          alert: true,
        })
      );
    };
  }, [dispatch]);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  useEffect(() => {
    const unlisten_send_transaction = listen(
      "POST-/send-transaction",
      async (event) => {
        const json_data: ISendTransactionReq = JSON.parse(
          event.payload as string
        );
        const { chain, to, amount } = json_data;
        setChain(chain);
        setTo(to);
        setAmount(amount);
        setExpired(false);
        setTimeLeft(30);
      }
    );

    return () => {
      unlisten_send_transaction.then((unlistenFn) => unlistenFn());
    };
  }, []);

  useEffect(() => {
    if (!expired) {
      let checkActivityIntervalId = setInterval(() => {
        if (Date.now() - lastActivity >= 5 * 1e3) {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        } else {
          setTimeLeft(30);
        }
      }, 1 * 1e3);

      return () => {
        clearInterval(checkActivityIntervalId);
      };
    }
  }, [expired, lastActivity]);

  useEffect(() => {
    if (timeLeft < 0) {
      handleRejectClick();
    }
  }, [timeLeft]);

  useEffect(() => {
    setLastActivity(Date.now());
  }, [formik.values.password, walletStore.fee]);

  return (
    <Stack
      width={"440px"}
      sx={{
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.20)",
        background: "#071516",
        boxShadow: "0px 0px 4px 0px rgba(255, 255, 255, 0.10)",
        backdropFilter: "blur(10px)",
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          height={"64px"}
          padding={"0px 16px"}
        >
          <Box component={"img"} src={tymt} width={"40px"} height={"38px"} />
          <Tooltip
            placement="bottom"
            title={
              <Stack
                spacing={"10px"}
                sx={{
                  marginBottom: "-20px",
                  backgroundColor: "rgb(49, 53, 53)",
                  padding: "6px 8px",
                  borderRadius: "32px",
                  border: "1px solid rgb(71, 76, 76)",
                }}
              >
                <Box className="fs-12-regular white">
                  {multiWalletStore.Solar.chain.wallet}
                </Box>
              </Stack>
            }
            PopperProps={{
              sx: {
                [`& .MuiTooltip-tooltip`]: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              },
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              padding={"8px"}
              gap={"8px"}
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.10)",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              <Box
                component={"img"}
                src={solar}
                width={"16px"}
                height={"16px"}
              />
              <Box className={"fs-16-regular white"}>
                {getShortAddr(multiWalletStore.Solar.chain.wallet)}
              </Box>
            </Stack>
          </Tooltip>
          <Box
            component={"img"}
            src={close}
            width={"24px"}
            height={"24px"}
            onClick={handleRejectClick}
            sx={{
              cursor: "pointer",
            }}
          />
        </Stack>
        <Stack
          sx={{
            padding: "24px",
            gap: "24px",
            borderRadius: "16px",
            background: "rgb(16, 30, 30)",
          }}
        >
          <Box className={"fs-24-regular white t-center"}>
            {t("wal-61_tx-request")}
          </Box>
          <Stack
            sx={{
              padding: "24px 16px",
              gap: "16px",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(50px)",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
              <Box component={"img"} src={d53} width={"60px"} height={"40px"} />
              <Box className={"fs-20-regular white"}>{`D53 Metaverse`}</Box>
            </Stack>
            <Box
              className={"fs-16-regular white"}
            >{`"Text Transaction explanation 1 paragraph"`}</Box>
            <Stack
              sx={{
                borderTop: "1px solid rgba(255, 255, 255, 0.10)",
              }}
            />
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box className={"fs-16-regular light"}>
                {t("wal-62_recipient")}
              </Box>

              <Tooltip
                placement="bottom"
                title={
                  <Stack
                    spacing={"10px"}
                    sx={{
                      marginBottom: "-20px",
                      backgroundColor: "rgb(49, 53, 53)",
                      padding: "6px 8px",
                      borderRadius: "32px",
                      border: "1px solid rgb(71, 76, 76)",
                    }}
                  >
                    <Box className="fs-12-regular white">
                      {!copied && to}
                      {copied && t("wal-66_copied-to-clipboard")}
                    </Box>
                  </Stack>
                }
                PopperProps={{
                  sx: {
                    [`& .MuiTooltip-tooltip`]: {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                  },
                }}
              >
                <Box
                  className={"fs-16-regular white"}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      multiWalletStore.Solar.chain.wallet
                    );
                    setCopied(true);
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {getShortAddr(to)}
                </Box>
              </Tooltip>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Box className={"fs-16-regular light"}>{t("wal-63_amount")}</Box>
              <Stack>
                <Box
                  className={"fs-16-regular white t-right"}
                  onClick={() => {
                    navigator.clipboard.writeText("12");
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >{`${amount} SXP`}</Box>
                <Box
                  className={"fs-14-regular light t-right"}
                >{`${symbol} ${numeral(
                  Number(amount) * Number(price) * Number(reserve)
                ).format("0,0.000")}`}</Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              padding: "16px 16px",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(50px)",
            }}
          >
            <Box className={"fs-16-regular light"}>{`${t(
              "wal-64_gas-fee"
            )}:`}</Box>
            <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
              <TextField
                type="text"
                id="outlined-adornment-weight"
                placeholder="0.0"
                InputProps={{
                  inputMode: "numeric",
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      classes={{ root: classname.adornment }}
                    >
                      {symbol}
                    </InputAdornment>
                  ),
                  classes: {
                    input: classname.input,
                  },
                }}
                value={numeral(
                  Number(walletStore.fee) * Number(reserve)
                ).format("0,0.0000")}
                onChange={(e) => {
                  dispatch(
                    setWallet({
                      ...walletStore,
                      status: "input",
                      fee: Number(e.target.value) / Number(reserve),
                    })
                  );
                }}
                className={classname.input}
              />
            </Stack>
          </Stack>
          <InputText
            id="non-custodial-login"
            label={t("ncl-4_your-password")}
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password ? true : false
            }
          />
          <Stack gap={"16px"}>
            <Button
              fullWidth
              type="submit"
              disabled={
                formik.errors.password ||
                Number(walletStore.fee) < 0 ||
                loading ||
                !formik.touched.password
                  ? true
                  : false
              }
              className="red-button"
            >
              {!loading && (
                <Box className={"fs-16-regular"}>{t("wal-34_approve")}</Box>
              )}
              {loading && (
                <CircularProgress
                  sx={{
                    color: "#F5EBFF",
                  }}
                />
              )}
            </Button>
            <Button
              fullWidth
              onClick={handleRejectClick}
              disabled={
                formik.errors.password ||
                Number(walletStore.fee) < 0 ||
                loading ||
                !formik.touched.password
                  ? true
                  : false
              }
              className="red-border-button"
            >
              <Box className={"fs-16-regular"}>{`${t(
                "wal-65_reject"
              )} (${timeLeft} s)`}</Box>
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default WalletD53Transaction;
