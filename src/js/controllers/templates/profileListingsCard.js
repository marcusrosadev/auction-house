import timestampConverter from "../../utils/functions/timestampConverter.js";

export function createProfileListingsCard(profileListings) {
  return profileListings.map(listing => {
    const imageUrl = listing.media.length > 0 ? listing.media[0].url : 'https://source.unsplash.com/featured/?furniture';
    const imageAlt = listing.media.length > 0 ? listing.media[0].alt : 'Default Image';
    const title = listing.title || 'No title provided';
    const description = listing.description || 'No description provided';
    const bidsCount = listing._count.bids;
    const endsAt = timestampConverter(listing.endsAt);

    return `
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="card auction-card">
          <img src="${imageUrl}" class="card-img-top" alt="${imageAlt}" />
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <a href="#" class="btn btn-primary mt-3">More Info</a>
          </div>
          <div class="card-footer bg-secondary">
            <p class="card-text">Bids: ${bidsCount}</p>
            <small class="fst-italic">End date: ${endsAt}</small>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
