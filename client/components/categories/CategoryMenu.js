import { Container, Row, Col } from "react-bootstrap";

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
      <Col xs={12} onClick={this.popHandler} className="h3 pb-3">
        <BsChevronLeft />
        Back
      </Col>
    ) : (
      <Col xs={12} className="h3 pb-3">
        &nbsp;
      </Col>
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
            <Col
              xs={12}
              key={item.name}
              onClick={() => this.menuClickHandler(item)}
            >
              <span className="h2 pr-4">{item.name}</span>
              <span>
                <BsChevronRight />
              </span>
            </Col>
          ))}
        </b>
      </div>
    );
  };

  render() {
    return (
      <Row>
        <Col xl={6} lg={5} md={6} xs={12}>
          <Row>
            {this.backFormatHandler()}
            {this.menuFormatHandler(this.state.history)}
          </Row>
        </Col>
      </Row>
    );
  }
}

export default withRouter(CategoryMenu);
