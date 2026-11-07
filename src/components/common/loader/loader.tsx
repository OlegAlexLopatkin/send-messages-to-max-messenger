import { CgSpinner } from "react-icons/cg";

import "./loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <CgSpinner className="loader__icon" />
    </div>
  );
};

export default Loader;
