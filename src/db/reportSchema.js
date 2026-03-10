import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    category: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
    message: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
    },
    sourceType: {
      type: String,
      enum: ["agent", "admin","csv","form"],
      default: "agent",
    },
  },{ timestamps: true },
);

export const Report = mongoose.model("Report", reportSchema);
