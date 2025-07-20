'use strict';

/**
 * o-mne service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::o-mne.o-mne');
