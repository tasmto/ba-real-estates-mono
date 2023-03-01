export const DEFAULT_IMAGE =
  'https://images.prop24.com/296717329/Ensure1280x720';

export interface ReferenceType {
  name: string;
  query: string;
}

export const PROPERTY_FEATURE_REFERENCE: ReferenceType = {
  name: 'feature',
  query: "*[_type == 'propertyFeature']",
};

export const PROPERTY_CATEGORY_REFERENCE: ReferenceType = {
  name: 'category',
  query: "*[_type == 'propertyCategory']",
};

export const PROPERTY_AGENT_REFERENCE: ReferenceType = {
  name: 'agent',
  query: "*[_type == 'teamMember']",
};

export const UPDATED_LISTING_RESPONSE_TEXT = 'Updated your listing';
export const CREATED_LISTING_RESPONSE_TEXT = 'Created a new listing';
export const DELETED_LISTING_RESPONSE_TEXT = 'Deleted your listing';
