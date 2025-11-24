import dotenv from 'dotenv';
dotenv.config();

export const projectsConfig: ProjectsConfig = {
  ikea: {
    prod: {
      baseUrl: 'https://www.ikea.com/es',
    },
  },
};

export interface ProjectsConfig {
  ikea: {
    prod: ProjectConfig;
  };
}

export interface ProjectConfig {
  baseUrl: string;
}
