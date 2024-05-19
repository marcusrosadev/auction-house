import { fetchWithHeaders } from '../api/header/header';
import { BASE_API_URL } from '../config/config';

export const ListingsServices = {
  async createListing(ListingData) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings`,
      'POST',
      ListingData,
    );
    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },

  async editListing(ListingData, id) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${id}`,
      'PUT',
      ListingData,
    );
    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },

  async getAllListings() {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings?_active=true`,
      'GET',
    );
    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },

  async getAllListingsPage(page, limit) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings?_active=true&page=${page}&limit=${limit}`,
      'GET',
    );
    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },

  async getListingById(listingId) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${listingId}?_seller=true&_bids=true`,
      'GET',
    );
    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },

  async updateListing(listingId, listingData) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${listingId}`,
      'PUT',
      listingData,
    );
    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },

  async deleteListing(listingId) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${listingId}`,
      'DELETE',
    );
    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },

  async bidOnListing(listingId, amount) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${listingId}/bids`,
      'POST',
      {
        amount,
      },
    );

    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },

  async listingsByProfile(name) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/profiles/${name}/listings`,
      'GET',
    );
    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },

  async searchListings(searchParams, page, limit) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/search?q=${searchParams}&_active=true&page=${page}&limit=${limit}`,
      'GET',
    );
    if (response.data) {
      return response.data;
    } else {
      throw response;
    }
  },
};
