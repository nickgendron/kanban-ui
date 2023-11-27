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
  console.log(activeTeamId);
  const { isLoading, data, isError, error } = useGetTeamQuery(activeTeamId);
  const [teamMembers, setTeamMembers] = useState([]);

  const [deleteUserFromTeam] = useDeleteUserFromTeamMutation();

  useEffect(() => {
    if (data) {
      const tmp = data.teamMembers;

      console.log(tmp);
      setTeamMembers(data.teamMembers);
      console.log(teamMembers);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  console.log(teamMembers.teamMembers);
  return (
    <div>
      <TopBar />
      <div className="p-4">
        <div className="flex flex-row">
          <h1 className="text-bold font-bold text-5xl">Team Members</h1>
            <AddNewTeamMemberCard />
          </div>
        </div>
        <div className="flex flex-wrap spacey-4">
          {teamMembers.map((member, index) => (
            <UserBadge key={index} userIn={member} />
          ))}{" "}
        </div>
      </div>
  );
}
