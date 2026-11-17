// комп release-updates sign-up. The form's fields come from Wix (Forms dashboard):
// this file renders whatever fields the form has, through the Wix form store.
import { createFormStore, FORM_ERROR, otherText, otherValue } from "/komp/js/wix/form-store.js";

const FORM_ID = "981318cb-b11f-4e4e-a1e0-71a79ab4a74f";
const OTHER = "__other__";
const root = document.getElementById("signup-form");
const store = createFormStore({ formId: FORM_ID });
let builtFor = null;
let byTarget = {};

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const inputType = (c) => ({ email: "email", url: "url", phone: "tel", password: "password", number: "number",
  date: "date", time: "time", datetime: "datetime-local" })[c] || "text";
const visible = (s) => {
  const steps = s.form.steps || [];
  return s.form.fields.filter((f) => !steps.length || f.stepId === steps[s.step].id);
};
const isOther = (f, v) => !!f.otherOption && v !== "" && v != null && otherText(f, v) !== null;
const mark = (s, f) => (f.required && s.form.requiredIndicator !== "NONE")
  ? (s.form.requiredIndicator === "TEXT" ? ' <span class="req">(required)</span>' : ' <span class="req">*</span>') : "";

function control(f, s) {
  const v = s.values[f.target];
  const id = "f-" + f.target;
  const dis = f.readOnly ? " disabled" : "";
  const ph = f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : "";
  switch (f.control) {
    case "checkbox":
      return '<label class="f-check"><input type="checkbox" id="' + id + '" name="' + f.target + '"' +
        (v === true ? " checked" : "") + dis + "><span>" + esc(f.label) + mark(s, f) + "</span></label>";
    case "textarea":
      return '<textarea class="f-input" id="' + id + '" name="' + f.target + '"' + ph + dis + ">" + esc(v) + "</textarea>";
    case "select": {
      let h = '<select class="f-input" id="' + id + '" name="' + f.target + '"' + dis + ">";
      h += '<option value="">' + (f.placeholder ? esc(f.placeholder) : "Choose one") + "</option>";
      (f.choices || []).forEach((c) => {
        h += '<option value="' + esc(c.value) + '"' + (v === c.value ? " selected" : "") + ">" + esc(c.label) + "</option>";
      });
      if (f.otherOption) h += '<option value="' + OTHER + '"' + (isOther(f, v) ? " selected" : "") + ">" + esc(f.otherOption.label || "Other") + "</option>";
      h += "</select>";
      if (f.otherOption) {
        h += '<input class="f-input f-other" type="text" name="' + f.target + "/" + OTHER + '" aria-label="' + esc(f.label) +
          ' (other)" placeholder="Tell us" value="' + esc(isOther(f, v) ? otherText(f, v) : "") + '"' + (isOther(f, v) ? "" : " hidden") + ">";
      }
      return h;
    }
    case "payment": case "appointment": case "unknown":
      return '<p class="f-help">This field can only be filled in on Wix.</p>';
    default:
      return '<input class="f-input" id="' + id + '" name="' + f.target + '" type="' + inputType(f.control) + '" value="' +
        esc(v) + '"' + ph + dis + ">";
  }
}

function build(s) {
  byTarget = {};
  let h = "";
  visible(s).forEach((f) => {
    byTarget[f.target] = f;
    h += '<div class="f-field" data-target="' + f.target + '">';
    if (f.control !== "checkbox") {
      h += '<label for="f-' + f.target + '"' + (f.showLabel === false ? ' class="sr-only"' : "") + ">" + esc(f.label) + mark(s, f) + "</label>";
    }
    h += control(f, s);
    if (f.description) h += '<p class="f-help">' + esc(f.description) + "</p>";
    h += '<p class="f-err" role="alert" hidden></p></div>';
  });
  const steps = s.form.steps || [];
  const last = !steps.length || s.step === steps.length - 1;
  h += '<p class="f-err f-form-err" role="alert" hidden></p><div class="f-actions">';
  if (steps.length > 1 && s.step > 0) h += '<button type="button" class="f-back">' + esc(s.form.previousText || "Back") + "</button>";
  h += '<button type="submit" class="f-submit">' + esc(last ? (s.form.submitText || "Notify me") : (s.form.nextText || "Continue")) + "</button>";
  h += '<span class="f-note">One email per release. Unsubscribe any time.</span></div>';
  root.innerHTML = h;
  const back = root.querySelector(".f-back");
  if (back) back.addEventListener("click", () => store.previous());
}

