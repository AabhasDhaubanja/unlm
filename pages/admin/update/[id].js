import { nonAdmin } from "../../../client/hocs/redirect";

const Update = ({ id }) => {
  return (
    <div>
      <h1>Update {id}!</h1>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  console.log(id);
  return {
    props: {
      id,
    },
  };
}

export default nonAdmin(Update);
