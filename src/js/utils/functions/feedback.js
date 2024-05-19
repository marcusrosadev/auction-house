export default function createFeedbackPopup(message, type) {
  const alertType = type === 'success' ? 'alert-success' : 'alert-danger';
  const alertIcon =
    type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle';

  // Create a container for the popup
  const popupContainer = document.createElement('div');
  popupContainer.className = `alert ${alertType} alert-dismissible fade show`;
  popupContainer.style.position = 'fixed';
  popupContainer.style.top = '1rem';
  popupContainer.style.right = '1rem';
  popupContainer.style.zIndex = '99999';
  popupContainer.role = 'alert';

  // Create the inner HTML of the popup
  popupContainer.innerHTML = `
    <i class="bi ${alertIcon} me-2"></i>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Append the popup to the body
  document.body.appendChild(popupContainer);

  // Remove the popup after 5 seconds
  setTimeout(() => {
    popupContainer.classList.remove('show');
    setTimeout(() => document.body.removeChild(popupContainer), 150); // wait for fade out transition
  }, 5000);
}
