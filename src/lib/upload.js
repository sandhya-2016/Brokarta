import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

/**
 * Encrypts an image buffer using AES-256-GCM.
 * @param {Buffer} buffer - The image buffer to encrypt.
 * @param {string} [secretKey] - 32-byte encryption key (defaults to process.env.NEXTAUTH_SECRET).
 * @returns {{ encrypted: Buffer, iv: string, authTag: string }}
 */
export function encryptImageBuffer(buffer, secretKey = process.env.NEXTAUTH_SECRET || "default_brokarta_secret_key_32b") {
  const key = crypto.createHash("sha256").update(secretKey).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const authTag = cipher.getAuthTag().toString("hex");

  return {
    encrypted,
    iv: iv.toString("hex"),
    authTag,
  };
}

/**
 * Decrypts an AES-256-GCM encrypted image buffer.
 * @param {Buffer} encryptedBuffer - The encrypted image buffer.
 * @param {string} ivHex - Hex string IV.
 * @param {string} authTagHex - Hex string auth tag.
 * @param {string} [secretKey] - 32-byte encryption key.
 * @returns {Buffer} The decrypted image buffer.
 */
export function decryptImageBuffer(encryptedBuffer, ivHex, authTagHex, secretKey = process.env.NEXTAUTH_SECRET || "default_brokarta_secret_key_32b") {
  const key = crypto.createHash("sha256").update(secretKey).digest();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
}

/**
 * Generates a SHA-256 hash signature for an image file buffer.
 * @param {Buffer} buffer 
 * @returns {string} 64-character hex hash
 */
export function generateImageHash(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

/**
 * Saves a File object to the public/uploads/<subfolder> directory using cryptographic filename encryption logic.
 * @param {File} file - The file object from Request.formData().
 * @param {string} subfolder - Subfolder name ('testimonials', 'story-panels', 'workflow-items', 'seo').
 * @returns {Promise<string>} The public URL path (e.g. '/uploads/testimonials/a1b2c3d4...jpg').
 */
export async function saveUploadedFile(file, subfolder) {
  if (!file) return null;

  const validSubfolders = ["testimonials", "story-panels", "workflow-items", "seo"];
  if (!validSubfolders.includes(subfolder)) {
    throw new Error("Invalid subfolder specified for upload");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Cryptographic hash encryption logic for secure, unguessable filenames
  const fileExt = path.extname(file.name) || ".png";
  const secureHash = crypto
    .createHash("sha256")
    .update(buffer)
    .update(crypto.randomBytes(16))
    .digest("hex")
    .slice(0, 32);

  const filename = `${secureHash}${fileExt}`;

  // Target directory
  const uploadDir = path.join(process.cwd(), "public", "uploads", subfolder);
  
  // Ensure directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  // Write file
  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buffer);

  // Return public URL path
  return `/uploads/${subfolder}/${filename}`;
}

/**
 * Deletes an uploaded file from the public/uploads directory.
 * @param {string} imageUrl - The public URL path to delete.
 */
export async function deleteUploadedFile(imageUrl) {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;

  try {
    const filePath = path.join(process.cwd(), "public", imageUrl);
    await fs.unlink(filePath);
    console.log("Successfully deleted upload file from filesystem:", filePath);
  } catch (err) {
    console.error("Failed to delete file from filesystem:", err.message);
  }
}
