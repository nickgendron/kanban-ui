import { useDispatch } from "react-redux";
import { setActiveTeam } from "../../state/ActiveTeam/activeTeamSlice";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useDeleteTeamMutation } from "../../api/ReduxApiHandler";
import { useNavigate } from "react-router-dom";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const TeamBadge = ({ team }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [deleteTeam] = useDeleteTeamMutation();
  const handleOnClick = () => {
    dispatch(setActiveTeam(team.teamId));
    navigate("/team");
  };

  const handleDeleteTeam = () => {
    deleteTeam({ teamId: team.teamId });
  };
  return (
    <div className="h-36 bg-white rounded-xl shadow-lg cursor-pointer ">
      <div
        className="flex flex-row space-x-4 p-5"
        onClick={handleOnClick}
      >
        <br />
        <div>
          <h1 className="font-bold">{team.teamName}</h1>
          <p className="">{team.teamName}</p>
        </div>
      </div>
      <div className="flex justify-end pr-3 pt-3" onClick={(e) => e.stopPropagation()}>
        <Menu
          menuButton={<MenuButton>&#x2022; &#x2022; &#x2022;</MenuButton>}
          transition
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem onClick={handleDeleteTeam}>
            <h1 className="text-red-500">Delete Team</h1>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
export default TeamBadge;