function update(s) {
  root.querySelectorAll(".f-field").forEach((el) => {
    const t = el.dataset.target;
    const err = s.errors[t];
    const p = el.querySelector(".f-err");
    p.textContent = err || "";
    p.hidden = !err;
    const c = el.querySelector('[name="' + t + '"]');
    if (c) { if (err) c.setAttribute("aria-invalid", "true"); else c.removeAttribute("aria-invalid"); }
    const other = el.querySelector(".f-other");
    if (other) other.hidden = !isOther(byTarget[t], s.values[t]);
  });
  const fe = root.querySelector(".f-form-err");
  if (fe) { fe.textContent = s.errors[FORM_ERROR] || ""; fe.hidden = !s.errors[FORM_ERROR]; }
  const btn = root.querySelector(".f-submit");
  if (btn) { btn.disabled = !!s.loading; btn.setAttribute("aria-busy", s.loading ? "true" : "false"); }
}

function render(s) {
  if (s.outcome) {
    if (s.outcome.url) { if (s.outcome.newTab) window.open(s.outcome.url, "_blank"); else window.location.assign(s.outcome.url); return; }
    const lines = (s.outcome.message || "You're on the list. Thanks!").split("\n");
    root.innerHTML = '<div class="f-thanks" role="status">' + lines.map((l) => "<p>" + esc(l) + "</p>").join("") + "</div>";
    builtFor = null;
    if (s.outcome.durationSeconds) setTimeout(() => store.reset(), s.outcome.durationSeconds * 1000);
    return;
  }
  if (!s.form) {
    root.innerHTML = s.errors[FORM_ERROR] ? '<p class="f-err">' + esc(s.errors[FORM_ERROR]) + "</p>" : '<p class="f-note">Loading the form…</p>';
    builtFor = null;
    return;
  }
  if (s.closed) {
    root.innerHTML = '<p class="f-note">' + esc(s.form.disabledMessage || "Sign-ups are closed for now.") + "</p>";
    builtFor = null;
    return;
  }
  const key = s.step + ":" + visible(s).map((f) => f.target + (f.required ? "!" : "")).join(",");
  if (key !== builtFor) { build(s); builtFor = key; }
  update(s);
}

root.addEventListener("input", (e) => {
  const name = e.target.name;
  if (!name) return;
  if (name.endsWith("/" + OTHER)) {
    const t = name.slice(0, -(OTHER.length + 1));
    store.setValue(t, otherValue(byTarget[t], e.target.value));
  } else if (e.target.type === "checkbox") {
    store.setValue(name, e.target.checked);
  } else if (e.target.tagName !== "SELECT") {
    store.setValue(name, e.target.value);
  }
});
root.addEventListener("change", (e) => {
  if (e.target.tagName !== "SELECT") return;
  const t = e.target.name;
  if (e.target.value === OTHER) {
    const other = root.querySelector('[name="' + t + "/" + OTHER + '"]');
    store.setValue(t, otherValue(byTarget[t], other ? other.value : ""));
    if (other) { other.hidden = false; other.focus(); }
  } else {
    store.setValue(t, e.target.value);
  }
});
root.addEventListener("focusout", (e) => {
  const name = e.target.name;
  if (name) store.validate(name.endsWith("/" + OTHER) ? name.slice(0, -(OTHER.length + 1)) : name);
});
root.addEventListener("submit", (e) => {
  const s = store.getState();
  if (s.form && s.form.steps && s.step < s.form.steps.length - 1) store.next(e); else store.submit(e);
});

store.subscribe(render);
render(store.getState());
store.start();