'use strict';

/**
 * cenik service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cenik.cenik');
