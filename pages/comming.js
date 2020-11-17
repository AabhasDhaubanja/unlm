import { FaCog } from "react-icons/fa";
import { checkAuth } from "../client/hocs/checkAuth";

const Comming = () => {
  return (
    <div className="commingSoonContainer">
      <div>
        <div className="d-flex justify-content-center py-5">
          <FaCog className="commingCog" />
        </div>
        <div>
          <h1>COMMING SOON</h1>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = checkAuth();

export default Comming;
