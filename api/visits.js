import { getVisitsCollection } from '../server/mongodb.js';
import { createVisitsHandler } from '../server/visits.js';

export default createVisitsHandler(getVisitsCollection);
