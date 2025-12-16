import { projects } from "../data/mockData";

export const getAllProjects = () => {
  return Promise.resolve([...projects]);
};

export const assignProject = (projectId, freelancer) => {
  return Promise.resolve({
    success: true,
    projectId,
    freelancer,
  });
};
