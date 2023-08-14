import Button from "../Button/Button";
import PropTypes from "prop-types";
import "./Detail.css";

const Detail = ({ children, onClose }) => {
  return (
    <div className="detail">
      <Button className="detail__btn-close" onClick={onClose}>
        X
      </Button>
      {children}
    </div>
  );
};

Detail.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Detail;
