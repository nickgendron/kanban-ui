import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideEditModal } from "../../state/ShowEditTaskModal/editTaskSlice";
import { hideModal } from "../../state/ShowModal/showModalSlice";

const Modal = ({ children, onOutsideClick }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      if (target.id === "wrapper") {
        onOutsideClick();
      }
    }
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      className="fixed inset-0 place-items-center grid backdrop-blur-sm  overflow-y-auto"
      id="wrapper"
    >
      {children}
    </div>
  );
};

export default Modal;
