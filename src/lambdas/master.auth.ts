import master from '@/userPool/entities/Master'

const sender = {
  send: (payload: any)=>{}
}

export const handler = (event: any)=>{
  const body = JSON.parse(event.body)
  try{
    const token = master.auth(body.masterAccessKey)
    sender.send(token)
  }
  catch(e: any){
    throw new Error(`bananas`)
  }
}