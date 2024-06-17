const helloWorld = {
  init() {
    Array.from(document.querySelectorAll('[data-cmp-is="helloworld"]')).forEach(
      (helloWorldElement) => {
        (helloWorldElement as HTMLDivElement).removeAttribute('data-cmp-is');
        this.logPropertyAndModel(helloWorldElement as HTMLDivElement);
      },
    );

    this.mutationObserver.observe(document.body, this.mutationObserverConfig);
  },

  logPropertyAndModel(helloWorldElement: HTMLDivElement) {
    const property = helloWorldElement.querySelectorAll(
      '[data-cmp-hook-helloworld="property"]',
    );
    const textProperty = property.length === 1 ? property[0].textContent : null;
    const model = helloWorldElement.querySelectorAll(
      '[data-cmp-hook-helloworld="model"]',
    );
    const modelMessage = model.length === 1 ? model[0].textContent : null;

    // eslint-disable-next-line no-console
    console.log(
      'HelloWorld component JavaScript example',
      '\nText property:\n',
      textProperty,
      '\nModel message:\n',
      modelMessage,
    );
  },

  mutationObserver: new MutationObserver((mutationList) => {
    Array.from(mutationList).forEach((mutation) => {
      Array.from(mutation.addedNodes).forEach((addedNode) => {
        if (addedNode.nodeName === 'DIV') {
          const addedHelloWorldElements = (
            addedNode as HTMLElement
          ).querySelectorAll('[data-cmp-is="helloworld"]');
          Array.from(addedHelloWorldElements).forEach((helloWorldElement) => {
            helloWorld.logPropertyAndModel(helloWorldElement as HTMLDivElement);
          });
        }
      });
    });
  }),

  mutationObserverConfig: {
    characterData: true,
    childList: true,
    subtree: true,
  },
};

document.addEventListener('DOMContentLoaded', () => {
  helloWorld.init();
});
