import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import "../../global.css";
import "./styles.css";
import { motion } from "framer-motion";

const Splash = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          navigate("/get-started");
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          alignSelf: "center",
        }}
      >
        <div className="splash-logo">
          <svg width="300" height="87" viewBox="0 0 300 87" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6609_59505)">
              <path
                d="M169.286 85.0581C167.006 84.6123 165.321 82.5716 165.321 80.2636C165.321 78.639 166.243 76.9648 167.591 76.103C168.354 75.6277 169.038 75.4493 170.524 75.3503C173.983 75.1126 176.351 74.211 178.862 72.1804C180.862 70.5558 182.457 68.1091 183.211 65.5136C183.35 65.0283 183.439 64.6122 183.42 64.5925C183.4 64.5727 183.002 64.8004 182.538 65.1076C179.911 66.8212 176.076 68.1389 172.567 68.5349C171.031 68.7035 167.75 68.6044 166.312 68.337C162.942 67.7028 160.197 66.6231 157.541 64.8797C153.933 62.5221 151.188 59.4315 149.314 55.6277C148.472 53.904 148.006 52.6559 147.59 50.9818C146.926 48.2875 146.945 48.7035 146.916 37.4306C146.886 30.1497 146.906 27.0393 146.985 26.6628C147.352 24.8996 148.829 23.3741 150.603 22.9085C153.249 22.2251 156.014 23.9782 156.589 26.7023C156.669 27.0691 156.698 30.1001 156.698 36.7569C156.698 47.0789 156.708 47.2372 157.253 49.159C157.382 49.6544 157.769 50.5955 158.086 51.2592C159.91 55.0035 163.319 57.6683 167.373 58.5399C168.275 58.7283 168.731 58.7678 170.277 58.7678C171.426 58.7678 172.327 58.7183 172.706 58.6389C173.944 58.3618 175.291 57.8962 176.312 57.3711C180.406 55.2909 183.18 51.2294 183.656 46.6331C183.718 46.0089 183.756 42.0467 183.756 36.2321C183.756 27.1086 183.768 26.8214 183.954 26.1973C185.045 22.6709 189.653 21.5912 192.152 24.2855C192.815 24.9987 193.321 26.0189 193.471 26.9205C193.608 27.8021 193.608 61.7791 193.471 63.5325C193.043 68.8619 191.031 73.4977 187.413 77.5395C184.499 80.7787 180.267 83.3147 175.937 84.4242C173.616 85.0183 170.563 85.3058 169.286 85.0581Z"
                fill="#52E1F2"
              />
              <path
                d="M131.823 68.4657C128.731 68.0396 125.718 67.0194 123.131 65.4939C117.659 62.2845 113.774 57.1432 112.198 51.0411C111.524 48.4063 111.564 49.8623 111.534 29.1293L111.504 10.3776L111.752 9.62457C112.05 8.73324 112.377 8.22789 113.11 7.54443C114.161 6.54401 115.727 6.06843 117.164 6.30608C119.146 6.63306 120.752 8.17835 121.178 10.1695C121.287 10.6845 121.317 12.0517 121.317 16.7964V22.76H128.245C132.428 22.76 135.381 22.7995 135.698 22.8591C136.402 22.9876 137.522 23.5425 138.087 24.0476C139.247 25.058 139.891 26.851 139.653 28.3865C139.346 30.3676 137.75 32.0515 135.807 32.4578C135.45 32.5271 133.012 32.5666 128.294 32.5666H121.307L121.347 39.9269C121.386 47.9405 121.356 47.574 121.981 49.5453C123.121 53.1413 126.015 56.2914 129.553 57.7872C130.971 58.3813 132.438 58.7083 134.192 58.8174C136.362 58.9362 137.235 59.2729 138.315 60.3724C139.891 61.9672 140.149 64.4835 138.949 66.3655C138.325 67.3364 137.255 68.1189 136.095 68.4657C135.411 68.6638 133.31 68.6638 131.823 68.4657Z"
                fill="#52E1F2"
              />
              <path
                d="M204.174 68.436C202.788 67.9902 201.747 67.0788 201.121 65.7812L200.756 65.0084V45.6921V26.3755L201.121 25.603C202.112 23.5226 204.343 22.4034 206.572 22.8689C207.644 23.0968 208.982 23.9684 209.547 24.8202L209.706 25.0481L210.479 24.6519C214.631 22.5717 219.627 22.1952 223.998 23.6514C226.216 24.3945 228.557 25.7614 230.39 27.396L231.392 28.2776L232.283 27.4255C234.345 25.4444 237.498 23.8101 240.461 23.1661C242.799 22.6708 245.415 22.641 247.686 23.1066C254.932 24.5926 260.314 30.0803 261.789 37.47C261.998 38.55 261.998 38.6488 262.037 51.3582C262.056 62.6608 262.048 64.2359 261.909 64.8203C261.541 66.4151 260.473 67.6535 258.886 68.3269C258.074 68.6639 256.666 68.7232 255.753 68.4457C254.058 67.9306 252.7 66.4647 252.355 64.7808C252.274 64.4143 252.244 60.5807 252.244 52.1507C252.244 44.3647 252.205 39.8179 252.146 39.4019C251.462 35.0829 247.527 32.1012 243.244 32.6558C240.52 33.0125 238.31 34.5678 237.13 36.975C236.279 38.7084 236.346 37.4503 236.287 51.8833L236.237 64.7112L236.009 65.2959C235.238 67.3365 233.424 68.6241 231.323 68.6241C229.291 68.6241 227.555 67.4155 226.742 65.4345L226.525 64.9093L226.475 52.131C226.425 39.4414 226.417 39.3423 226.208 38.5996C225.454 35.9348 223.531 33.8643 221.035 33.0125C219.012 32.3291 216.86 32.4677 214.929 33.4185C213.304 34.2111 212.163 35.3404 211.351 36.975C210.457 38.7777 210.518 37.8168 210.518 51.4275C210.518 58.53 210.479 63.7603 210.418 64.2557C210.19 66.2665 208.813 67.8811 206.862 68.4658C206.147 68.6736 204.878 68.6639 204.174 68.436Z"
                fill="#52E1F2"
              />
              <path
                d="M289.812 68.5151C289.406 68.4656 288.515 68.317 287.83 68.1784C283.103 67.1977 279.109 64.9887 275.678 61.4721C272.23 57.9257 270.118 53.5673 269.316 48.3169C269.177 47.3958 269.158 45.1671 269.127 29.3474C269.097 17.4899 269.116 11.1403 269.186 10.5954C269.456 8.38646 271.12 6.66279 273.34 6.29629C275.72 5.90002 278.255 7.60393 278.8 9.98128C278.87 10.2587 278.909 12.6956 278.909 16.5885V22.7499L286.225 22.7797L293.53 22.8095L294.095 23.0371C295.998 23.8099 297.186 25.4047 297.314 27.366C297.345 27.8118 297.314 28.4062 297.256 28.7035C296.978 30.0011 295.979 31.3185 294.807 31.9426C293.619 32.5766 293.766 32.5668 285.966 32.5668H278.889L278.939 39.6691C278.978 47.5444 278.978 47.5642 279.652 49.5653C281.01 53.6663 284.182 56.8262 288.267 58.1734C289.467 58.5696 290.853 58.8173 291.885 58.8173C293.608 58.8173 294.737 59.2233 295.798 60.204C296.819 61.1551 297.345 62.3537 297.345 63.7206C297.345 65.1076 296.889 66.2171 295.909 67.1877C294.779 68.3072 293.855 68.6339 291.843 68.6142C291.139 68.6042 290.218 68.5646 289.812 68.5151Z"
                fill="#52E1F2"
              />
              <path
                d="M12.8194 38.6874L0.332499 48.5413C-0.119837 48.8983 -0.108855 49.5879 0.354467 49.9301L45.3112 83.1405L45.9303 82.5115L12.8194 38.6874Z"
                fill="url(#paint0_linear_6609_59505)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.26343 0.929199L8.81873 1.82289C8.82092 1.82426 8.82285 1.82536 8.82505 1.82673L33.3855 15.9398L47.0501 81.4252C46.9647 81.4799 46.8839 81.545 46.8098 81.6205L45.9323 82.5115L12.8214 38.6873L7.26343 0.929199ZM47.2355 84.5603L47.7897 84.9698L47.7878 84.9613L47.2355 84.5603ZM35.5038 59.6799C36.1657 59.2915 37.0168 59.5134 37.4052 60.1756L40.5207 65.4875C40.9091 66.1496 40.6874 67.0013 40.0255 67.3897C39.3637 67.778 38.5123 67.5564 38.1239 66.8942L35.0084 61.5821C34.62 60.9199 34.8417 60.0685 35.5038 59.6799Z"
                fill="url(#paint1_linear_6609_59505)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M47.0457 81.4252L33.3811 15.9398H62.1895L48.5274 81.4139C48.0745 81.1327 47.495 81.1366 47.0457 81.4252ZM47.7833 84.9612L47.7853 84.9697L47.7866 84.9634L47.7833 84.9612Z"
                fill="url(#paint2_linear_6609_59505)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M48.5281 81.414L62.1902 15.9398L86.7507 1.82673L88.3123 0.929199L88.0511 2.70339C88.0508 2.70613 88.0503 2.70888 88.05 2.71163L82.7543 38.6873L49.6519 82.4999L48.786 81.6205C48.7066 81.5398 48.6201 81.4708 48.5281 81.414ZM47.7896 84.9651L47.791 84.9662L47.786 84.9698L47.7874 84.9635L47.7896 84.9651ZM57.758 60.1756C58.1464 59.5134 58.9977 59.2915 59.6596 59.6799C60.3215 60.0685 60.5434 60.9199 60.1551 61.5821L57.0395 66.8942C56.6512 67.5564 55.7998 67.778 55.1379 67.3897C54.476 67.0013 54.2544 66.1496 54.6425 65.4875L57.758 60.1756Z"
                fill="url(#paint3_linear_6609_59505)"
              />
              <path
                d="M95.2444 48.5413L82.7575 38.6874L49.6552 82.5L50.2772 83.1319L95.2225 49.9301C95.6858 49.5879 95.6968 48.8983 95.2444 48.5413Z"
                fill="url(#paint4_linear_6609_59505)"
              />
            </g>
            <defs>
              <linearGradient id="paint0_linear_6609_59505" x1="47.7877" y1="14.8729" x2="35.0512" y2="81.2155" gradientUnits="userSpaceOnUse">
                <stop stop-color="#942121" />
                <stop offset="1" stop-color="#892727" />
              </linearGradient>
              <linearGradient id="paint1_linear_6609_59505" x1="47.7897" y1="14.8728" x2="35.0532" y2="81.2154" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D03232" />
                <stop offset="1" stop-color="#892727" />
              </linearGradient>
              <linearGradient id="paint2_linear_6609_59505" x1="33.5105" y1="12.7858" x2="78.2711" y2="150.92" gradientUnits="userSpaceOnUse">
                <stop stop-color="#EF4444" />
                <stop offset="1" stop-color="#892727" />
              </linearGradient>
              <linearGradient id="paint3_linear_6609_59505" x1="47.786" y1="14.8728" x2="35.0495" y2="81.2154" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D03232" />
                <stop offset="1" stop-color="#892727" />
              </linearGradient>
              <linearGradient id="paint4_linear_6609_59505" x1="47.7892" y1="14.8729" x2="35.0527" y2="81.2155" gradientUnits="userSpaceOnUse">
                <stop stop-color="#942121" />
                <stop offset="1" stop-color="#892727" />
              </linearGradient>
              <clipPath id="clip0_6609_59505">
                <rect width="300" height="85.7944" fill="white" transform="translate(0 0.929199)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </motion.div>
      <div className="red-blur" />
      <div className="blue-blur" />
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          backgroundColor: "#00000000",
          height: "10px",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#EF4444",
          },
        }}
      />
    </>
  );
};

export default Splash;
