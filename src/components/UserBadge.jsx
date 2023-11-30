import React from "react";
import MenuIcon from "./MenuIcon";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useSelector } from "react-redux";
import { useDeleteUserFromTeamMutation } from "../api/ReduxApiHandler";

export default function UserBadge({ userIn }) {
  console.log(userIn);

  const activeTeamId = useSelector((state) => state.activeTeam.team);
  const [deleteUserFromTeam] = useDeleteUserFromTeamMutation();
  const userId = userIn.internalUserId;
  console.log("ID: ", userId);
  const handleDeleteUser = () => {
    deleteUserFromTeam({ teamId: activeTeamId, internalUserId: userId });
  };
  console.log(activeTeamId, userId);
  const user = {
    name: "Nicholas Gendron",
    email: "jdoe@kanban.com",
    jobTitle: "Software Engineer",
    imageUri: "https://i.pravatar.cc/300",
  };
  return (
    <div className="w-fit h-fit bg-white rounded-xl shadow-lg p-5 mb-4 mr-4 justify-end">
      <div className="w-fit h-1/4 flex flex-row space-x-4">
        <div className="">
          <img
            src={user.imageUri}
            className="rounded-lg h-40"
            alt="user avatar"
          />
        </div>
        <div>
          <div className="">
            <h1 className="font-bold text-xl">
              {userIn.firstName} {userIn.lastName}{" "}
            </h1>
          </div>
          <br />
          <h2>{user.jobTitle}</h2>
          <div className="flex flex-row justify-evenly ">
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Menu
          menuButton={<MenuButton>&#x2022; &#x2022; &#x2022;</MenuButton>}
          transition
        >
          <MenuItem onClick={handleDeleteUser}>Remove user</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
