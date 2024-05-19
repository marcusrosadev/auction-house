export default function timestampTimer(timestamp) {
  function getCountdownString() {
    const now = new Date();
    const targetDate = new Date(timestamp);
    const timeDiff = targetDate - now;

    if (timeDiff <= 0) {
      return 'The event has ended';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return getCountdownString;
}
