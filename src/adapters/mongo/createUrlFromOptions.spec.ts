import { createUrlFromOptions } from './createUrlFromOptions';

describe('Create url from options', () => {
  it('Should create a url connection', () => {
    const options = {
      host: 'localhost',
    };

    const url = createUrlFromOptions(options);

    expect(url).toBe('mongodb://localhost');
  });

  it('Should create a url connection', () => {
    const options = {
      user: 'john',
      host: 'localhost',
    };

    const url = createUrlFromOptions(options);

    expect(url).toBe('mongodb://john@localhost');
  });

  it('Should create a url connection', () => {
    const options = {
      user: 'john',
      pass: '123',
      host: 'localhost',
    };

    const url = createUrlFromOptions(options);

    expect(url).toBe('mongodb://john:123@localhost');
  });

  it('Should create a url connection', () => {
    const options = {
      user: 'john',
      pass: '123',
      host: 'localhost',
      db: 'test',
    };

    const url = createUrlFromOptions(options);

    expect(url).toBe('mongodb://john:123@localhost/test');
  });

  it('Should create a url connection', () => {
    const options = {
      user: 'john',
      pass: '123',
      host: 'localhost',
      db: 'test',
      port: 27017,
    };

    const url = createUrlFromOptions(options);

    expect(url).toBe('mongodb://john:123@localhost:27017/test');
  });

  it('Should create a url connection', () => {
    const options = {
      user: 'john',
      pass: '123',
      host: 'localhost',
      db: 'test',
      port: 27017,
      srv: true,
    };

    const url = createUrlFromOptions(options);

    expect(url).toBe('mongodb+srv://john:123@localhost:27017/test');
  });
});
