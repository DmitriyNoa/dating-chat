import { DatingChatPage } from './app.po';

describe('dating-chat App', () => {
  let page: DatingChatPage;

  beforeEach(() => {
    page = new DatingChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
