import NodeGeocoder from 'node-geocoder';

const mapsApiOptions = {
  provider: 'google',
  // Optional depending on the providers
  //   fetch: customFetchImplementation,
  apiKey: process.env.GOOGLE_MAPS_PLATFORM_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null,
};

const geocoder = NodeGeocoder(mapsApiOptions);

export const geoLocate = async (address: string) => {
  return await geocoder.geocode(address);
};
