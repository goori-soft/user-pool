export type Event<Body = any> = {
  name: string,
  identifier: string,
  issuedOn: string,
  body: Body
}