import { AdminSession } from './admin.session.entity';

describe('AdminSession', () => {
  it('should create admin session', () => {
    const adminSession = new AdminSession({
      createdAt: new Date('2020-01-01'),
      expiresIn: 1000,
      token: 'token',
    });

    expect(adminSession.getToken()).toBe('token');
    expect(adminSession.getExpiresAt()).toEqual(new Date('2020-01-01'));
    expect(adminSession.getExpiresIn()).toBe(1000);
  });

  it('should return session is expired', () => {
    const adminSession = new AdminSession({
      createdAt: new Date('2020-01-01'),
      expiresIn: 1000,
      token: 'token',
    });

    expect(adminSession.isExpired(new Date('2020-01-02'))).toBeTruthy();
  });

  it('should return session is not expired', () => {
    const twoDays = 1000 * 60 * 60 * 24 * 2;
    const adminSession = new AdminSession({
      createdAt: new Date('2020-01-01'),
      expiresIn: twoDays,
      token: 'token',
    });

    expect(adminSession.isExpired(new Date('2020-01-03'))).toBeFalsy();
  });
});
