import type { Schema, Struct } from '@strapi/strapi';

export interface PopisPopis extends Struct.ComponentSchema {
  collectionName: 'components_popis_popis';
  info: {
    displayName: 'Popis';
    icon: 'book';
  };
  attributes: {
    popis: Schema.Attribute.Text;
  };
}

export interface RozvrzeniPopisPraxe extends Struct.ComponentSchema {
  collectionName: 'components_rozvrzeni_popis_praxes';
  info: {
    description: '';
    displayName: 'Popis Praxe';
    icon: 'book';
  };
  attributes: {
    popis: Schema.Attribute.Text;
    rok: Schema.Attribute.String;
  };
}

export interface RozvrzeniRichText extends Struct.ComponentSchema {
  collectionName: 'components_rozvrzeni_rich_texts';
  info: {
    displayName: 'RichText';
    icon: 'archive';
  };
  attributes: {
    richText: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'popis.popis': PopisPopis;
      'rozvrzeni.popis-praxe': RozvrzeniPopisPraxe;
      'rozvrzeni.rich-text': RozvrzeniRichText;
    }
  }
}
