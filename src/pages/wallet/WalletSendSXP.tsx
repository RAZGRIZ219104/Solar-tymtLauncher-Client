import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import createKeccakHash from "keccak";

import { currencySymbols } from "../../consts/SupportCurrency";

import tymtCore from "../../lib/core/tymtCore";

import { useNotification } from "../../providers/NotificationProvider";

import AnimatedComponent from "../../components/AnimatedComponent";
import InputText from "../../components/account/InputText";
import InputBox from "../../components/wallet/InputBox";
import AddressBookDrawer from "../../components/wallet/AddressBookDrawer";
import TransactionFeeDrawer from "../../components/wallet/TransactionFeeDrawer";
import ChooseChainDrawer from "../../components/wallet/ChooseChainDrawer";

import { Grid, Box, Stack, IconButton, Button, Menu, MenuItem } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { AppDispatch } from "../../store";
import { getAccount } from "../../features/account/AccountSlice";
import { getChain, setChainAsync } from "../../features/wallet/ChainSlice";
import { INotification, selectPending, sendCoinAsync } from "../../features/wallet/CryptoSlice";
import { getNonCustodial } from "../../features/account/NonCustodialSlice";
import { getCurrencyList } from "../../features/wallet/CurrencyListSlice";
import { getCurrentCurrency } from "../../features/wallet/CurrentCurrencySlice";
import { getWalletSetting } from "../../features/settings/WalletSettingSlice";

import SettingStyle from "../../styles/SettingStyle";

import walletIcon from "../../assets/wallet.svg";

import { IRecipient, ISendCoin, ISendCoinData } from "../../features/wallet/CryptoApi";
import { getPriceData } from "../../features/wallet/ChainApi";
import { formatBalance } from "../../lib/helper";

import { IChain, ICurrencyList, ICurrentCurrency } from "../../types/walletTypes";
import { nonCustodialType, walletEnum } from "../../types/accountTypes";
import { IWalletSetting } from "../../types/settingTypes";

interface IPriceData {
  price: string;
  balance: string;
  label: string;
  logo: string;
}

