import { AppSettings } from './app-settings';

describe('AppSettings', () => {
  it('create an appsettings instance', () => {
    expect(new AppSettings()).toBeTruthy();
  });
});
