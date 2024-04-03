import { SysPasswordEncoder } from './SysPasswordEncoder';

describe('Sys password encoder', () => {
  const passEncoder = new SysPasswordEncoder();

  it('Should generate a hash password', async () => {
    const pass = '123';

    const hash = await passEncoder.hash(pass);

    expect(typeof hash).toBe('string');
    expect(hash).not.toBe(pass);
  });

  it('Should generate and compare a password', async () => {
    const pass = '123';

    const hash = await passEncoder.hash(pass);
    const validPass = await passEncoder.compare(pass, hash);
    const invalidPass = await passEncoder.compare('321', hash);

    expect(validPass).toBe(true);
    expect(invalidPass).toBe(false);
  });

  it('Should generate a token', async () => {
    const payload = { name: 'John' };

    const token = await passEncoder.tokenize(payload);

    expect(typeof token).toBe('string');
    expect(token).not.toBe(payload);
  });

  it('Should generate a generic token and then validate it', async () => {
    const payload = { name: 'John' };
    const passEncoder = new SysPasswordEncoder();
    const secretPassEncoder = new SysPasswordEncoder({ secret: 'shhhh' });

    const token = await secretPassEncoder.tokenize(payload);
    const invalidValidator = await passEncoder.validateToken(token);
    const validValidator = await secretPassEncoder.validateToken(token);

    expect(invalidValidator).toBe(false);
    expect(validValidator).toBe(true);
  });

  it('Should decode a token', async () => {
    const payload = { name: 'John' };
    const passEncoder = new SysPasswordEncoder();
    const secretPassEncoder = new SysPasswordEncoder({ secret: 'shhhh' });

    const token = await secretPassEncoder.tokenize(payload);
    const validDecoder = await secretPassEncoder.decodeToken(token);
    const invalidDecoder = await passEncoder.decodeToken(token);

    expect(validDecoder).toMatchObject(payload);
    expect(invalidDecoder).toMatchObject(payload);
  });
});
