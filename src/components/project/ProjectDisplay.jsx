import { useEffect, useState } from "react";
import ProjectBadge from "./ProjectBadge";
import AddNewProductCard from "./NewProjectCard";
import { useGetBoardsQuery } from "../../api/ReduxApiHandler";

export default function ProjectDisplay() {
  const { data, isLoading } = useGetBoardsQuery();
  console.log(data);

  useEffect(() => {
    if (data) {
      const tmp = data;

      console.log(tmp);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-6xl font-bold flex flex-row">Projects</h1>
      <div className="pt-2 grid grid-cols-3 gap-4">
        {data.map((board, index) => (
          <ProjectBadge key={index} project={board} />
        ))}
        <AddNewProductCard />
      </div>
    </div>
  );
}
