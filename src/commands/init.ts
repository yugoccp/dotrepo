import ora from "ora";

import { prepareProjects } from "../projects";
import { prepareSolutions } from "../solutions";

import { createCommand, prepare } from "./base";

export const initCommand = createCommand({
  command: "init",
  describe: "Create a new Dotrepo repo or upgrade an existing repo to the current version of Dotrepo.",
  handler: async (args) => {
    const { projects, path, solutions, dependencyGraph } = await prepare(
      args, true
    );
    
    const spinner = ora("Preparing projects and solutions").start();
    try {
      await Promise.all([
        prepareProjects(projects, path),
        prepareSolutions(
          solutions,
          projects,
          dependencyGraph,
          path
        ),
      ]);
      spinner.succeed("Done");
    } catch (err) {
      spinner.fail("Failed to prepare projects and solutions");
      throw err;
    }
  },
});
