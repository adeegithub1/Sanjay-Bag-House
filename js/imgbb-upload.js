/* ============================================================
   SANJAY BAG HOUSE — IMGBB CAMERA UPLOAD
   Replaces the old "paste an image URL" fields with a real
   file/camera upload button. Selected photos are uploaded to
   ImgBB in the background; the returned hosted URLs are what
   get saved into the Firestore product document (same `images`
   array shape the rest of the app already expects).

   ⚠️ SETUP REQUIRED:
   1. Get a free API key from https://api.imgbb.com/ (sign in,
      then "Add API key").
   2. Paste it below in place of "YOUR_IMGBB_API_KEY".
   This key is only usable for image uploads (not your account),
   but it is visible in the browser like the rest of this admin
   panel's client-side config — only share this admin area with
   people you trust, same as today.
   ============================================================ */

const IMGBB_API_KEY = "8464aaec28177af4abb9f1c4f3a993f8";
const IMGBB_ENDPOINT = "https://api.imgbb.com/1/upload";

/** Uploads a single File to ImgBB and resolves with the hosted image URL. */
async function uploadToImgBB(file) {
  if (!IMGBB_API_KEY || IMGBB_API_KEY === "YOUR_IMGBB_API_KEY") {
    throw new Error("ImgBB API key is not configured (js/imgbb-upload.js).");
  }
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${IMGBB_ENDPOINT}?key=${encodeURIComponent(IMGBB_API_KEY)}`, {
    method: "POST",
    body: formData,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json || !json.success) {
    const msg = (json && json.error && json.error.message) || "ImgBB upload failed";
    throw new Error(msg);
  }
  // Prefer the direct image URL; fall back to display_url if present.
  return json.data.url || json.data.display_url;
}

/**
 * Wires up a camera/file-upload photo picker.
 *
 * @param {Object} opts
 * @param {HTMLInputElement} opts.input   - the (hidden) <input type="file">
 * @param {HTMLElement}      opts.button  - the visible "Add Photo" button
 * @param {HTMLElement}      opts.thumbs  - container to render thumbnails into
 * @param {number}           [opts.max=5] - maximum number of photos
 * @returns {{ getImages: () => string[], setImages: (urls: string[]) => void }}
 */
function createPhotoUploader({ input, button, thumbs, max = 5 }) {
  // Each item: { id, url, uploading, error }
  let items = [];

  function render() {
    thumbs.innerHTML = items
      .map((item) => {
        const bg = item.url ? `background-image:url('${item.url}')` : "";
        return `
          <div class="photo-thumb${item.error ? " photo-thumb-error" : ""}" data-id="${item.id}" style="${bg}">
            ${item.uploading ? '<div class="photo-thumb-spinner"></div>' : ""}
            ${item.error ? '<div class="photo-thumb-error-badge" title="' + item.error.replace(/"/g, "&quot;") + '">!</div>' : ""}
            ${!item.uploading ? '<button type="button" class="photo-thumb-remove" data-remove="' + item.id + '" aria-label="Remove photo">&times;</button>' : ""}
          </div>`;
      })
      .join("");

    thumbs.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        items = items.filter((i) => i.id !== btn.getAttribute("data-remove"));
        render();
        updateButtonState();
      });
    });
  }

  function updateButtonState() {
    const full = items.length >= max;
    button.disabled = full;
    button.textContent = full
      ? `Maximum ${max} photos`
      : (items.length ? "+ Add Another Photo" : "📷 Add Photo");
  }

  async function handleFiles(fileList) {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    const room = max - items.length;
    const toUpload = files.slice(0, Math.max(room, 0));

    for (const file of toUpload) {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const placeholder = { id, url: null, uploading: true, error: null };
      items.push(placeholder);
      render();
      updateButtonState();

      try {
        const url = await uploadToImgBB(file);
        placeholder.url = url;
        placeholder.uploading = false;
      } catch (err) {
        placeholder.uploading = false;
        placeholder.error = err.message || "Upload failed";
        if (window.showToast) showToast("Photo upload failed: " + placeholder.error, "error");
      }
      render();
      updateButtonState();
    }
  }

  button.addEventListener("click", () => {
    if (items.length >= max) return;
    input.click();
  });

  input.addEventListener("change", async (e) => {
    await handleFiles(e.target.files);
    input.value = ""; // reset so selecting/capturing the same photo again still fires 'change'
  });

  updateButtonState();

  return {
    getImages() {
      return items.filter((i) => i.url && !i.error).map((i) => i.url);
    },
    setImages(urls) {
      items = (urls || []).slice(0, max).map((url) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        url,
        uploading: false,
        error: null,
      }));
      render();
      updateButtonState();
    },
  };
}

window.ImgBBUploader = { uploadToImgBB, createPhotoUploader };
export { uploadToImgBB, createPhotoUploader };
