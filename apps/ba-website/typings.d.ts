import { Area, Property } from 'types';

interface PropertyWithLocation extends Omit<Property, 'location' | 'agents'> {
  location: Area;
}
