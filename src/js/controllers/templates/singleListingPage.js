import timestampConverter from '../../utils/functions/timestampConverter';
import { AuthServices } from '../../services/AuthServices.js';

export function createSingleListingPage(listing) {
  console.log("listing");
  console.log(listing);

  // Seller details
  const sellerAvatarUrl = listing.seller.avatar.url;
  const sellerName = listing.seller.name;

  // Item details
  const title = listing.title;
  const description = listing.description || "No description available.";
  const bidsCount = listing._count.bids;
  const endDate = timestampConverter(listing.endsAt); 

  const images = listing.media.length > 0 ? listing.media : ["https://source.unsplash.com/featured/?item"];

  const currentUser = AuthServices.getCurrentUser();
  console.log('currentUser', currentUser)
  return `
    <!-------------------------------- Seller-profile ------------------------------>
    <div class="row d-flex justify-content-center mb-4">
      <div class="single-item-media d-flex flex-row">
        <img
          class="img-thumbnail object-fit-cover rounded-circle"
          style="width: 4rem; height: 4rem"
          src="${sellerAvatarUrl}"
          alt="${listing.seller.avatar.alt}"
        />
        <div class="ps-3 pt-1 d-flex justify-content-between w-100">
          <div class="w-25">
            <p class="m-0"><strong>Seller</strong></p>
            <p>${sellerName}</p>
          </div>

          ${
            (listing.seller.name === currentUser.name) && (listing.seller.email === currentUser.email) ? (`
              <div id="ownerBtns" class="d-flex">
              <button
                id="edit-btn"
                class="btn btn-outline-primary px-lg-4 edit-modal-btn h-75 me-2"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                type="button"
              >
                Edit
              </button>

              <!--------------------------------- Edit Modal ------------------------>
              <div
                class="modal fade"
                id="editModal"
                tabindex="-1"
                aria-labelledby="edit"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                      <h5 class="modal-title" id="edit">BidBlast</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <!------------------------ Edit form ------------------------>
                      <form>
                        <div class="mb-3">
                          <label for="title" class="form-label">Title</label>
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            placeholder="Listing title"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="description" class="form-label"
                            >Description</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="description"
                            placeholder="Listing description"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="gallery" class="form-label"
                            >Image URL</label
                          >
                          <input
                            type="url"
                            class="form-control"
                            id="image-url"
                            placeholder="Image URL"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="date" class="form-label">Ends at</label>
                          <input
                            type="date"
                            class="form-control"
                            id="event-date"
                            placeholder="Choose a date"
                          />
                        </div>
                        <!-------------------------- Update-btn ------------------------->
                        <button type="submit" class="btn btn-primary px-5">
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <!-------------------------- Delete-btn ------------------------->
              <button
                id="delete-btn"
                class="btn btn-outline-primary px-lg-4 delete-modal-btn h-75 "
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                type="button"
              >
                Delete
              </button>

              <div
                class="modal fade"
                id="deleteModal"
                tabindex="-1"
                aria-labelledby="editModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                      <h5 class="modal-title" id="editModalLabel">BidBlast</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <p class="mb-4 text-center">
                        Are you sure that you want to delete this item
                        permanently?
                      </p>
                      <div class="d-flex justify-content-around">
                        <button
                          type="submit"
                          class="btn btn-outline-primary px-5"
                        >
                          Cancel
                        </button>
                        <button type="submit" class="btn btn-primary px-5">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `) : ''
          }
          
        </div>
      </div>
    </div>

    <div
      class="auction-container d-flex justify-content-center position-relative"
    >
      <div class="card mb-3 single-item-media">
        <div class="row g-0">
          <div class="col-md-5">
            <div id="carouselExample" class="carousel slide">
              <div class="carousel-inner">
                ${images.map((img, index) => `
                  <picture class="carousel-item ${index === 0 ? 'active' : ''} auction-card">
                    <img
                      src="${img.url}"
                      class="d-block w-100"
                      alt="..."
                    />
                  </picture>
                `).join('')}
              </div>
              
              ${
                images.length > 1 ? (
                  `
                    <button
                      class="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Previous</span>
                    </button>

                    <button
                      class="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                `) : ''
              }
            </div>
          </div>
          <div class="col-md-7">
            <div
              class="card-body h-100 d-flex flex-column position-relative p-0"
            >
              <article class="d-flex flex-column h-100 py-5 px-4 px-lg-5">
                <h5 class="card-title">${title}</h5>
                <p class="my-auto text-start m-0">
                  ${description}
                </p>
                <button
                  class="btn btn-success text-white px-lg-4 login-modal-btn btn-bid mb-5"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                  type="button"
                  id="bidButton"
                >
                  Bid Now
                </button>
              </article>

              <div class="py-3 bg-secondary position-absolute bottom-0 w-100">
                <div
                  class="d-flex justify-content-between align-items-center px-4 px-lg-5"
                >
                  <p class="m-0">Bids: ${bidsCount}</p>
                  <small class="fst-italic">End date: ${endDate}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
