import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { supportChains } from "../../consts/SupportTokens";
import { currencySymbols } from "../../consts/SupportCurrency";

import { SwipeableDrawer, Box, Stack, Divider, IconButton, Button } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useNotification } from "../../providers/NotificationProvider";

import Loading from "../../components/Loading";

import SettingStyle from "../../styles/SettingStyle";

import { AppDispatch } from "../../store";
import { setChainAsync } from "../../features/wallet/ChainSlice";
import { getWallet } from "../../features/wallet/WalletSlice";
import { setTransasctions } from "../../features/wallet/CryptoSlice";
import { getBalanceList } from "../../features/wallet/BalanceListSlice";
import { getPriceList } from "../../features/wallet/PriceListSlice";
import { getCurrencyList } from "../../features/wallet/CurrencyListSlice";
import { getCurrentCurrency } from "../../features/wallet/CurrentCurrencySlice";

import { IBalanceList, IChain, ICurrencyList, ICurrentCurrency, IPriceList, IWallet } from "../../types/walletTypes";

import { formatBalance } from "../../lib/helper";
import { getCurrentChainWalletAddress, getTokenBalanceBySymbol, getTokenPriceByCmc } from "../../lib/helper/WalletHelper";

import closeImg from "../../assets/settings/collaps-close-btn.svg";

type Anchor = "right";

interface props {
  view: boolean;
  setView: (param: boolean) => void;
}

const ChooseChainDrawer = ({ view, setView }: props) => {
  const classname = SettingStyle();
  const { t } = useTranslation();
  const [state, setState] = useState({ right: false });
  const dispatch = useDispatch<AppDispatch>();

  const walletStore: IWallet = useSelector(getWallet);
  const balanceListStore: IBalanceList = useSelector(getBalanceList);
  const priceListStore: IPriceList = useSelector(getPriceList);
  const currencyListStore: ICurrencyList = useSelector(getCurrencyList);
  const currentCurrencyStore: ICurrentCurrency = useSelector(getCurrentCurrency);

  const reserve: number = useMemo(
    () => currencyListStore?.list?.find((one) => one?.name === currentCurrencyStore?.currency)?.reserve,
    [currencyListStore, currentCurrencyStore]
  );
  const symbol: string = useMemo(() => currencySymbols[currentCurrencyStore?.currency], [currentCurrencyStore]);

  const [loading, setLoading] = useState<boolean>(false);

  const { setNotificationStatus, setNotificationTitle, setNotificationDetail, setNotificationOpen, setNotificationLink } = useNotification();

  //@ts-ignore
  const selectChain = useCallback((data: IChain) => {
    const udpateData = { ...data, currentToken: "chain" };
    setLoading(true);
    dispatch(setTransasctions());
    dispatch(setChainAsync(udpateData)).then(() => {
      setNotificationOpen(true);
      setNotificationTitle(`${t("alt-11_switched-network")} ${data?.chain?.name}`);
      setNotificationDetail(`${t("alt-12_switched-network-intro")} ${data?.chain?.name}`);
      setNotificationStatus("success");
      setNotificationLink(null);
      setLoading(false);
    });
  }, []);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <SwipeableDrawer
      anchor="right"
      open={view}
      onClose={() => setView(false)}
      onOpen={toggleDrawer("right", true)}
      classes={{ paper: classname.setting_container }}
      slotProps={{
        backdrop: {
          onClick: toggleDrawer("right", false),
        },
      }}
    >
      {loading && <Loading />}
      <Box className={classname.collaps_pan}>
        <img src={closeImg} className={classname.close_icon} onClick={() => setView(false)} />
      </Box>
      <Box className={classname.setting_pan}>
        <Stack direction={"row"} alignItems={"center"} spacing={"16px"} padding={"18px 16px"}>
          <IconButton
            className="icon-button"
            sx={{
              width: "24px",
              height: "24px",
              padding: "4px",
            }}
            onClick={() => setView(false)}
          >
            <ArrowBackOutlinedIcon className="icon-button" />
          </IconButton>
          <Box className="fs-24-bold white">{t("set-5_choose-chain")}</Box>
        </Stack>
        <Divider
          sx={{
            backgroundColor: "#FFFFFF1A",
          }}
        />

        {supportChains?.map((supportChain, index) => (
          <>
            <Button className="common-btn" onClick={() => {}} fullWidth key={index}>
              <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} padding={"12px 16px"}>
                <Stack direction={"row"} alignItems={"center"} spacing={"16px"}>
                  <Box component={"img"} src={supportChain?.chain?.logo} width="32px" height="32px" />
                  <Stack>
                    <Box className="fs-18-regular white">{supportChain?.chain?.name}</Box>
                    <Box className="fs-12-regular blue">{getCurrentChainWalletAddress(walletStore, supportChain?.chain?.name)}</Box>
                  </Stack>
                </Stack>
                <Stack>
                  <Box className="fs-18-regular white t-right">
                    {formatBalance(getTokenBalanceBySymbol(balanceListStore, supportChain?.chain?.symbol) ?? 0, 4)}
                  </Box>
                  <Box className="fs-12-regular light t-right">
                    {`${symbol} ${formatBalance(
                      Number(getTokenBalanceBySymbol(balanceListStore, supportChain?.chain?.symbol) ?? 0) *
                        Number(getTokenPriceByCmc(priceListStore, supportChain?.chain?.cmc) ?? 0) *
                        reserve
                    )}`}
                  </Box>
                </Stack>
              </Stack>
            </Button>
            <Divider
              sx={{
                backgroundColor: "#FFFFFF1A",
              }}
            />
          </>
        ))}
      </Box>
    </SwipeableDrawer>
  );
};

export default ChooseChainDrawer;
