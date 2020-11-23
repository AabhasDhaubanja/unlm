import { nonAdmin } from "../../client/hocs/redirect";

const Update = () => {
  return (
    <div>
      <h1>Update Yeah!</h1>
    </div>
  );
};

export default nonAdmin(Update);
