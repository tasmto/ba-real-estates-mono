import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Blog Posts
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Author — `reference`
   *
   *
   */
  author?: SanityReference<TeamMember>;

  /**
   * Main image — `image`
   *
   *
   */
  mainImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;
}

/**
 * Property Categories
 *
 *
 */
export interface PropertyCategory extends SanityDocument {
  _type: "propertyCategory";

  /**
   * Title — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Featured Image — `image`
   *
   *
   */
  coverImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Category Icon — `image`
   *
   *
   */
  icon?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Common Names — `array`
   *
   *
   */
  commonNames?: Array<SanityKeyed<string>>;
}

/**
 * Property Features
 *
 *
 */
export interface PropertyFeature extends SanityDocument {
  _type: "propertyFeature";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Description — `blockContent`
   *
   *
   */
  description?: BlockContent;

  /**
   * Common Names — `array`
   *
   *
   */
  commonNames?: Array<SanityKeyed<string>>;

  /**
   * Indoor feature — `boolean`
   *
   * Is this an indoor feature (in most cases)?
   */
  indoor?: boolean;
}

/**
 * Properties
 *
 *
 */
export interface Property extends SanityDocument {
  _type: "property";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Price — `number`
   *
   *
   */
  price?: number;

  /**
   * Property Type — `reference`
   *
   *
   */
  category?: SanityReference<PropertyCategory>;

  /**
   * Area — `reference`
   *
   *
   */
  location?: SanityReference<Area>;

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Featured Image — `image`
   *
   *
   */
  featuredImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Gallery — `array`
   *
   *
   */
  gallery?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * Bedrooms — `number`
   *
   *
   */
  bedrooms?: number;

  /**
   * Bathrooms — `number`
   *
   *
   */
  bathrooms?: number;

  /**
   * Size — `number`
   *
   *
   */
  size?: number;

  /**
   * Features — `array`
   *
   *
   */
  features?: Array<SanityKeyedReference<PropertyFeature>>;

  /**
   * Property Agents — `array`
   *
   *
   */
  agents?: Array<SanityKeyedReference<TeamMember>>;

  /**
   * External Media — `array`
   *
   * This can be links to embeddable videos, slides etc.
   */
  externalMedia?: Array<SanityKeyed<string>>;

  /**
   * Mandate Start — `date`
   *
   *
   */
  mandateStart?: string;

  /**
   * Mandate End — `date`
   *
   *
   */
  mandateEnd?: string;

  /**
   * Virtual Tour — `url`
   *
   * A link to an embeddable 3D tour of the property.
   */
  virtualTour?: string;

  /**
   * Property 24 Id — `string`
   *
   *
   */
  property24Id?: string;

  /**
   * Property 24 Link — `url`
   *
   *
   */
  property24Link?: string;
}

/**
 * Team Members
 *
 *
 */
export interface TeamMember extends SanityDocument {
  _type: "teamMember";

  /**
   * Full Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Job Title — `string`
   *
   *
   */
  role?: string;

  /**
   * Short Bio — `text`
   *
   *
   */
  bio?: string;

  /**
   * Operational Areas — `array`
   *
   *
   */
  areas?: Array<SanityKeyed<Area>>;

  /**
   * Profile Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Started at — `datetime`
   *
   *
   */
  startedAt?: string;

  /**
   * WhatsApp Number — `string`
   *
   * Please enter it without a plus (+) or a leading zero (0)
   */
  whatsapp?: string;

  /**
   * Phone Number — `string`
   *
   * Please enter it without a plus (+) or a leading zero (0)
   */
  phoneNumber?: string;

  /**
   * Facebook Profle — `url`
   *
   *
   */
  facebook?: string;

  /**
   * Instagram Profle — `url`
   *
   *
   */
  instagram?: string;

  /**
   * Linkedin Profle — `url`
   *
   *
   */
  linkedin?: string;

  /**
   * Team Member's Email — `string`
   *
   *
   */
  email?: string;

  /**
   * Display contact info — `boolean`
   *
   * Would you like this team member's contact info visible on the website?
   */
  contactable?: boolean;

  /**
   * Common Names — `array`
   *
   *
   */
  commonNames?: Array<SanityKeyed<string>>;
}

/**
 * Property Areas
 *
 *
 */
export interface Area extends SanityDocument {
  _type: "area";

  /**
   * Name — `string`
   *
   * The name of the location
   */
  name?: string;

  /**
   * Location — `object`
   *
   * This uses Google maps to format the address so make sure you double check the area.
   */
  location?: {
    _type: "location";
    /**
     * Coordinates — `geopoint`
     *
     *
     */
    coordinates?: SanityGeoPoint;

    /**
     * Full address — `string`
     *
     *
     */
    formatted_address?: string;

    /**
     * Full address — `string`
     *
     *
     */
    place_id?: string;
  };
}

export type BlockContent = Array<SanityKeyed<SanityBlock>>;

export type Documents =
  | Post
  | PropertyCategory
  | PropertyFeature
  | Property
  | TeamMember
  | Area;
