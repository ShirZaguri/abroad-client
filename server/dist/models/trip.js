"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TripSchema = new mongoose_1.Schema({
    destination: { type: String, requiered: true },
    attraction: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'attraction' }],
    startDate: { type: Date, requiered: true },
    endDate: { type: Date, requiered: true },
});
exports.default = mongoose_1.model('trip', TripSchema);