const WalletSendSXP = () => {
  const { t } = useTranslation();
  const classname = SettingStyle();
  const dispatch = useDispatch<AppDispatch>();

  const pending = useSelector(selectPending);
  const accountStore = useSelector(getAccount);
  const nonCustodialStore: nonCustodialType = useSelector(getNonCustodial);
  const chainStore: IChain = useSelector(getChain);
  const currencyListStore: ICurrencyList = useSelector(getCurrencyList);
  const currentCurrencyStore: ICurrentCurrency = useSelector(getCurrentCurrency);
  const walletSettingStore: IWalletSetting = useSelector(getWalletSetting);

  const [addressBookView, setAddressBookView] = useState<boolean>(false);
  const [transactionFeeView, setTransactionFeeView] = useState<boolean>(false);
  const [chooseChainView, setChooseChainView] = useState<boolean>(false);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [draft, setDraft] = useState<IRecipient[]>([]);
  const [password, setPassword] = useState("");

  const reserve: number = useMemo(
    () => currencyListStore?.list?.find((one) => one?.name === currentCurrencyStore?.currency)?.reserve,
    [currencyListStore, currentCurrencyStore]
  );
  const symbol: string = useMemo(() => currencySymbols[currentCurrencyStore?.currency], [currentCurrencyStore]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [priceData, setPriceData] = useState<IPriceData>();
  const [options, setOptions] = useState([]);
  const open = Boolean(anchorEl);

  const { setNotificationStatus, setNotificationTitle, setNotificationDetail, setNotificationOpen, setNotificationLink } = useNotification();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateDraft = useCallback(() => {
    if (address === "" || amount === "") return;

    let currentToken: {
      address: string;
      symbol: string;
      logo: string;
      decimals: Number;
    };
    if (chainStore.currentToken === "chain") {
      currentToken = {
        address: chainStore.chain.address,
        symbol: chainStore.chain.symbol,
        logo: chainStore.chain.logo,
        decimals: chainStore.chain.decimals,
      };
    } else {
      const temp = chainStore.tokens.find((element) => element.symbol === chainStore.currentToken);
      currentToken = {
        address: temp.address,
        symbol: temp.symbol,
        logo: temp.logo,
        decimals: temp.decimals,
      };
    }
    const newItem: IRecipient = {
      address: address,
      amount: amount,
      chainSymbol: chainStore.chain.symbol,
      tokenSymbol: currentToken.symbol,
      tokenAddr: currentToken.address,
      tokenDecimals: currentToken.decimals,
      icon: currentToken.logo,
    };

    let recipientAddrIsValid: boolean = false;
    if (chainStore.chain.name === tymtCore.Blockchains.solar.name) {
      recipientAddrIsValid = tymtCore.Blockchains.solar.wallet.validateAddress(newItem.address);
    } else if (chainStore.chain.name === tymtCore.Blockchains.btc.name) {
      recipientAddrIsValid = tymtCore.Blockchains.btc.wallet.validateAddress(newItem.address);
    } else if (chainStore.chain.name === tymtCore.Blockchains.solana.name) {
      recipientAddrIsValid = tymtCore.Blockchains.solana.wallet.validateAddress(newItem.address);
    } else {
      recipientAddrIsValid = tymtCore.Blockchains.eth.wallet.validateAddress(newItem.address);
    }
    if (!recipientAddrIsValid) {
      setNotificationStatus("failed");
      setNotificationTitle(t("alt-22_invalid-address"));
      setNotificationDetail(t("alt-23_invalid-address-intro"));
      setNotificationOpen(true);
      setNotificationLink(null);
      return;
    }

    setDraft([...draft, newItem]);
  }, [draft, setDraft, address, amount, chainStore]);

  const handleTransfer = useCallback(async () => {
    if (accountStore.wallet === walletEnum.noncustodial) {
      let params: ISendCoinData = {
        passphrase: password,
        fee: walletSettingStore?.fee,
        recipients: draft,
      };
      if (draft.length > 0) {
        params.recipients = draft;
      } else {
        let currentToken: {
          address: string;
          symbol: string;
          logo: string;
          decimals: Number;
        };
        if (chainStore.currentToken === "chain") {
          currentToken = {
            address: chainStore.chain.address,
            symbol: chainStore.chain.symbol,
            logo: chainStore.chain.logo,
            decimals: chainStore.chain.decimals,
          };
        } else {
          const temp = chainStore.tokens.find((element) => element.symbol === chainStore.currentToken);
          currentToken = {
            address: temp.address,
            symbol: temp.symbol,
            logo: temp.logo,
            decimals: temp.decimals,
          };
        }
        params.recipients = [
          {
            address: address,
            amount: amount,
            chainSymbol: chainStore.chain.symbol,
            tokenSymbol: currentToken.symbol,
            tokenAddr: currentToken.address,
            tokenDecimals: currentToken.decimals,
            icon: currentToken.logo,
          },
        ];
      }

      const temp: ISendCoin = {
        chain: chainStore,
        data: params,
      };
      dispatch(sendCoinAsync(temp)).then((action) => {
        if (action.type.endsWith("/fulfilled")) {
          setNotificationStatus((action.payload as INotification).status);
          setNotificationTitle((action.payload as INotification).title);
          setNotificationDetail((action.payload as INotification).message);
          setNotificationOpen(true);
          setNotificationLink(null);
          if ((action.payload as INotification).status === "success") {
            setDraft([]);
            setAmount("");
            setAddress("");
            setPassword("");
          }
        }
      });
    }
  }, [walletSettingStore, draft, address, dispatch, password]);

  const removeDraft = useCallback(
    (deleteId: number) => {
      setDraft((prevDraft) => {
        return prevDraft.filter((_, index) => index !== deleteId);
      });
    },
    [draft, setDraft]
  );

  const handleAmount = useCallback(
    (value: string) => {
      setAmount(value);
    },
    [amount, setAmount]
  );

  useEffect(() => {
    setDraft([]);
    setAmount("");
    setAddress("");
    setPassword("");
  }, [chainStore]);

  useEffect(() => {
    let updateOption = [
      {
        label: chainStore.chain.symbol,
        icon: chainStore.chain.logo,
        value: "chain",
      },
    ];
    chainStore.tokens.map((token) => {
      updateOption.push({
        label: token.displaySymbol,
        icon: token.logo,
        value: token.symbol,
      });
    });
    setOptions(updateOption);
    getPriceData(chainStore).then((res) => {
      setPriceData(res);
      setAnchorEl(null);
    });
  }, [chainStore]);

  const switchCoin = useCallback(
    (token: any) => {
      const updateData = { ...chainStore, currentToken: token.value };
      dispatch(setChainAsync(updateData));
    },
    [chainStore]
  );

  return (
    <AnimatedComponent threshold={0}>
      <div>
        <Grid container>
          <Grid container>
            <Grid item xs={12} md={12} xl={7} mb={"80px"}>
              <Box className={"wallet-form-card p-32-56 br-16"}>
                <Box className={"fs-h2 white"} mb={"32px"}>
                  {t("wal-7_send-sxp")}
                </Box>
                <Box className={"wallet-form-card-hover p-24-16 br-16"} mb={"32px"} onClick={() => setChooseChainView(true)}>
                  <Stack direction="row" alignItems={"center"} spacing={"16px"}>
                    <Box component={"img"} src={chainStore.chain.logo} width={"36px"} height={"36px"} />
                    <Stack>
                      <Stack direction={"row"} spacing={"10px"}>
                        <Box className={"fs-18-regular light"}>{t("wal-8_from")}</Box>
                        <Box className={"fs-18-regular white"}>{chainStore.chain.name}</Box>
                      </Stack>
                      <Stack direction={"row"} alignItems={"center"} spacing={"8px"}>
                        <Box component={"img"} src={walletIcon} width={"12px"} height={"12px"} />
                        <Box className={"fs-14-regular light"}>{chainStore.chain.wallet}</Box>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
                <Box className={"wallet-form-card p-16-16 br-16 blur"} mb={"32px"}>
                  <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={"16px"}>
                    <Box className={"fs-18-regular light"}>{t("wal-9_you-send")}</Box>
                    <Stack direction={"row"} alignItems={"center"} spacing={"8px"}>
                      <Box component={"img"} src={walletIcon} width={"18px"} height={"18px"} />
                      <Box className={"fs-12-light light"}>{priceData ? formatBalance(priceData.balance, 4) : "0.0"}</Box>
                      <Box
                        className={"fs-14-bold blue"}
                        onClick={() => {
                          setAmount(chainStore.chain.balance.toString());
                          handleAmount(chainStore.chain.balance.toString());
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {t("wal-10_max")}
                      </Box>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Stack width={"100%"}>
                      <InputBox id="send-amount" placeholder="0.0" label="" align="left" onChange={handleAmount} value={amount?.toString()} />
                      <Box className={"fs-12-light light"}>
                        {`~${symbol} ${priceData ? formatBalance(Number(amount) * Number(priceData.price) * reserve) : "0.0"}`}
                      </Box>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} padding={"4px 8px"} spacing={"8px"}>
                      {/* <Box component={"img"} src={chainStore.chain.logo} width={30}/>
                    <Box className={"fs-18-regular white"}>
                      {chainStore.chain.symbol}
                    </Box> */}
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <Stack direction={"row"} gap={1}>
                          <Box>
                            <img src={priceData ? priceData.logo : ""} width={30} />
                          </Box>
                          <Box className="fs-18-regular white">{priceData ? priceData.label : ""}</Box>
                        </Stack>
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {options.map((token, index) => (
                          <MenuItem onClick={() => switchCoin(token)} key={index}>
                            <Stack direction={"row"} gap={1}>
                              <Box>
                                <img src={token.icon} width={20} />
                              </Box>
                              <Box>{token.label}</Box>
                            </Stack>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Stack>
                  </Stack>
                </Box>
                <Box className={"wallet-form-card p-16-16 br-16 blur"} mb={"32px"}>
                  <Box className={"fs-18-regular light"} mb={"8px"}>
                    {t("wal-11_to")}
                  </Box>
                  <InputText
                    id="recipient-address"
                    type="address"
                    value={address}
                    setValue={setAddress}
                    label={t("wal-12_recipient-address")}
                    onIconButtonClick={() => {
                      navigator.clipboard.writeText(address);
                    }}
                    onAddressButtonClick={() => setAddressBookView(true)}
                  />
                  {Number(amount) > 0 && address !== "" && (Number(walletSettingStore?.fee) > 0 || chainStore.chain.symbol !== "SXP") && (
                    <Button
                      fullWidth
                      className={classname.action_button}
                      onClick={() => {
                        updateDraft();
                      }}
                    >
                      {t("set-57_save")}
                    </Button>
                  )}
                </Box>
                {(chainStore.chain.symbol === "SXP" || chainStore.chain.symbol === "BTC") && (
                  <Box className={"wallet-form-card p-16-16 br-16"} mb={"32px"}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box className={"fs-16-regular light"}>{t("wal-13_trans-fee")}</Box>
                      <Stack direction={"row"} alignItems={"center"} spacing={"8px"}>
                        <Box className={"fs-16-regular white"}>{walletSettingStore?.fee} USD</Box>
                        <IconButton className="icon-button">
                          <EditOutlinedIcon className="icon-button" onClick={() => setTransactionFeeView(true)} />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Box>
                )}
                <Box mb={"32px"}>
                  <InputText id="send-password" type="password" label={t("ncca-3_password")} value={password} setValue={setPassword} />
                </Box>
                <Button
                  disabled={
                    pending ||
                    Number(amount) === 0 ||
                    address === "" ||
                    (Number(walletSettingStore?.fee) === 0 && chainStore.chain.symbol === "SXP") ||
                    createKeccakHash("keccak256").update(password).digest("hex") !== nonCustodialStore.password
                  }
                  className={"red-button fw"}
                  onClick={handleTransfer}
                >
                  {t("wal-14_transfer")}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} xl={5} padding={"0px 32px"}>
              <Stack spacing={"16px"}>
                {draft.map((data, index) => (
                  <Box className={"wallet-form-card p-16-16 br-16"} key={index}>
                    <Stack spacing={"15px"}>
                      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Stack>
                          <Box className="fs-18-regular light">{t("wal-11_to")}</Box>
                          <Box className="fs-18-regular white">{data.address}</Box>
                        </Stack>
                        <IconButton
                          className="icon-button"
                          onClick={() => {
                            removeDraft(index);
                          }}
                        >
                          <DeleteOutlineIcon className="icon-button" />
                        </IconButton>
                      </Stack>
                      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box className="fs-16-regular light">{t("wal-15_amount")}</Box>
                        <Box className="fs-16-regular white">{data.amount + " " + data.tokenSymbol}</Box>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <AddressBookDrawer view={addressBookView} setView={setAddressBookView} setAddress={setAddress} />
        <TransactionFeeDrawer view={transactionFeeView} setView={setTransactionFeeView} />
        <ChooseChainDrawer view={chooseChainView} setView={setChooseChainView} />
      </div>
    </AnimatedComponent>
  );
};

export default WalletSendSXP;
