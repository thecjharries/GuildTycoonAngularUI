import { StupidjunkPage } from './app.po';

describe('stupidjunk App', () => {
  let page: StupidjunkPage;

  beforeEach(() => {
    page = new StupidjunkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
