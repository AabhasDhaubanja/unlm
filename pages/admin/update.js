import { checkAuth } from "../../client/hocs/checkAuth";
import { nonAdmin } from "../../client/hocs/redirect";

const Update = () => {
  return (
    <div>
      <h1>Update Yeah!</h1>
    </div>
  );
};

export const getServerSideProps = checkAuth();

export default nonAdmin(Update, "/login");
