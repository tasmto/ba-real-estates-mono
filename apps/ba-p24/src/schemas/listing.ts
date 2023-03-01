import {
  PROPERTY_AGENT_REFERENCE,
  PROPERTY_CATEGORY_REFERENCE,
  PROPERTY_FEATURE_REFERENCE,
} from '@/constants/index';
import { ScrapeSchemaType } from '@/utils/scrape';

const schema: Record<any, ScrapeSchemaType> = {
  address: {
    selector:
      '.p24_listingContent > .p24_listingCard.p24_listingFeaturesWrapper > div:nth-child(3)',
    type: 'text',
    required: true,
    defaultValue: '',
  },

  type: {
    selector:
      '#js_accordion_propertyoverview > div > div:nth-child(2) > div.col-6.noPadding > div',
    type: 'text',
    required: true,
    defaultValue: '',
    reference: PROPERTY_CATEGORY_REFERENCE,
    key: 'category',
  },
  listedAgents: {
    selector: '#p24_listingAgency .p24_agentInfo h5',
    type: 'text',
    reference: PROPERTY_AGENT_REFERENCE,
    required: true,
    array: true,
    defaultValue: [],
    key: 'agents',
  },
  price: {
    selector: '.p24_mBM .p24_price',
    type: 'number',
    required: true,
    defaultValue: 0,
  },

  title: {
    selector:
      '.p24_listingContent > .p24_listingCard.p24_listingFeaturesWrapper > div:nth-child(2)',
    type: 'text',
    required: true,
    defaultValue: '',
  },
  description: {
    selector: '.p24_listingContent .js_expandedText.p24_expandedText',
    type: 'text', //may need a separaete implimetion that keeps html elements
    defaultValue: '',
  },

  bedrooms: {
    selector:
      '.p24_listingContent .p24_icons .p24_featureDetails[title*="Bedrooms"] span',
    type: 'number',
    defaultValue: 0,
  },
  bathrooms: {
    selector:
      '.p24_listingContent .p24_icons .p24_featureDetails[title*="Bathrooms"] span',
    type: 'number',
    defaultValue: 0,
  },
  size: {
    selector:
      '.p24_listingContent .p24_icons .p24_featureDetails[title*="Erf Size"] span',
    type: 'number',
    defaultValue: 0,
    required: false,
  },
  property24Id: {
    selector: '#breadCrumbContainer ul>:last-child',
    type: 'text',
    required: true,
    defaultValue: '',
  },
  featuredImage: {
    selector: '#listing-thumbnails .p24_galleryThumbnail img',
    type: 'image',
    required: true,
    defaultValue: '',
    // getAttribute('lazy-src') then remove the crop
  },
  gallery: {
    selector: '#listing-thumbnails .p24_galleryThumbnail img',
    type: 'images',
    array: true,
    defaultValue: [],
    // getAttribute('lazy-src') then remove the crop
  },
  'Car Parking': {
    selector:
      '.p24_listingContent .p24_icons .p24_featureDetails[title*="Parking Spaces"] span',
    type: 'boolean',
    defaultValue: false,
    reference: PROPERTY_FEATURE_REFERENCE,
    key: 'features',
    array: true,
  },
  Garden: {
    selector: '.p24_listingContent .p24_Study',
    type: 'boolean',
    defaultValue: false,
    reference: PROPERTY_FEATURE_REFERENCE,
    key: 'features',
    array: true,
  },
  'Pets Friendly': {
    selector: '.p24_listingContent .p24_Pet.Friendly',
    type: 'boolean',
    defaultValue: false,
    reference: PROPERTY_FEATURE_REFERENCE,
    key: 'features',
    array: true,
  },
  'Swimming Pool': {
    selector: '.p24_listingContent .p24_Pool',
    type: 'boolean',
    defaultValue: false,
    reference: PROPERTY_FEATURE_REFERENCE,
    key: 'features',
    array: true,
  },
  'Fiber ready': {
    selector: '.p24_listingContent .p24_Fibre.numberernet',
    type: 'boolean',
    defaultValue: false,
    reference: PROPERTY_FEATURE_REFERENCE,
    key: 'features',
    array: true,
  },
  Garages: {
    selector: '.p24_listingContent .p24_Garages',
    type: 'boolean',
    defaultValue: false,
    reference: PROPERTY_FEATURE_REFERENCE,
    key: 'features',
    array: true,
  },
  Furnished: {
    selector: '.p24_listingContent .p24_Furnished',
    type: 'boolean',
    defaultValue: false,
    reference: PROPERTY_FEATURE_REFERENCE,
    key: 'features',
    array: true,
  },
  Study: {
    selector: '.p24_listingContent .p24_Study',
    type: 'boolean',
    defaultValue: false,
    reference: PROPERTY_FEATURE_REFERENCE,
    key: 'features',
    array: true,
  },
};

export default schema;
