// Declarations of submissions.ts: what this file exports, their arguments and what they return.
// import { SUBMITTED_OK, formLevelError, normalizePhone, normalizeUrl, submissionErrors, toSubmissionValues } from "./submissions-core.js";
// import type { FormFieldDto, FormValues, SubmissionDto, UploadedFile } from "./forms-types.js";
// export { SUBMITTED_OK, formLevelError, normalizePhone, normalizeUrl, submissionErrors, toSubmissionValues };
// export declare function uploadFile(formId: string, file: File): Promise<UploadedFile>;
// export declare function uploadFiles(formId: string, fields: FormFieldDto[], values: FormValues): Promise<FormValues>;
// export interface CreateSubmissionOptions {
//     captchaToken?: string;
// }
// export declare function createSubmission(formId: string, values: Record<string, unknown>, { captchaToken }?: CreateSubmissionOptions): Promise<SubmissionDto>;
// export declare function checkoutUrl(checkoutId: string, origin?: string): Promise<string>;
// Submissions over REST — the twin of app/wix/forms/submissions.ts. Same exports, same
// SubmissionDto; the rules come from submissions-core (the SAME file the SDK transport uses,
// deployed flat next to this one). Every call runs with the visitor token: `CreateSubmission` is
// listed under an owner scope and still returns 200 to an anonymous visitor, so a published site
// can submit its own forms. Submissions are write-only from a visitor — the resolved create IS
// the confirmation. A rejection throws a WixApiError whose `details` block `submissionErrors` and
// `formLevelError` map onto the page; let it throw.
// docs: https://dev.wix.com/docs/api-reference/crm/forms/form-submissions/create-submission.md
// docs: https://dev.wix.com/docs/api-reference/crm/forms/form-submissions/get-media-upload-url.md
// docs: https://dev.wix.com/docs/api-reference/business-management/headless/redirects/create-redirect-session.md
import { wixRequest } from "./client.js";
import { SUBMITTED_OK, formLevelError, normalizePhone, normalizeUrl, putUpload, redirectSessionBody, redirectSessionUrl, submissionErrors, toSubmission, toSubmissionValues, uploadFilesWith, uploadMimeType, } from "./submissions-core.js";
export { SUBMITTED_OK, formLevelError, normalizePhone, normalizeUrl, submissionErrors, toSubmissionValues };
const SUBMISSIONS = "/form-submission-service/v4/submissions";
/**
 * Upload one File and return the value to submit for its field ({ fileId, displayName, fileType, url }).
 * POST /form-submission-service/v4/submissions/media-upload-url  { formId, filename, mimeType }  → { uploadUrl }
 * then PUT the bytes to that URL with plain fetch (submissions-core.putUpload) and read its `file` back.
 */
export async function uploadFile(formId, file) {
    const mimeType = uploadMimeType(file);
    const res = await wixRequest(`${SUBMISSIONS}/media-upload-url`, { body: { formId, filename: file.name, mimeType } });
    const uploadUrl = res?.uploadUrl;
    if (!uploadUrl)
        throw new Error(`forms: no upload URL for "${file.name}".`);
    return putUpload(uploadUrl, file, mimeType);
}
/** Upload every File in the form's values; returns a copy with each file field holding its uploaded entries. */
export async function uploadFiles(formId, fields, values) {
    return uploadFilesWith(uploadFile, formId, fields, values);
}
/**
 * Create the submission — the write, and the only confirmation there is. `values` is
 * toSubmissionValues(fields, values): every key a field `target`, every value in that field's
 * shape. A 400 carries details.validationError.fieldViolations[].data.errors[] (errorPath,
 * errorType, useCustomErrorMessage) or details.applicationError.code on the thrown WixApiError.
 * POST /form-submission-service/v4/submissions  { submission: { formId, submissions }, captchaToken? }  → { submission: { id, status, orderDetails? } }
 */
export async function createSubmission(formId, values, { captchaToken } = {}) {
    const created = await wixRequest(SUBMISSIONS, {
        body: { submission: { formId, submissions: values }, ...(captchaToken ? { captchaToken } : {}) },
    });
    return toSubmission(created);
}
/**
 * The Wix-hosted checkout for a `PAYMENT_WAITING` submission — navigate the FULL document to the
 * URL. `origin` must be the site's real https origin (window.location.origin) as registered on
 * the OAuth app, so the checkout can send the visitor back.
 * POST /headless/v1/redirect-session  { ecomCheckout: { checkoutId }, callbacks: { postFlowUrl, thankYouPageUrl } }  → { redirectSession: { fullUrl } }
 */
export async function checkoutUrl(checkoutId, origin = typeof window !== "undefined" ? window.location.origin : "") {
    const res = await wixRequest("/headless/v1/redirect-session", { body: redirectSessionBody(checkoutId, origin) });
    return redirectSessionUrl(res);
}
