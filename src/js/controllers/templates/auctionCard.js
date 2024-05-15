import timestampConverter from '../../utils/functions/timestampConverter';

export function createAuctionCard(listing) {
  const imageUrl =
    listing.media && listing.media.length > 0
      ? listing.media[0].url
      : 'https://source.unsplash.com/featured/?furniture';
  const imageAlt =
    listing.media && listing.media.length > 0
      ? listing.media[0].alt
      : 'Default Image';
  const description =
    listing.description && listing.description.length > 0
      ? listing.description
      : 'No description provided.';

  return `
      <div class="col-md-6 col-lg-4 mt-3 mb-3">
          <div class="card auction-card">
              <img src="${imageUrl}" class="card-img-top" alt="${imageAlt}">
              <div class="card-body relative p-0">
                <div class="p-2 p-lg-4">
                  <h5 class="card-title">${listing.title}</h5>
                  <p class="card-text">${description}</p>
                  <a href="/src/pages/single-item/?id=${listing.id}" class="btn btn-primary mt-3">More Info</a>
                </div>
                  
                <div class="mt-3 absolute bg-secondary px-2 px-lg-4 py-2 py-lg-3">
                  <p class="card-text mt-2">Bids: ${String(listing._count.bids)}</p>
                  <small class="fst-italic">End date: ${timestampConverter(listing.endsAt)}</small>
                </div>
              </div>
          </div>
      </div>
  `;
}
