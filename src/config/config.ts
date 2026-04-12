import dotenv from 'dotenv';
dotenv.config();

export const projectsConfig: ProjectsConfig = {
  kolsquare: {
    prod: {
      baseUrl: 'https://kolsquare-qa.fly.dev',
    },
  },
};

export interface ProjectsConfig {
  kolsquare: {
    prod: ProjectConfig;
  };
}

export interface ProjectConfig {
  baseUrl: string;
}
