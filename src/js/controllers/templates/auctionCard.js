import timestampConverter from "../../utils/functions/timestampConverter";

export function createAuctionCard(listing) {
  const imageUrl =
    listing.media && listing.media.length > 0
      ? listing.media[0].url
      : 'https://source.unsplash.com/featured/?furniture';
  const imageAlt =
    listing.media && listing.media.length > 0
      ? listing.media[0].alt
      : 'Default Image';

  return `
      <div class="col-md-4 mt-3 mb-3">
          <div class="card auction-card">
              <img src="${imageUrl}" class="card-img-top" alt="${imageAlt}">
              <div class="card-body">
                  <h5 class="card-title">${listing.title}</h5>
                  <p class="card-text">${listing.description}</p>
                  <a href="/src/pages/single-item/?id=${listing.id}" class="btn btn-primary">More Info</a>
                  <div>
                    <p class="card-text mt-2">Bids: ${String(listing._count.bids)}</p>
                    <small class="fst-italic">End date: ${timestampConverter(listing.endsAt)}</small>
                  </div>
              </div>
          </div>
      </div>
  `;
}
