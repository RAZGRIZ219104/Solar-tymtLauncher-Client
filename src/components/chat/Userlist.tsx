import { Box, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../home/Avatar";
import {
  createContact,
  receiveContactlist,
} from "../../features/chat/Chat-contactApi";
import { setUserList } from "../../features/chat/Chat-userlistSlice";
import {
  propsUserlistType,
  selecteduserType,
  userType,
} from "../../types/chatTypes";
import {
  getSelectedUser,
  setSelectedUsertoDelete,
} from "../../features/chat/Chat-selecteduserSlice";
import {
  selectPartner,
  setCurrentChatPartner,
} from "../../features/chat/Chat-currentPartnerSlice";
import { useEffect, useRef } from "react";

const Userlist = ({
  user,
  index,
  numberofunreadmessages,
  setShowContextMenu,
  setContextMenuPosition,
  setView,
}: propsUserlistType) => {
  const dispatch = useDispatch();

  const selectedUserToDeleteStore: selecteduserType =
    useSelector(getSelectedUser);
  const userDataStore: userType[] = useSelector(selectPartner);

  const selectedUserToDeleteStoreRef = useRef(selectedUserToDeleteStore);

  useEffect(() => {
    selectedUserToDeleteStoreRef.current = selectedUserToDeleteStore;
  }, [selectedUserToDeleteStore]);

  const handleContextMenu = (e: any, id: string) => {
    e.preventDefault();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setShowContextMenu(true);
    setContextMenuPosition({ x: mouseX, y: mouseY });
    e.stopPropagation();
    dispatch(
      setSelectedUsertoDelete({
        ...selectedUserToDeleteStoreRef.current,
        id: id,
      })
    );
    const handleClickOutsideContextMenu = (event) => {
      if (
        !event.target.closest(".context_menu_block") &&
        !event.target.closest(".context_menu_delete")
      ) {
        setShowContextMenu(false);
        document.removeEventListener("click", handleClickOutsideContextMenu);
      }
    };

    document.addEventListener("click", handleClickOutsideContextMenu);
    return false;
  };

  const updateContact = async (_id) => {
    await createContact(_id);
    const contacts: userType[] = await receiveContactlist();
    dispatch(setUserList(contacts));
  };

  return (
    <Box key={`${index}-${new Date().toISOString()}`}>
      <Grid
        item
        xs={12}
        container
        sx={{
          overflowX: "hidden",
          height: "64px",
          flexDirection: "row",
          justifyContent: "left",
          alignItems: "center",
          padding: "12px 5px 12px 5px",
          cursor: "pointer",
          "&:hover": {
            borderRadius: "5px",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
            backgroundColor: "#FFFFFF1A",
          },
          "&:active": {
            backgroundColor: "#52E1F21A",
          },
        }}
        onContextMenu={(e) => handleContextMenu(e, user._id)}
        onClick={() => {
          dispatch(
            setCurrentChatPartner({
              ...userDataStore,
              _id: user._id,
              nickName: user.nickName,
              avatar: user.avatar,
              lang: user.lang,
              sxpAddress: user.sxpAddress,
              onlineStatus: user.onlineStatus,
              notificationStatus: user.notificationStatus,
            })
          );
          if (setView) {
            setView("chatbox");
          }
          updateContact(user._id);
        }}
      >
        <Avatar
          onlineStatus={user.onlineStatus}
          userid={user._id}
          size={40}
          status={user.notificationStatus}
        />
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          display={"flex"}
          sx={{ marginLeft: "25px", width: "320px" }}
        >
          <Box>
            <Stack
              direction={"column"}
              justifyContent={"flex-start"}
              spacing={1}
            >
              <Box className={"fs-16 white"}>{user?.nickName}</Box>
              <Box className={"fs-12-light gray"}>{user?.sxpAddress}</Box>
            </Stack>
          </Box>

          <Box
            className={"unread-dot fs-10-light"}
            sx={{
              display: numberofunreadmessages > 0 ? "block" : "none",
            }}
          >
            {numberofunreadmessages}
          </Box>
        </Stack>
      </Grid>
    </Box>
  );
};

export default Userlist;
