import TopBar from "../components/TopBar";
import TeamsDisplay from "../components/team/TeamsDisplay";
import ProjectDisplay from "../components/project/ProjectDisplay";

export default function Home() {
  return (
    <div className="grid justify-items-center gap-4 ">
      <TopBar />
      <div className="space-y-20 ">
        <TeamsDisplay />

        <ProjectDisplay />
      </div>
    </div>
  );
}
