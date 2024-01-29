import crypto from "crypto";
import slugify from "slugify";

export default function generateUniqueIdentifier(title) {
  const uniquePart = crypto.randomBytes(10).toString("hex");
  const timestampPart = Date.now(); // Convert current timestamp to base36

  return `${slugify(title)}-${uniquePart}-${timestampPart}`;
}
