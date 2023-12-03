import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetTeamQuery } from "../api/ReduxApiHandler";
import UserBadge from "../components/UserBadge";
import TopBar from "../components/TopBar";
import { useDeleteUserFromTeamMutation } from "../api/ReduxApiHandler";
import AddNewTeamMemberCard from "../components/team/AddNewTeamMemberCard";

export default function TeamPage() {
  const location = useLocation();
  const team = location.state?.team;

  const activeTeamId = useSelector((state) => state.activeTeam.team);

  const { isLoading, data, isError, error } = useGetTeamQuery(activeTeamId);
  const [teamMembers, setTeamMembers] = useState([]);

  const [deleteUserFromTeam] = useDeleteUserFromTeamMutation();

  useEffect(() => {
    if (data) {
      const tmp = data.teamMembers;

      setTeamMembers(data.teamMembers);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* <TopBar /> */}
      <h1 className="text-bold font-bold text-5xl pt-4">Team Members</h1>

      <div className="grid justify-items-center gap-4 ">
        {/* <TopBar /> */}
        <div className="p-4">
          <div className="flex flex-row">
            <h1 className="text-bold font-bold text-5xl">Team Members</h1>
          </div>
        </div>
        <div className="pt-2 grid grid-cols-3 gap-4 ">
          {" "}
          {teamMembers.map((member, index) => (
            <UserBadge key={index} userIn={member} />
          ))}{" "}
          <AddNewTeamMemberCard />
        </div>
      </div>
    </div>
  );
}
