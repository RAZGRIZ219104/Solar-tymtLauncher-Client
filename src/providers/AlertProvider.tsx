import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { AppDispatch } from "../store";

import { fetchGlobalChatroomListAsync } from "../features/chat/GlobalChatroomListSlice";
import { fetchPublicChatroomListAsync } from "../features/chat/PublicChatroomListSlice";
import { fetchBalanceListAsync } from "../features/wallet/BalanceListSlice";
import { fetchPriceListAsync } from "../features/wallet/PriceListSlice";
import { fetchCurrencyListAsync } from "../features/wallet/CurrencyListSlice";
import { fetchContactListAsync } from "../features/chat/ContactListSlice";
import { fetchFriendListAsync } from "../features/chat/FriendListSlice";
import { fetchBlockListAsync } from "../features/chat/BlockListSlice";
import { fetchChatroomListAsync } from "../features/chat/ChatroomListSlice";
import { ISKey, setSKeyList } from "../features/chat/SKeyListSlice";
import { fetchMutedListAsync } from "../features/chat/MutedListSlice";
import { getRsa } from "../features/chat/RsaSlice";
import { getMyInfo } from "../features/account/MyInfoSlice";
import { fetchUnreadMessageListAsync } from "../features/chat/UnreadMessageListSlice";
import { fetchAlertListAsync } from "../features/alert/AlertListSlice";
import { fetchAdminListAsync } from "../features/chat/AdminListSlice";
import { fetchGameListAsync } from "../features/store/GameListSlice";
import { fetchComingGameListAsync } from "../features/store/ComingGameListSlice";
import { getWallet } from "../features/wallet/WalletSlice";
import { rsaDecrypt } from "../features/chat/RsaApi";

import { IChatroom, IParticipant } from "../types/ChatroomAPITypes";
import { IMyInfo, IRsa } from "../types/chatTypes";
import { IWallet } from "../types/walletTypes";

const AlertProvider = () => {
  const dispatch = useDispatch<AppDispatch>();

  const rsaStore: IRsa = useSelector(getRsa);
  const myInfoStore: IMyInfo = useSelector(getMyInfo);
  const walletStore: IWallet = useSelector(getWallet);

  useEffect(() => {
    dispatch(fetchBalanceListAsync(walletStore));
    dispatch(fetchPriceListAsync());
    dispatch(fetchCurrencyListAsync());
    dispatch(fetchGameListAsync());
    dispatch(fetchComingGameListAsync());
    dispatch(fetchAdminListAsync(["admin"]));
    dispatch(fetchAlertListAsync(myInfoStore?._id));
    dispatch(fetchContactListAsync());
    dispatch(fetchFriendListAsync());
    dispatch(fetchBlockListAsync());
    dispatch(fetchMutedListAsync());
    dispatch(fetchUnreadMessageListAsync(myInfoStore?._id));
    dispatch(fetchGlobalChatroomListAsync());
    dispatch(fetchPublicChatroomListAsync());
    dispatch(fetchChatroomListAsync(myInfoStore?._id)).then((action) => {
      try {
        if (action.type.endsWith("/fulfilled")) {
          const newChatroomList = action.payload as IChatroom[];

          const newSKeyArray = newChatroomList.map((chatroom) => {
            if (chatroom.isGlobal) {
              return {
                roomId: chatroom._id,
                sKey: "",
              };
            }
            const mySelf: IParticipant = chatroom.participants.find((participant) => participant.userId === myInfoStore?._id);
            const sKey: ISKey = {
              roomId: chatroom._id,
              sKey: rsaDecrypt(mySelf.userKey, rsaStore.privateKey),
            };
            return sKey;
          });
          dispatch(setSKeyList(newSKeyArray));
        }
      } catch (err) {
        console.error("Failed to newSKeyArray: ", err);
      }
    });
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AlertProvider;
