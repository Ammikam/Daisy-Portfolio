import { siX } from "simple-icons/icons";

const XLogo = ({ size = 20, color = "currentColor" }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{siX.title}</title>
    <path d={siX.path} />
  </svg>
);

export default XLogo;
