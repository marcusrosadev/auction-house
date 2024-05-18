export async function createBidsHistory(listing) {
  const bids = listing.bids;

  if (!bids || bids.length === 0) {
    return `<p class="text-center">No bid history available.</p>`;
  }

  const sortedBids = bids.sort((a, b) => b.amount - a.amount);

  const lastThreeBids = sortedBids.slice(0, 3);

  const bidsHTML = lastThreeBids.map(bid => {
    return `
      <div class="col-auto mb-3">
        <div class="card">
          <div class="row g-0 align-items-center justify-content-center">
            <div class="col-md-5 text-center">
              <img
                src="${bid.bidder.avatar.url}"
                class="object-fit-cover ms-md-2 mt-2 mt-md-0"
                alt="${bid.bidder.avatar.alt || "Profile avatar"}"
                style="width: 3rem; height: 3rem"
              />
            </div>
            <div class="col-md-7">
              <div class="card-body text-center p-2">
                <p class="card-title text-nowrap">${bid.bidder.name}</p>
                <p class="card-text"><strong>$${bid.amount}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return bidsHTML;
}
