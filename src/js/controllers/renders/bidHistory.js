export async function createBidsHistory() {
  return `
    <div class="col-auto mb-3">
      <div class="card">
        <div class="row g-0 align-items-center justify-content-center">
          <div class="col-md-5 text-center">
            <img
              src="https://source.unsplash.com/featured/?profile"
              class="object-fit-cover ms-md-2 mt-2 mt-md-0"
              alt="Happy customer"
              style="width: 3rem; height: 3rem"
            />
          </div>
          <div class="col-md-7">
            <div class="card-body text-center p-2">
              <p class="card-title text-nowrap">Maik</p>
              <p class="card-text"><strong>$250</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
