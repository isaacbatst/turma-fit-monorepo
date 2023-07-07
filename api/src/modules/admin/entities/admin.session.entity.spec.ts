import { AdminSession } from './admin.session.entity';

describe('AdminSession', () => {
  let adminSession: AdminSession;
  beforeEach(() => {
    const twoDays = 1000 * 60 * 60 * 24 * 2;
    adminSession = new AdminSession({
      createdAt: new Date('2020-01-01'),
      expiresIn: twoDays,
      token: 'token',
      userId: 'userId',
    });
  });

  it('should create admin session', () => {
    expect(adminSession.getToken()).toBe('token');
    expect(adminSession.getExpiresAt()).toEqual(new Date('2020-01-01'));
    expect(adminSession.getExpiresIn()).toBe(1000 * 60 * 60 * 24 * 2);
  });

  it('should return session is expired', () => {
    expect(adminSession.isExpired(new Date('2020-01-04'))).toBeTruthy();
  });

  it('should return session is not expired', () => {
    expect(adminSession.isExpired(new Date('2020-01-03'))).toBeFalsy();
  });

  it('should return session is not logged out', () => {
    expect(adminSession.isLoggedOut()).toBeFalsy();
  });

  it('should loggout session', () => {
    adminSession.logout(new Date('2020-01-02'));
    expect(adminSession.isLoggedOut()).toBeTruthy();
    expect(adminSession.getLoggedOutAt()).toEqual(new Date('2020-01-02'));
  });

  it('should return session is valid if not expired and not logged out', () => {
    const when = new Date('2020-01-02');
    expect(adminSession.isExpired(when)).toBeFalsy();
    expect(adminSession.isLoggedOut()).toBeFalsy();
    expect(adminSession.isValid(when)).toBeTruthy();
  });

  it('should return session is not valid if expired', () => {
    const when = new Date('2020-01-04');
    expect(adminSession.isExpired(when)).toBeTruthy();
    expect(adminSession.isLoggedOut()).toBeFalsy();
    expect(adminSession.isValid(when)).toBeFalsy();
  });

  it('should return session is not valid if logged out', () => {
    const when = new Date('2020-01-02');
    adminSession.logout(when);
    expect(adminSession.isExpired(when)).toBeFalsy();
    expect(adminSession.isLoggedOut()).toBeTruthy();
    expect(adminSession.isValid(when)).toBeFalsy();
  });
});
