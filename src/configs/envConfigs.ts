interface IEnvConfigs {
  [key: string]: any;
}

const envConfigs: IEnvConfigs = {
  port: Boolean(process.env.PORT) ? parseInt(process.env.PORT as string) : 4000,
  isProd: process.env.NODE_ENV === "production",
  secret: process.env.SECRET ?? "devSecret",
};

export default envConfigs;
