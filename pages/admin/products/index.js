import { checkAuth } from "../../../client/hocs/checkAuth";
import { nonAdmin } from "../../../client/hocs/redirect";

const Products = () => {
  return (
    <div>
      <h1>Admin Products</h1>
    </div>
  );
};

export const getServerSideProps = checkAuth();

export default nonAdmin(Products, "/login");
