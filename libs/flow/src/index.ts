/** @format */

type Config = {
  name: string;
};

const flow = (config: Config) => {
  return {
    add() {
      return config.name;
    },
  };
};

export default flow;
