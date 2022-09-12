export type EventData<Body = any> = {
  name: string,
  identifier: string,
  issuedOn: string,
  body: Body
}