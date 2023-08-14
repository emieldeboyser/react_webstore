import Button from "../../../components/Global/Button/Button";
import useMutation from "../../../hooks/useMutation";

const DeleteTodoButton = ({ onSuccess, id }) => {
  const { isLoading, mutate } = useMutation();

  const handleClick = () => {
    mutate(`${process.env.REACT_APP_API_URL}/product/${id}`, {
      method: "DELETE",
      onSuccess: () => {
        onSuccess();
        window.location.reload();
      },
    });
  };

  return (
    <Button color="alert" onClick={handleClick} disabled={isLoading}>
      🗑
    </Button>
  );
};

export default DeleteTodoButton;
