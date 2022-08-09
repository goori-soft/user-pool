import { WebError } from '@/entities/webError'

function randomBetween(min: number, max: number){
  const floatValue = Math.random() * (max - min + 1) + min
  const intValue = Math.floor(floatValue)
  return intValue
}

function findIndexInArray(array: any[], value: any){
  return array.findIndex( (element:any)=> element === value )
}

export class AccessKey{
  private static keyPositions: string[] = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  constructor(private key: string){
    this.validate()
  }

  getValue(): string{
    return this.key
  }

  private validate(): void{
    const errorMessage = `Access key is not a valid key`
    const keyParts = this.key.split('-')
    if(keyParts.length !== 3) throw new WebError(errorMessage, 500);
    if(keyParts[0].length !== keyParts[1].length) throw new WebError(errorMessage, 500)
    if(keyParts[0].length !== keyParts[2].length) throw new WebError(errorMessage, 500)

    const validatorBlock = AccessKey.generateValidatorBlock(keyParts[0], keyParts[1])
    if(validatorBlock !== keyParts[2]) throw new WebError(errorMessage, 500)
  }

  static generateAccessKey(): AccessKey{
    const block1 = AccessKey.generateKeyBlock()
    const block2 = AccessKey.generateKeyBlock()
    const block3 = AccessKey.generateValidatorBlock(block1, block2)

    const key = `${block1}-${block2}-${block3}`
    return new AccessKey(key)
  }

  private static generateKeyBlock(): string{
    const maxBlockChars = 5
    const chars: string[] = []
    for(let i = 0; i < maxBlockChars; i++){
      const charPosition = randomBetween(0, AccessKey.keyPositions.length - 1)
      const char = AccessKey.keyPositions[charPosition]
      chars.push(char)
    }
    return chars.join('')
  }

  private static generateValidatorBlock(block1: string, block2: string): string{
    const maxPosition = AccessKey.keyPositions.length-1
    const block1Parts = block1.split('')
    const block2Parts = block2.split('')
    if(block1Parts.length !== block2Parts.length) throw new WebError(`Acess key blocks must have the same size`, 500)

    const validatorBlock: string[] = []
    for(let i = 0; i < block1Parts.length; i++){
      const char1 = block1Parts[i]
      const char1Value = findIndexInArray(AccessKey.keyPositions, char1)
      
      const char2 = block2Parts[i]
      const char2Value = findIndexInArray(AccessKey.keyPositions, char2)

      let newCharPosition = char1Value + char2Value
      if(newCharPosition > maxPosition) newCharPosition -= maxPosition
      validatorBlock.push(AccessKey.keyPositions[newCharPosition])
    }

    return validatorBlock.join('')
  }
}
