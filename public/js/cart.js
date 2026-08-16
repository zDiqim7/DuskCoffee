document.addEvemtListener('alpine:init', () => {
  Alpine.data('cart', () => ({
    items: {
      { id: 1, name: 'Arabica Decaf', img: '1.html', price: 20000},
    }
  }));
});