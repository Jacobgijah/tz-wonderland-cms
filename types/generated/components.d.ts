import type { Schema, Struct } from '@strapi/strapi';

export interface SharedTextItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_items';
  info: {
    displayName: 'text-item';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TourItineraryDay extends Struct.ComponentSchema {
  collectionName: 'components_tour_itinerary_days';
  info: {
    displayName: 'itinerary-day';
  };
  attributes: {
    day: Schema.Attribute.Integer;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface TourQuickFacts extends Struct.ComponentSchema {
  collectionName: 'components_tour_quick_facts';
  info: {
    displayName: 'quick-facts';
  };
  attributes: {
    bestSeason: Schema.Attribute.String;
    difficulty: Schema.Attribute.Enumeration<
      ['Easy', 'Moderate', 'Challenging']
    >;
    duration: Schema.Attribute.String;
    groupSize: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.text-item': SharedTextItem;
      'tour.itinerary-day': TourItineraryDay;
      'tour.quick-facts': TourQuickFacts;
    }
  }
}
