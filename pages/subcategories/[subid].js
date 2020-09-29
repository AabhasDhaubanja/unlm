import { useRouter } from "next/router";

const SubCategories = ({ subid }) => {
  const router = useRouter();

  return (
    <div>
      <h1>{router.query.subid}</h1>
    </div>
  );
};

export default SubCategories;
