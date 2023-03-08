declare interface MyContext {
  req?: Request;
  res?: Response;
  user?: User | undefined;
}
