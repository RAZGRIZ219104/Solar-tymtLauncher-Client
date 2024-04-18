import { makeStyles } from "@mui/styles";
import "../App.css";

const storeStyles = makeStyles({
  platform: {
    marginLeft: "5px",
    marginRight: "5px",
  },

  library_switch_container: {
    padding: "2px",
    borderRadius: "16px",
    gap: "2px",
    border: "1px solid",
    borderColor: "#FFFFFF1A",
    background: "#0B1718",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  library_switch_button: {
    "&.MuiButtonBase-root, &.MuiBox-root": {
      display: "block",
      textTransform: "none",
      color: "#52E1F21A",
      minWidth: "unset",
      boxShadow: "none",
      padding: "0px",
      borderRadius: "16px",
    },
  },
  switch_btn: {
    padding: "8px 16px 8px 16px",
    fontFeatureSettings: "'calt' off",
    fontFamily: "Cobe",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "24px" /* 133.333% */,
    letterSpacing: "-0.36px",
  },
  filter_btn: {
    marginRight: "",
    height: "40px",
    display: "flex",
    padding: "8px 8px 8px 30px",
    alignItems: "center",
    gap: 8,
    borderRadius: "32px",
    border: "1px solid rgba(82, 225, 242, 0.40)",
    background: "var(--bg-stroke-card-bg, rgba(27, 53, 56, 0.20))",
    "&:hover": {
      backgroundColor:
        "var(--bg-stroke-blue-stroke-default-10, rgba(82, 225, 242, 0.10))",
    },
    "&:active": {
      backgroundColor:
        "var(--bg-stroke-blue-stroke-default-20, rgba(82, 225, 242, 0.20))",
    },
    "& .MuiSelect-icon": {
      color: "var(--Basic-Light, #AFAFAF)",
    },
    textTransform: "none",
  },
  filter_btn_clear: {
    marginRight: "",
    height: "40px",
    display: "flex",
    padding: "8px 30px 8px 30px",
    alignItems: "center",
    gap: 8,
    borderRadius: "32px",
    border: "1px solid rgba(82, 225, 242, 0.40)",
    background: "var(--bg-stroke-card-bg, rgba(27, 53, 56, 0.20))",
    "&:hover": {
      backgroundColor:
        "var(--bg-stroke-blue-stroke-default-10, rgba(82, 225, 242, 0.10))",
    },
    "&:active": {
      backgroundColor:
        "var(--bg-stroke-blue-stroke-default-20, rgba(82, 225, 242, 0.20))",
    },
    "& .MuiSelect-icon": {
      color: "var(--Basic-Light, #AFAFAF)",
    },
    textTransform: "none",
  },
  x_icon: {
    marginLeft: "16px",
  },
  gameoverview_container: {
    marginBottom: "32px",
    borderRadius: "var(--Angle-Number, 32px)",
    background: "rgba(29, 29, 29, 0.50)",
    backgroundBlendMode: "luminosity",
    backdropFilter: "blur(50px)",
    padding: "24px",
    flexShrink: 0.3,
    position: "relative",
    overflow: "hidden",
  },
  chip_free: {
    fontFamily: "Cobe",
    fontSize: "12px",
    padding: "0px",
    width: "38px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "18px",
    background: "rgba(0, 128, 0, 0.40)",
    backdropFilter: "blur(10px)",
    color: "white",
    textAlign: "center",
  },
  chip_comingsoon: {
    width: "94px",
    fontFamily: "Cobe",
    fontSize: "12px",
    padding: "0px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "18px",
    background: "rgba(255, 165, 0, 0.40)",
    backdropFilter: "blur(10px)",
    color: "white",
    textAlign: "center",
  },
  wishlist_btn: {
    minWidth: "44px",
    width: "44px",
    height: "44px",
    borderRadius: "var(--Angle-Small, 16px)",
    border: "1px solid var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))",
    background: "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
    backgroundBlendMode: "luminosity",
    backdropFilter: "blur(50px)",
    "&:hover": {
      backgroundColor:
        "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
      border: "2px solid var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))",
    },
    "&:active": {
      background:
        "var(--bg-stroke-icon-button-bg-active-30, rgba(128, 128, 128, 0.30))",
    },
  },
  card_genre_label: {
    fontFamily: "Cobe",
    padding: "8px 12px 8px 12px",
    fontSize: "16px",
    justifyContent: "left",
    color: "white",
    borderRadius: "30px",
    border: "1px solid rgba(82, 225, 242, 0.20)",
    background: "rgba(27, 53, 56, 0.20)",
    backgroundBlendMode: "luminosity",
    backdropFilter: "blur(50px)",
  },
  box_gameoption: {
    height: "42px",
    paddingTop: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.10)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link_button: {
    minWidth: "44px",
    width: "44px",
    height: "44px",
    borderRadius: "var(--Angle-Small, 16px)",
    border: "1px solid var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))",
    background: "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
    backgroundBlendMode: "luminosity",
    backdropFilter: "blur(50px)",
    "&:hover": {
      backgroundColor:
        "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
      border: "2px solid var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))",
    },
    "&:active": {
      background:
        "var(--bg-stroke-icon-button-bg-active-30, rgba(128, 128, 128, 0.30))",
    },
  },
  modal_btn_left: {
    "&.MuiButtonBase-root": {
      textTransform: "none",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "24px" /* 133.333% */,
      letterSpacing: "-0.36px",
      height: "46px",
      borderRadius: "16px",
      backgroundColor: "transparent",
      color: "#52E1F2",
      borderColor: "#EF4444",
      fontFamily: "Cobe",
      boxShadow: "none",
      border: "1px solid",
      paddingTop: "5px",
      "&:hover": {
        borderColor: "#EF4444",
        backgroundColor: "#EF4444",
      },
      "&:active": {
        backgroundColor: "#EF4444",
        boxShadow: "1px 1px #EF44445F",
      },
    },
  },
  tooltip: {
    padding: "6px 8px 6px 8px",
    borderRadius: "30px",
    textAlign: "center",
    border: "1px",
    borderColor: "#FFFFFF1A",
    backgroundColor: "#8080804D",
    backdropFilter: "blur(10px)",
  },
});

export default storeStyles;
