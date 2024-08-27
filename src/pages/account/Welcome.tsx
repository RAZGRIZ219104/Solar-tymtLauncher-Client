import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { invoke } from "@tauri-apps/api";

import { motion } from "framer-motion";

import { Grid, Box, Stack, Divider } from "@mui/material";

import AccountHeader from "../../components/account/AccountHeader";
import SignModeButton from "../../components/account/SignModeButton";
import CreateAccountForm from "../../components/account/CreateAccountForm";
import AuthIconButtons from "../../components/account/AuthIconButtons";
import OrLine from "../../components/account/OrLine";

import { AppDispatch } from "../../store";
import { getMachineId, setMachineId } from "../../features/account/MachineIdSlice";
import { addAccountList } from "../../features/account/AccountListSlice";
import { setAccount } from "../../features/account/AccountSlice";
import { getSaltToken, setSaltToken } from "../../features/account/SaltTokenSlice";
import { fetchMyInfoAsync } from "../../features/account/MyInfoSlice";
import { setMnemonic } from "../../features/account/MnemonicSlice";
import { setLogin } from "../../features/account/LoginSlice";

import AuthAPI from "../../lib/api/AuthAPI";

import { getRsaKeyPair } from "../../features/chat/RsaApi";
import { encrypt, getKeccak256Hash } from "../../lib/api/Encrypt";
import { getMnemonic, getWalletAddressFromPassphrase } from "../../lib/helper/WalletHelper";
import { getNonCustodySignInToken, getReqBodyNonCustodyBeforeSignIn, getReqBodyNonCustodySignIn } from "../../lib/helper/AuthAPIHelper";

import { IWallet } from "../../types/walletTypes";
import { IAccount, IMachineId, ISaltToken } from "../../types/accountTypes";
import { INonCustodyBeforeSignInReq } from "../../types/AuthAPITypes";

import tymt1 from "../../assets/account/tymt1.png";
import GuestIcon from "../../assets/account/Guest.svg";
import ImportIcon from "../../assets/account/Import.svg";

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const saltTokenStore: ISaltToken = useSelector(getSaltToken);
  const machineIdStore: IMachineId = useSelector(getMachineId);

  const [loading, setLoading] = useState<boolean>(false);

  const handlePlayGuest = useCallback(async () => {
    try {
      setLoading(true);
      const newPassphrase: string = getMnemonic(12);
      const newWalletAddress: IWallet = await getWalletAddressFromPassphrase(newPassphrase);
      const newPassword: string = "";
      const encryptedPassword: string = getKeccak256Hash(newPassword);
      const encryptedPassphrase: string = await encrypt(newPassphrase, newPassword);
      const newRsaPubKey: string = (await getRsaKeyPair(newPassphrase))?.publicKey;

      const newAccount: IAccount = {
        avatar: "",
        nickName: "Guest",
        password: encryptedPassword,
        sxpAddress: newWalletAddress?.solar,
        mnemonic: encryptedPassphrase,
        rsaPubKey: newRsaPubKey,
      };

      dispatch(setAccount(newAccount));
      dispatch(addAccountList(newAccount));
      dispatch(setMnemonic(newPassphrase));

      const body1: INonCustodyBeforeSignInReq = getReqBodyNonCustodyBeforeSignIn(newAccount, newPassphrase);
      const res1 = await AuthAPI.nonCustodyBeforeSignin(body1);

      const salt: string = res1?.data?.salt;
      const token: string = getNonCustodySignInToken(salt, saltTokenStore, newPassphrase);
      dispatch(
        setSaltToken({
          salt: salt,
          token: token,
        })
      );

      const body2 = getReqBodyNonCustodySignIn(newAccount, machineIdStore, token);
      const res2 = await AuthAPI.nonCustodySignin(body2);

      const uid = res2?.data?._id;
      await dispatch(fetchMyInfoAsync(uid));

      dispatch(setLogin(true));
      navigate("/home");
      setLoading(false);
    } catch (err) {
      console.log("Failed to handlePlayGuest: ", err);
      setLoading(false);
    }
  }, [saltTokenStore, machineIdStore]);

  useEffect(() => {
    invoke("get_machine_id")
      .then((hwid) => {
        console.log("Unique Machine ID:", hwid);
        dispatch(
          setMachineId({
            machineId: hwid,
          })
        );
      })
      .catch((err) => {
        console.log("Error getting Machine ID:", err);
      });
  }, []);

  return (
    <>
      <Grid container className="basic-container">
        <Grid item xs={12} container justifyContent={"center"}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              alignSelf: "center",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={"64px"}>
              <Stack alignItems={"center"} justifyContent={"center"}>
                <Grid container justifyContent={"center"}>
                  <Grid
                    item
                    container
                    sx={{
                      width: "520px",
                      padding: "10px 0px",
                    }}
                  >
                    <Grid item xs={12}>
                      <AccountHeader title={"Hello!"} />
                    </Grid>
                    <Grid item xs={12} mt={"48px"}>
                      <Stack direction={"row"} alignItems={"center"} gap={"16px"}>
                        <SignModeButton icon={GuestIcon} text={"Play as a guest"} onClick={handlePlayGuest} loading={loading} />
                        <SignModeButton icon={ImportIcon} text={"Import wallet"} onClick={() => navigate("/non-custodial/login/2")} />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} mt={"32px"}>
                      <Divider variant="fullWidth" sx={{ backgroundColor: "#FFFFFF1A" }} />
                    </Grid>
                    <Grid item xs={12} mt={"32px"}>
                      <CreateAccountForm />
                    </Grid>
                    <Grid item xs={12} mt={"32px"}>
                      <OrLine />
                    </Grid>
                    <Grid item xs={12} mt={"32px"}>
                      <AuthIconButtons />
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
              <Box
                component={"img"}
                src={tymt1}
                sx={{
                  height: "calc(100vh - 64px)",
                }}
              />
            </Stack>
          </motion.div>
        </Grid>
      </Grid>
    </>
  );
};

export default Welcome;
