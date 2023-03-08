declare interface MyContext {
  req?: Request;
  res?: Response;
  userId?: string | undefined;
  userRole?: string | undefined;
}
