import Link from "next/link";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient";
import { GET_CATEGORIES } from "../lib/queries";

const Categories = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return "Loading ...";
  if (error) return JSON.stringify(error);

  const { categories } = data;

  const root = categories.find((cat) => cat.isRoot == true);

  // helper function
  const findChildren = (id) => {
    const array = categories.filter((cat) => {
      return cat.superId == id;
    });

    return array;
  };

  // traverse function
  const traverse = (id, depth) => {
    const children = findChildren(id);
    const current = categories.find((cat) => cat.id == id);

    const style = {
      fontSize: `${3 - depth * 0.7}rem`,
      listStyleType: "none",
      textAlign: "center",
    };

    // terminating condition
    if (children.length == 0)
      return (
        <div style={style} key={current.id}>
          <Link
            key={current.id}
            href="/discover/[id]"
            as={`/discover/${current.id}`}
          >
            <a className="categoryLink">{current.name}</a>
          </Link>
        </div>
      );

    let organizedChildren = [];

    for (const child of children) {
      organizedChildren = [...organizedChildren, traverse(child.id, depth + 1)];
    }

    return (
      <div style={style} key={current.id}>
        <Link
          key={current.id}
          href="/discover/[id]"
          as={`/discover/${current.id}`}
        >
          <a className="categoryLink">{current.name}</a>
        </Link>
        <div>{organizedChildren.map((child) => child)}</div>
      </div>
    );
  };

  // The actual jsx returned by this component
  return (
    <div className="py-5 d-flex justify-content-center">
      {traverse(root.id, 0)}
    </div>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_CATEGORIES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Categories;
