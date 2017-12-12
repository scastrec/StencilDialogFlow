import { render } from '@stencil/core/testing';
import { AppCHat } from './app-chat';

describe('app-chat', () => {
  it('should build', () => {
    expect(new AppChat()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [AppChat],
        html: '<app-chat></app-chat>'
      });
    });
  });
});