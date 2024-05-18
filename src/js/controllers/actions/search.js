export async function searchController() {
  const searchInput = document.querySelector('input#search');
  const searchBtn = document.querySelector('button#search-btn');

  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (searchInput.value !== '') {
      window.location.href = `/src/pages/listings/?q=${searchInput.value}`;
    } else {
      alert('No value to search for.');
    }
  });
}
