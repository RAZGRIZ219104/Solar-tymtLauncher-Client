import React, { createContext, useContext, useEffect, ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/api/shell";
import { appWindow } from "@tauri-apps/api/window";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { selectNotification, setNotification } from "../features/settings/NotificationSlice";
import { notificationType } from "../types/settingTypes";
import { accountType } from "../types/accountTypes";
import { getAccount } from "../features/account/AccountSlice";
import { invoke } from "@tauri-apps/api/tauri";
import { getInstallStatus, setInstallStatus } from "../features/home/DownloadStatusSlice";
import { IInstallStatus } from "../types/homeTypes";

interface TrayContextType {}

const TrayContext = createContext<TrayContextType>({});

export const useTray = () => useContext(TrayContext);

interface TrayProviderProps {
  children: ReactNode; // This line ensures `children` is accepted
}

export const TrayProvider: React.FC<TrayProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const notificationStore: notificationType = useSelector(selectNotification);
  const accountStore: accountType = useSelector(getAccount);
  const installStatusStore: IInstallStatus = useSelector(getInstallStatus);

  const notificationStoreRef = useRef(notificationStore);
  const accountStoreRef = useRef(accountStore);

  useEffect(() => {
    notificationStoreRef.current = notificationStore;
  }, [notificationStore]);
  useEffect(() => {
    accountStoreRef.current = accountStore;
  }, [accountStore]);

  const callSetTrayItemsEnabled = async (itemIds: String[], enabled: boolean) => {
    try {
      await invoke("set_tray_items_enabled", { itemIds, enabled });
    } catch (error) {
      console.error("Failed to callSetTrayItemsEnabled:", error);
    }
  };

  useEffect(() => {
    if (!accountStoreRef.current.isLoggedIn) {
      const itemIds = ["signout"];
      const enabled = false;
      callSetTrayItemsEnabled(itemIds, enabled);
    } else {
      const itemIds = ["signout"];
      const enabled = true;
      callSetTrayItemsEnabled(itemIds, enabled);
    }
  }, [accountStoreRef.current.isLoggedIn]);

  useEffect(() => {
    const unlisten_wallet = listen("wallet", (event) => {
      navigate("/wallet");
      appWindow.setFocus();
      console.log(event.payload as string);
    });

    const unlisten_games = listen("games", (event) => {
      navigate("/library");
      appWindow.setFocus();
      console.log(event.payload as string);
    });

    const unlisten_about = listen("about-tymt", (event) => {
      try {
        open("https://tymt.com");
        console.log(event.payload as string);
      } catch (err) {
        console.error("Failed to open link:", err);
      }
    });

    const unlisten_signout = listen("signout", (event) => {
      navigate("/start");
      appWindow.setFocus();
      console.log(event.payload as string);
    });

    const unlisten_disable_notifications = listen("disable_notifications", (event) => {
      dispatch(setNotification({ ...notificationStoreRef.current, alert: false }));
      console.log(event.payload as string);
    });

    const unlisten_install_dependencies = listen("install_dependencies_for_d53_on_mac", (event) => {
      dispatch(
        setInstallStatus({
          ...installStatusStore,
          isInstalling: event.payload as boolean,
        })
      );
      console.log(event.payload as string);
    });

    return () => {
      unlisten_wallet.then((unlistenFn) => unlistenFn());
      unlisten_games.then((unlistenFn) => unlistenFn());
      unlisten_signout.then((unlistenFn) => unlistenFn());
      unlisten_about.then((unlistenFn) => unlistenFn());
      unlisten_disable_notifications.then((unlistenFn) => unlistenFn());
      unlisten_install_dependencies.then((unlistenFn) => unlistenFn());
    };
  }, [notificationStoreRef.current]);

  return <TrayContext.Provider value={{}}>{children}</TrayContext.Provider>;
};
