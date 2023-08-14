import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";


const ListItem = ({ title, done, data, onClick, href, children }) => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();

  const handleCheck = (e) => {
    
    e.preventDefault();

    data = {
      ...data,
      done: !data.done
    }

    mutate(`${process.env.REACT_APP_API_URL}/todos/${data._id}`, {
      method: "PATCH",
      data,
      onSuccess: () => {
        navigate(`/todos`);
      },
    });

  }

  if (href) {
    return (
      <div className="list-item">
        <Link to={href}>

          <input onChange={handleCheck} className="list-item__completed" checked={done} type={'checkbox'} />
          <h3 className="list-item__title">{title}</h3>
        </Link>
        {children}
      </div>
    );
  }

  return (
    <li className="list-item" onClick={onClick}>
      <h3 className="list-item__title">{title}</h3>
      {children}
    </li>
  );
};

export default ListItem;
