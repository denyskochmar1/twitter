import { TwitterPage } from './app.po';

describe('twitter App', () => {
  let page: TwitterPage;

  beforeEach(() => {
    page = new TwitterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
