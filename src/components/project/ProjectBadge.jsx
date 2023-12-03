import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveBoard } from "../../state/ActiveBoard/activeBoardSlice";
import { useDeleteTeamBoardMutation } from "../../api/ReduxApiHandler";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const ProjectBadge = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteTeamBoard] = useDeleteTeamBoardMutation();

  const handleDeleteProject = () => {
    deleteTeamBoard({ boardId: project.boardId, teamId: project.teamId });
  };
  const handleLinkClick = async () => {
    try {
      dispatch(setActiveBoard(project.boardId));

      navigate("/project");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // test
  return (
    <div
      className="h-36 bg-white rounded-xl shadow-lg p-5 cursor-pointer"
      onClick={handleLinkClick}
    >
      <div className=" space-x-4 ">
        <div className="flex flex-row  space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="blue"
          >
            <rect fill="none" fillRule="evenodd" height="24" width="24" />
            <path
              d="M13,9.5h5v-2h-5V9.5z M13,16.5h5v-2h-5V16.5z M19,21H5c-1.1,0-2-0.9-2-2V5 c0-1.1,0.9-2,2-2h14c1.1,0,2,0.9,2,2v14C21,20.1,20.1,21,19,21z M6,11h5V6H6V11z M7,7h3v3H7V7z M6,18h5v-5H6V18z M7,14h3v3H7V14z"
              fillRule="evenodd"
            />
          </svg>
          <div>
            <h1 className="font-bold">{project.boardName}</h1>
            <div className=" h-fit w-fit pr-2 pl-2 rounded-full -ml-1 mt-2 bg-green-100 mb-4">
              <h1 className="text-xs">{project.teamName}</h1>
            </div>
            <h1 className="">{project.boardDescription}</h1>
          </div>
          <br />
        </div>
      </div>
      <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
        <Menu
          menuButton={<MenuButton>&#x2022; &#x2022; &#x2022;</MenuButton>}
          transition
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem onClick={handleDeleteProject}>
            <h1 className="text-red-500">Delete Project</h1>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
export default ProjectBadge;
