import { withRouter } from "next/router";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

class CategoryMenu extends React.Component {
  state = {
    history: [],
  };

  componentDidMount() {
    const temp = [];

    temp.push(this.props.superCategories);

    this.setState({
      history: temp,
    });
  }

  menuClickHandler = (value) => {
    const categories = value.Categories;
    const subCategories = value.SubCategories;

    let newHistory = this.state.history;

    if (categories) {
      newHistory.push(categories);
    } else if (subCategories) {
      newHistory.push(subCategories);
    } else if (value) {
      const { router } = this.props;
      router.push("/subcategories/[subid]", `/subcategories/${value.id}`);
    }

    this.setState({
      history: newHistory,
    });
  };

  popHandler = () => {
    if (this.state.history.length > 1) {
      let history = this.state.history;
      history.pop();

      this.setState({
        history: history,
      });
    }
  };

  backFormatHandler = () => {
    return this.state.history.length > 1 ? (
      <div onClick={this.popHandler} className="col-12 h3 pb-3">
        <BsChevronLeft />
        Back
      </div>
    ) : (
      <div className="col-12 h3 pb-3">&nbsp;</div>
    );
  };

  menuFormatHandler = (history) => {
    const menuItems = history[history.length - 1];

    if (!menuItems) {
      return <div>Loading ...</div>;
    }

    return (
      <div className="pl-5">
        <b>
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => this.menuClickHandler(item)}
              className="col-12"
            >
              <span className="h2 pr-4">{item.name}</span>
              <span>
                <BsChevronRight />
              </span>
            </div>
          ))}
        </b>
      </div>
    );
  };

  render() {
    return (
      <div className="row">
        <div className="col-xl-6 col-lg-5 col-md-6 col-12">
          <div>
            {this.backFormatHandler()}
            {this.menuFormatHandler(this.state.history)}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CategoryMenu);
