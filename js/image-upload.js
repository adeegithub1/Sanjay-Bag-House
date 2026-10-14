/* ============================================================
   SANJAY BAG HOUSE — REAL IMAGE UPLOAD (via ImgBB, free tier)
   Firebase Storage requires the Blaze plan (not available), so this
   uses ImgBB's free API instead — works identically from the customer's
   perspective (a real image hosted on a real URL), just via a different
   host. Requires an ImgBB API key set in /admin/store-settings.html.
   ============================================================ */

import { loadUploadSettings } from "./store-settings.js";

/**
 * Uploads a File (from <input type="file">, including mobile camera capture)
 * to ImgBB and returns the hosted image URL.
 * Throws a user-friendly Error if the key isn't set or the upload fails.
 */
export async function uploadImageFile(file) {
  const settings = await loadUploadSettings();
  const apiKey = settings.imgbbApiKey;
  if (!apiKey) {
    throw new Error("Image upload isn't set up yet — add a free ImgBB API key in Store Settings first.");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  if (file.size > 32 * 1024 * 1024) {
    throw new Error("Image is too large — please choose one under 32MB.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    body: formData,
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error?.message || "Upload failed. Please try again.");
  }
  return result.data.url;
}

/**
 * Wires a "choose/take photo" file input to upload automatically on
 * selection, filling the given text input with the resulting URL and
 * calling onDone() afterwards (e.g. to refresh a preview).
 *   fileInputEl:  <input type="file" accept="image/*">
 *   urlInputEl:   the text input that stores the image URL
 *   onDone:       optional callback, called after success or failure
 */
export function wireImageUploadInput(fileInputEl, urlInputEl, onDone) {
  fileInputEl.addEventListener("change", async () => {
    const file = fileInputEl.files[0];
    if (!file) return;
    const originalPlaceholder = urlInputEl.placeholder;
    urlInputEl.disabled = true;
    urlInputEl.placeholder = "Uploading...";
    try {
      const url = await uploadImageFile(file);
      urlInputEl.value = url;
      urlInputEl.dispatchEvent(new Event("input", { bubbles: true }));
      window.showToast && window.showToast("Image uploaded successfully", "success");
    } catch (err) {
      window.showToast && window.showToast(err.message, "error");
    } finally {
      urlInputEl.disabled = false;
      urlInputEl.placeholder = originalPlaceholder;
      fileInputEl.value = "";
      if (onDone) onDone();
    }
  });
}
