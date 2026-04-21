export const generateWhatsAppMessage = (cartItems, customerName = 'Customer') => {
  let message = `Halo Admin, saya ingin order:\n\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `Qty: ${item.quantity}\n`;
    message += `Harga: Rp${(item.price * item.quantity).toLocaleString('id-ID')}\n\n`;
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `Total: Rp${total.toLocaleString('id-ID')}\n\n`;
  message += `Mohon diproses ya 🙏`;

  return message;
};

export const redirectToWhatsApp = (message, phoneNumber) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const formatPrice = (price) => {
  return `Rp${price.toLocaleString('id-ID')}`;
};
