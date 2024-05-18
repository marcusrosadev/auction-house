import { fetchWithHeaders } from '../api/header/header';
import { BASE_API_URL } from '../config/config';

export const ListingsServices = {
  async createListing(ListingData) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings`,
      'POST',
      ListingData,
    );
    console.log(response);
    return response;
  },

  async editListing(ListingData, id) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${id}`,
      'PUT',
      ListingData,
    );
    console.log(response);
    return response;
  },

  async getAllListings() {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings?_active=true`,
      'GET',
    );
    return response.data;
  },

  async getAllListingsPage(page, limit) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings?_active=true&page=${page}&limit=${limit}`,
      'GET',
    );
    return response.data;
  },

  async getListingById(listingId) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${listingId}?_seller=true&_bids=true`,
      'GET',
    );
    return response.data;
  },

  async updateListing(listingId, listingData) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${listingId}`,
      'PUT',
      listingData,
    );
    return response.data;
  },

  async deleteListing(listingId) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${listingId}`,
      'DELETE',
    );
    console.log(response);
    return response.data;
  },

  async bidOnListing(listingId, amount) {
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/${listingId}/bids`,
      'POST',
      {
        amount,
      },
    );

    if(response.ok) {
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
    return response.data;
  },

  async searchListings(searchParams, page, limit) {
    console.log(searchParams);
    const response = await fetchWithHeaders(
      `${BASE_API_URL}/auction/listings/search?q=${searchParams}&_active=true&page=${page}&limit=${limit}`,
      'GET',
    );
    return response.data;
  },
};
