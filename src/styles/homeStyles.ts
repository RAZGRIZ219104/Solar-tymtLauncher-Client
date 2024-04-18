import { makeStyles } from "@mui/styles";
import "../App.css";

const homeStyles = makeStyles({

  navbar: {
    position: "fixed",
    marginTop: "0px",
    width: "95.5%",
    height: "60px",
    paddingRight: "10px",
    paddingLeft: "10px",
    alignItems: "center",
    display: "flex",
    borderRadius: "16px",
    justifyContent: "space-between",
    zIndex: 10,
    background: "transparent",
    backdropFilter: "blur(30px)",
  },
  searchbar: {
    position: "fixed",
    left: "20%",
    width: "320px",
    "& .MuiInputBase-root": {
      height: "44px",
      borderRadius: "var(--Angle-Number, 32px)",
      border:
        "1px solid var(--bg-stroke-white-20-modal-stroke, rgba(255, 255, 255, 0.20))",
      background:
        "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
      backgroundBlendMode: "luminosity",
      fontFamily: "Cobe",
      color: "var(--Basic-Light, #AFAFAF)",
      backdropFilter: "blur(70px)",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "gray", 
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary", 
      },
    },
    "&:hover": {
      backgroundColor: "var(--Windows-Glass, rgba(128, 128, 128, 0.30))",
      borderRadius: "var(--Angle-Number, 32px)",
    },
    "&:covered": {
      background: "var(--Windows-Glass, rgba(128, 128, 128, 0.30))",
    },
    "& input": {
      color: "#FFFFFF",
    },
  },
  button_group: {
    marginRight: "0%",
    width: "360px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  button_navbar_profile: {
    width: "165px",
    position: "relative",
    height: "44px",
    borderRadius: "var(--Angle-Small, 16px)",
    border: "1px solid rgba(255, 255, 255, 0.10)",
    background: "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
    backgroundBlendMode: "luminosity",
    backdropFilter: "blur(70px)",
    "&:hover": {
      backgroundColor:
        "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
      border: "2px solid var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))",
    },
    "&:active": {
      background:
        "var(--bg-stroke-icon-button-bg-active-30, rgba(128, 128, 128, 0.30))",
    },
    justifyContent: "center",
    alignItems: "center",
    textTransform: "none",
  },
  button_navbar_common: {
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
    notification_dot: {
      position: "absolute",
      bottom: "4px",
      right: "-2.5px",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#52E1F2",
      border:
        "1px solid var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
      boxShadow: `0 0 0 1px var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))`,
    },


    menu_bar: {
      position: "fixed",
      marginLeft: "0%",
      height: "600px",
      whiteSpace: "nowrap",
      transition: "width 0.1s ease-in-out",
      borderRadius: "var(--Angle-Number, 32px)",
      background: "var(--bg-stroke-side-menu-bg, rgba(29, 29, 29, 0.30))",
      backgroundBlendMode: "luminosity",
      backdropFilter: "blur(50px)",
      zIndex: 10,
    },
    menu_listitem: {
      marginBottom: "25px",
      display: "block",
      borderTopRightRadius: "20px",
      borderBottomRightRadius: "20px",
    },
    menu_listbutton: {
      marginBottom: "25px",
      justifyContent: "initial",
      height: "40px",
      px: 2.5,
      "&:hover": {
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
      },
    },
    menu_chevron_button: {
      marginLeft: "10px",
      minWidth: "40px",
      width: "40px",
      height: "40px",
      borderRadius: "var(--Angle-Small, 16px)",
      border: "transparent",
      background: "transparent",
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
    tooltip: {
      padding: "6px 8px 6px 8px",
      borderRadius: "30px",
      border: "1px",
      borderColor: "#FFFFFF1A",
      backgroundColor: "#8080804D",
    },


    district_content: {
      borderRadius: "var(--Angle-Number, 16px)",
      flexShrink: "initial",
      backgroundColor: "var(--bg-stroke-side-menu-bg, rgba(29, 29, 29, 0.30))",
      padding: "20px",
      WebkitFlexShrink: "initial",
      position: "relative",
      overflow: "hidden",
    },


    trending_card: {
      width: "94%",
      borderRadius: "16px",
      padding: "32px",
      border: "1px solid #F6E27A",
      background: "rgba(31, 31, 31, 0.30)",
      backgroundBlendMode: "luminosity",
      backdropFilter: "blur(50px)",
      height: "472px",
      flexShrink: 0,
      zIndex: 1,
      position: "relative",
      overflow: "hidden",
    },
    golden_effect: {
      top: "-170px",
      left: "15%",
      width: "70%",
      height: "259px",
      flexShrink: 0,
      borderRadius: "46px",
      background:
        "linear-gradient(180deg, rgba(246, 242, 192, 0.60) 0%, rgba(246, 226, 122, 0.00) 100%)",
      filter: "blur(100px)",
      position: "absolute",
      zIndex: -1,
    },
    trending_chevron_button: {
      marginRight: "20px",
      minWidth: "40px",
      width: "40px",
      height: "40px",
      borderRadius: "var(--Angle-Small, 30px)",
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
    trending_game_card: {
      width: 200,
      height: 336,
      flexShrink: 0,
      borderRadius: "var(--Angle-Number, 16px)",
      border: "1px solid rgba(255, 255, 255, 0.40)",
      background: "rgba(31, 31, 31, 0.30)",
      backgroundBlendMode: "luminosity",
      backdropFilter: "blur(50px)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },


    button_gamecontent: {
      height: "60px",
      borderRadius: "16px",
      paddingLeft: "0px",
      paddingRight: "40px",
      marginRight: "20px",
      marginBottom: "20px",
      border: "1px solid rgba(255, 255, 255, 0.20)",
      backgroundColor: "rgba(128, 128, 128, 0.10)",
      backdropFilter: "blur(50px)",
      color: "gray",
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      "&:hover": {
        backgroundColor:
          "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
        border: "1px solid var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))",
      },
    },


  card_coming_container: {
    width: "94%",
    height: "361px",
    padding: "32px",
    flexShrink: 0,
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.40)",
    background: "rgba(31, 31, 31, 0.30)",
    backgroundBlendMode: "luminosity",
    backdropFilter: "blur(50px)",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
  },
  card_coming_slide: {
    width: "276px",
    height: "225px",
    flexShrink: 0,
    borderRadius: "var(--Angle-Number, 16px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    background: "rgba(255, 255, 255, 0.02)",
    backgroundBlendMode: "luminosity",
    backdropFilter: "blur(50px)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },


  card_freegame_container: {
    width: "276px",
    height: "300px",
    paddingBottom: "16px",
    flexShrink: 0,
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    background: "rgba(255, 255, 255, 0.02)",
    backgroundBlendMode: "luminosity",
    backdropFilter: "blur(50px)",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    "&:hover": {
      backgroundColor:
        "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
      border: "1px solid var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))",
    },
    "&:active": {
      background:
        "var(--bg-stroke-icon-button-bg-active-30, rgba(128, 128, 128, 0.30))",
    },
  },
  card_genre_label: {
    width: "auto",
    fontFamily: "Cobe",
    padding: "0px",
    fontSize: "14px",
    justifyContent: "left",
    color: "white",
    borderRadius: "30px",
    border: "1px solid rgba(82, 225, 242, 0.20)",
    background: "rgba(27, 53, 56, 0.20)",
    backgroundBlendMode: "luminosity",
    backdropFilter: "blur(50px)",
  },
  chip_free: {
    fontFamily: "Cobe",
    padding: "0px",
    justifyContent: "left",
    borderRadius: "18px",
    background: "rgba(0, 128, 0, 0.40)",
    backdropFilter: "blur(10px)",
    color: "white",
  },
  button_download: {
    width: "180px",
    height: "52px",
    marginLeft: "10px",
    marginBottom: "20px",
    borderTopRightRadius: "var(--Angle-Small, 32px)",
    borderBottomRightRadius: "var(--Angle-Small, 32px)",
    borderTopLeftRadius: "var(--Angle-Small, 20px)",
    borderBottomLeftRadius: "var(--Angle-Small, 20px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.20)",
    backgroundColor: "rgba(128, 128, 128, 0.10)",
    backdropFilter: "blur(50px)",
    color: "gray",
    alignItems: "center",
    display: "flex",
    justifyContent: "left",
    "&:hover": {
      backgroundColor:
        "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
      border: "1px solid var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))",
    },
    position: "relative",
  },
  button_download_small: {
    width: "74px",
    height: "21px",
    marginLeft: "10px",
    marginBottom: "20px",
    borderTopRightRadius: "var(--Angle-Small, 32px)",
    borderBottomRightRadius: "var(--Angle-Small, 32px)",
    borderTopLeftRadius: "var(--Angle-Small, 20px)",
    borderBottomLeftRadius: "var(--Angle-Small, 20px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.20)",
    backgroundColor: "rgba(128, 128, 128, 0.10)",
    backdropFilter: "blur(50px)",
    color: "gray",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      backgroundColor:
        "var(--bg-stroke-icon-button-bg-10, rgba(128, 128, 128, 0.10))",
      border: "1px solid var(--Stroke-linear-Hover, rgba(255, 255, 255, 0.10))",
    },
    position: "relative",
  },
});

export default homeStyles;
