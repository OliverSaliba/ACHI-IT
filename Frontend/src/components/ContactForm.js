import { useFormik } from "formik";
import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ContactForm = ({ decreaseMargin }) => {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
const fileInputRef = useRef(null);
const formTopRef = useRef(null); // scroll target (top of form card)
  const [files, setFiles] = useState([]); // File[]
  const [selectedFileName, setSelectedFileName] = useState("")
  const [uploadError, setUploadError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const NS = "contactForm";


const SCRIPT_URL = process.env.REACT_APP_CONTACT_SCRIPT_URL || "";
const filesToBase64Payload = async (files) => {
  const list = Array.from(files || []);
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const base64 = result.includes(",") ? result.split(",")[1] : "";
        resolve({
          name: file.name,
          type: file.type || "application/octet-stream",
          base64,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return Promise.all(list.map(toBase64));
};



  const formik = useFormik({
    initialValues: {
      contactName: "",
      contactSurname: "",
      contactCompany: "",
      contactEmail: "",
      contactPhone: "",
      contactLocation: "",
      contactService: "",
      contactMessage: "",
      contactFiles: [],
      // Honeypot field (hidden from users)
      website: "",
    },
    validationSchema: Yup.object({
      contactName: Yup.string().required(t(`${NS}.form.validation.required`)),
      contactSurname: Yup.string().required(t(`${NS}.form.validation.required`)),
      contactCompany: Yup.string().required(t(`${NS}.form.validation.required`)),
      contactEmail: Yup.string()
        .email(t(`${NS}.form.validation.email`))
        .required(t(`${NS}.form.validation.required`)),
      contactPhone: Yup.string()
        .required(t(`${NS}.form.validation.required`))
        .matches(/^[\d\s\+\-\(\)]+$/, t(`${NS}.form.validation.phone`)),
      contactLocation: Yup.string(), // Optional
      contactService: Yup.string().required(t(`${NS}.form.validation.required`)),
      contactMessage: Yup.string().required(t(`${NS}.form.validation.required`)),
      // Honeypot should be empty
      website: Yup.string().max(0, "Invalid"),
    }),
onSubmit: async (values, { resetForm }) => {
  if (values.website) return;

  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    if (!SCRIPT_URL) {
      throw new Error("Missing REACT_APP_CONTACT_SCRIPT_URL");
    }

    const filesPayload = await filesToBase64Payload(values.contactFiles);

    const payload = {
      contactName: values.contactName,
      contactSurname: values.contactSurname,
      contactCompany: values.contactCompany,
      contactEmail: values.contactEmail,
      contactPhone: values.contactPhone,
      contactLocation: values.contactLocation || "",
      contactService: values.contactService,
      contactMessage: values.contactMessage,
      website: values.website || "",
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
      files: filesPayload,
    };

    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    setSubmitStatus("success");
    resetForm();
    clearAllFiles();

    setTimeout(() => setSubmitStatus(null), 5000);
  } catch (err) {
    console.error(err);
    setSubmitStatus("error");
    setTimeout(() => setSubmitStatus(null), 5000);
  } finally {
    setIsSubmitting(false);
  }
}



  });

  function normalizeAndAddFiles(incomingFiles) {
    const MAX_FILES = 40;
    const allowedExtensions = new Set(["pdf", "jpg", "jpeg", "png", "doc", "docx"]);

    const incoming = Array.from(incomingFiles || []);
    if (incoming.length === 0) return;

    const makeKey = (f) => `${f.name}-${f.size}-${f.lastModified}`;
    const getExtension = (name) => {
      const parts = String(name || "").toLowerCase().split(".");
      return parts.length > 1 ? parts[parts.length - 1] : "";
    };

    // 1) filter by allowed extensions
    const validIncoming = [];
    let firstInvalidName = "";

    for (const f of incoming) {
      const ext = getExtension(f.name);
      if (!allowedExtensions.has(ext)) {
        if (!firstInvalidName) firstInvalidName = f.name;
        continue;
      }
      validIncoming.push(f);
    }

    // 2) dedupe + 3) merge (append) + 4) enforce max 40
    setFiles((prev) => {
      const existingKeys = new Set(prev.map(makeKey));
      const dedupedIncoming = [];
      for (const f of validIncoming) {
        const key = makeKey(f);
        if (existingKeys.has(key)) continue;
        existingKeys.add(key);
        dedupedIncoming.push(f);
      }

      let overflow = false;
      const merged = [...prev];
      for (const f of dedupedIncoming) {
        if (merged.length >= MAX_FILES) {
          overflow = true;
          break;
        }
        merged.push(f);
      }

      // 5) set uploadError when invalid/overflow
      if (firstInvalidName) {
        setUploadError(`Unsupported file type: ${firstInvalidName}`);
      } else if (overflow) {
        setUploadError("Maximum 40 files. Extra files were not added.");
      } else {
        setUploadError("");
      }

      formik.setFieldValue("contactFiles", merged)

      return merged;
    });
  }

const handleFileChange = (e) => {
    normalizeAndAddFiles(Array.from(e.target.files || []))
      e.target.value = ""
  const files = Array.from(e.target.files || []);
  formik.setFieldValue("contactFiles", files);
  // setSelectedFileName(files.length ? files.map((f) => f.name).join(", ") : "");
};


  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    normalizeAndAddFiles(Array.from(e.dataTransfer.files || []));
  };

const removeFile = (fileToRemove) => {
  const makeKey = (f) => `${f.name}-${f.size}-${f.lastModified}`
  const keyToRemove = makeKey(fileToRemove)

  setFiles((prev) => {
    const next = prev.filter((f) => makeKey(f) !== keyToRemove)
    formik.setFieldValue("contactFiles", next)
    return next
  })

  setUploadError("")
}

const clearAllFiles = () => {
  setFiles([])
  formik.setFieldValue("contactFiles", [])
  setUploadError("")
  setSelectedFileName("")
  if (fileInputRef.current) fileInputRef.current.value = ""
}

  const serviceOptions = [
    { value: "facade", key: "facade" },
    { value: "suspended", key: "suspended" },
    { value: "highRise", key: "highRise" },
    { value: "highCapacity", key: "highCapacity" },
    { value: "shoring", key: "shoring" },
    { value: "industrial", key: "industrial" },
    { value: "circularDome", key: "circularDome" },
    { value: "events", key: "events" },
    { value: "roof", key: "roof" },
    { value: "mobileSuspended", key: "mobileSuspended" },
    { value: "accessStairs", key: "accessStairs" },
    { value: "loadingPlatforms", key: "loadingPlatforms" },
    { value: "adjustableProps", key: "adjustableProps" },
    { value: "laborforce", key: "laborforce" },
    { value: "design", key: "design" },
    { value: "digital", key: "digital" },
    { value: "other", key: "other" },
  ];

  const whatsappNumber = String(i18n.resolvedLanguage || i18n.language || "").toLowerCase().startsWith("it") ? "+393318007652" : "+96103322811";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`;


  const scrollToFormTop = () => {
  const el = formTopRef.current;
  if (!el) return;
  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};


  return (
    <section
      className={`bg-[#f5f7fa] w-full ${decreaseMargin ? "mt-0" : "mt-[100px]"}`}
      id="contactForm"
      aria-labelledby="contact-form-title"
    >
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] py-[60px] md:py-[80px]">
        {/* Hero Section */}
        <header className="text-center mb-[50px] md:mb-[60px]">
          <h2 id="contact-form-title" className="font-[Rajdhani] text-[32px] md:text-[42px] font-[700] uppercase mb-[16px] text-[#28509E]">
            {t("nav.contact")}
          </h2>
          <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#2a2a2a] font-['Open_Sans'] max-w-[800px] mx-auto">
            {t(`${NS}.hero.subline`)}
          </p>
        </header>

        {/* Two-Column Layout: Form + Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] md:gap-[50px] mb-[60px] md:mb-[80px]">
          {/* Left Column: Technical Intake Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-none shadow-md border border-[#e5e7eb] p-[30px] md:p-[40px]">
              <h3 className="font-[Rajdhani] text-[24px] md:text-[28px] font-[700] uppercase mb-[24px] text-[#28509E]">
                {t(`${NS}.form.title`)}
              </h3>

              <form onSubmit={formik.handleSubmit} className="w-full" noValidate>
                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                {/* Name */}
                <div className="mb-[20px]">
                  <label htmlFor="contactName" className="block text-[14px] font-[600] text-[#2a2a2a] mb-[8px] font-['Open_Sans']">
                    {t(`${NS}.form.name.label`)}
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={formik.values.contactName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t(`${NS}.form.name.placeholder`)}
                    autoComplete="given-name"
                    required
                    aria-invalid={formik.errors.contactName && formik.touched.contactName ? "true" : "false"}
                    aria-describedby={formik.errors.contactName && formik.touched.contactName ? "contactNameError" : undefined}
                    className={`w-full px-[16px] py-[12px] bg-white border-[1px] border-solid rounded-none text-[#2a2a2a] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-[#28509E] focus:border-[#28509E] transition-all text-[16px] font-['Open_Sans'] ${
                      formik.errors.contactName && formik.touched.contactName ? "border-red-500" : "border-[#d1d5db]"
                    }`}
                  />
                  {formik.errors.contactName && formik.touched.contactName && (
                    <p id="contactNameError" className="text-red-500 text-[12px] mt-[4px] font-['Open_Sans']">
                      {formik.errors.contactName}
                    </p>
                  )}
                </div>

                {/* Surname */}
                <div className="mb-[20px]">
                  <label htmlFor="contactSurname" className="block text-[14px] font-[600] text-[#2a2a2a] mb-[8px] font-['Open_Sans']">
                    {t(`${NS}.form.surname.label`)}
                  </label>
                  <input
                    id="contactSurname"
                    name="contactSurname"
                    type="text"
                    value={formik.values.contactSurname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t(`${NS}.form.surname.placeholder`)}
                    autoComplete="family-name"
                    required
                    aria-invalid={formik.errors.contactSurname && formik.touched.contactSurname ? "true" : "false"}
                    aria-describedby={formik.errors.contactSurname && formik.touched.contactSurname ? "contactSurnameError" : undefined}
                    className={`w-full px-[16px] py-[12px] bg-white border-[1px] border-solid rounded-none text-[#2a2a2a] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-[#28509E] focus:border-[#28509E] transition-all text-[16px] font-['Open_Sans'] ${
                      formik.errors.contactSurname && formik.touched.contactSurname ? "border-red-500" : "border-[#d1d5db]"
                    }`}
                  />
                  {formik.errors.contactSurname && formik.touched.contactSurname && (
                    <p id="contactSurnameError" className="text-red-500 text-[12px] mt-[4px] font-['Open_Sans']">
                      {formik.errors.contactSurname}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="mb-[20px]">
                  <label htmlFor="contactCompany" className="block text-[14px] font-[600] text-[#2a2a2a] mb-[8px] font-['Open_Sans']">
                    {t(`${NS}.form.company.label`)}
                  </label>
                  <input
                    id="contactCompany"
                    name="contactCompany"
                    type="text"
                    value={formik.values.contactCompany}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t(`${NS}.form.company.placeholder`)}
                    autoComplete="organization"
                    required
                    aria-invalid={formik.errors.contactCompany && formik.touched.contactCompany ? "true" : "false"}
                    aria-describedby={formik.errors.contactCompany && formik.touched.contactCompany ? "contactCompanyError" : undefined}
                    className={`w-full px-[16px] py-[12px] bg-white border-[1px] border-solid rounded-none text-[#2a2a2a] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-[#28509E] focus:border-[#28509E] transition-all text-[16px] font-['Open_Sans'] ${
                      formik.errors.contactCompany && formik.touched.contactCompany ? "border-red-500" : "border-[#d1d5db]"
                    }`}
                  />
                  {formik.errors.contactCompany && formik.touched.contactCompany && (
                    <p id="contactCompanyError" className="text-red-500 text-[12px] mt-[4px] font-['Open_Sans']">
                      {formik.errors.contactCompany}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-[20px]">
                  <label htmlFor="contactPhone" className="block text-[14px] font-[600] text-[#2a2a2a] mb-[8px] font-['Open_Sans']">
                    {t(`${NS}.form.phone.label`)}
                  </label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formik.values.contactPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t(`${NS}.form.phone.placeholder`)}
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    aria-invalid={formik.errors.contactPhone && formik.touched.contactPhone ? "true" : "false"}
                    aria-describedby={formik.errors.contactPhone && formik.touched.contactPhone ? "contactPhoneError" : undefined}
                    className={`w-full px-[16px] py-[12px] bg-white border-[1px] border-solid rounded-none text-[#2a2a2a] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-[#28509E] focus:border-[#28509E] transition-all text-[16px] font-['Open_Sans'] ${
                      formik.errors.contactPhone && formik.touched.contactPhone ? "border-red-500" : "border-[#d1d5db]"
                    }`}
                  />
                  {formik.errors.contactPhone && formik.touched.contactPhone && (
                    <p id="contactPhoneError" className="text-red-500 text-[12px] mt-[4px] font-['Open_Sans']">
                      {formik.errors.contactPhone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-[20px]">
                  <label htmlFor="contactEmail" className="block text-[14px] font-[600] text-[#2a2a2a] mb-[8px] font-['Open_Sans']">
                    {t(`${NS}.form.email.label`)}
                  </label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formik.values.contactEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t(`${NS}.form.email.placeholder`)}
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-invalid={formik.errors.contactEmail && formik.touched.contactEmail ? "true" : "false"}
                    aria-describedby={formik.errors.contactEmail && formik.touched.contactEmail ? "contactEmailError" : undefined}
                    className={`w-full px-[16px] py-[12px] bg-white border-[1px] border-solid rounded-none text-[#2a2a2a] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-[#28509E] focus:border-[#28509E] transition-all text-[16px] font-['Open_Sans'] ${
                      formik.errors.contactEmail && formik.touched.contactEmail ? "border-red-500" : "border-[#d1d5db]"
                    }`}
                  />
                  {formik.errors.contactEmail && formik.touched.contactEmail && (
                    <p id="contactEmailError" className="text-red-500 text-[12px] mt-[4px] font-['Open_Sans']">
                      {formik.errors.contactEmail}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="mb-[20px]">
                  <label htmlFor="contactLocation" className="block text-[14px] font-[600] text-[#2a2a2a] mb-[8px] font-['Open_Sans']">
                    {t(`${NS}.form.location.label`)}
                  </label>
                  <input
                    id="contactLocation"
                    name="contactLocation"
                    type="text"
                    value={formik.values.contactLocation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t(`${NS}.form.location.placeholder`)}
                    autoComplete="address-line1"
                    className="w-full px-[16px] py-[12px] bg-white border-[1px] border-solid border-[#d1d5db] rounded-none text-[#2a2a2a] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-[#28509E] focus:border-[#28509E] transition-all text-[16px] font-['Open_Sans']"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="mb-[20px]">
                  <label htmlFor="contactService" className="block text-[14px] font-[600] text-[#2a2a2a] mb-[8px] font-['Open_Sans']">
                    {t(`${NS}.form.service.label`)}
                  </label>
                  <select
                    id="contactService"
                    name="contactService"
                    value={formik.values.contactService}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    aria-invalid={formik.errors.contactService && formik.touched.contactService ? "true" : "false"}
                    aria-describedby={formik.errors.contactService && formik.touched.contactService ? "contactServiceError" : undefined}
                    className={`w-full px-[16px] py-[12px] bg-white border-[1px] border-solid rounded-none text-[#2a2a2a] outline-none focus:ring-2 focus:ring-[#28509E] focus:border-[#28509E] transition-all text-[16px] font-['Open_Sans'] cursor-pointer ${
                      formik.errors.contactService && formik.touched.contactService ? "border-red-500" : "border-[#d1d5db]"
                    }`}
                  >
                    <option value="">{t(`${NS}.form.service.placeholder`)}</option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t(`${NS}.form.service.options.${option.key}`)}
                      </option>
                    ))}
                  </select>
                  {formik.errors.contactService && formik.touched.contactService && (
                    <p id="contactServiceError" className="text-red-500 text-[12px] mt-[4px] font-['Open_Sans']">
                      {formik.errors.contactService}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-[20px]">
                  <label htmlFor="contactMessage" className="block text-[14px] font-[600] text-[#2a2a2a] mb-[8px] font-['Open_Sans']">
                    {t(`${NS}.form.message.label`)}
                  </label>
                  <textarea
                    id="contactMessage"
                    name="contactMessage"
                    value={formik.values.contactMessage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows="5"
                    placeholder={t(`${NS}.form.message.placeholder`)}
                    required
                    aria-invalid={formik.errors.contactMessage && formik.touched.contactMessage ? "true" : "false"}
                    aria-describedby={formik.errors.contactMessage && formik.touched.contactMessage ? "contactMessageError" : undefined}
                    className={`w-full resize-none px-[16px] py-[12px] bg-white border-[1px] border-solid rounded-none text-[#2a2a2a] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-[#28509E] focus:border-[#28509E] transition-all text-[16px] font-['Open_Sans'] ${
                      formik.errors.contactMessage && formik.touched.contactMessage ? "border-red-500" : "border-[#d1d5db]"
                    }`}
                  ></textarea>
                  {formik.errors.contactMessage && formik.touched.contactMessage && (
                    <p id="contactMessageError" className="text-red-500 text-[12px] mt-[4px] font-['Open_Sans']">
                      {formik.errors.contactMessage}
                    </p>
                  )}
                </div>

                {/* File Upload with Drag & Drop */}
                <div className="mb-[24px] flex flex-col">
                  <label htmlFor="contactFiles" className="block text-[14px] font-[600] text-[#2a2a2a] mb-[8px] font-['Open_Sans']">
                    {t(`${NS}.form.fileUpload.label`)}
                  </label>
                  
                  {/* Drag & Drop Zone */}
                  <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-none p-[24px] transition-all ${
                      isDragging 
                        ? 'border-[#28509E] bg-[#EEF2F9]' 
                        : 'border-[#d1d5db] bg-[#f9fafb] hover:border-[#9ca3af]'
                    }`}
                  >
                    <input
  ref={fileInputRef}
  id="contactFiles"
  name="contactFiles"
  type="file"
  multiple
  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
  onChange={handleFileChange}
  className="hidden"
/>

                    
                    <div className="flex flex-col items-center justify-center text-center">
                      {/* Upload Icon */}
                      <svg 
                        className="w-[48px] h-[48px] text-[#9ca3af] mb-[12px]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                        />
                      </svg>
                      
                      {/* File Count Label (non-interactive) */}
                      {files.length > 0 && (
                        <div
                          className="mb-[12px] font-['Open_Sans'] text-[14px] font-[600] text-[#1d3b77] cursor-default"
                          aria-live="polite"
                        >
                          {files.length} file{files.length !== 1 ? 's' : ''} selected
                        </div>
                      )}
                      
                      {/* Instructions */}
                      <p className="text-[14px] font-[600] text-[#2a2a2a] mb-[4px] font-['Open_Sans']">
                        {isDragging ? 'Drop files here' : 'Drag & drop files here'}
                      </p>
                      <p className="text-[13px] text-[#6b7280] mb-[12px] font-['Open_Sans']">
                        or
                      </p>
                      
                      {/* Browse Button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-[24px] py-[10px] bg-[#28509E] text-white font-['Open_Sans'] text-[14px] font-[600] rounded-none hover:bg-[#1e3a7a] transition-colors cursor-pointer"
                      >
                        Browse Files
                      </button>
                    </div>
                  </div>

                  {/* Helper text */}
                  <p className="text-[12px] text-[#6b7280] mt-[8px] font-['Open_Sans']">
                    Maximum 40 files • {t(`${NS}.form.fileUpload.accept`)}
                  </p>

                  {/* Error Message */}
                  {uploadError && (
                    <p className="text-red-500 text-[12px] mt-[8px] font-['Open_Sans'] font-[600]">
                      {uploadError}
                    </p>
                  )}
                </div>

                {/* Selected Files List (positioned above submit) */}
                {files.length > 0 && (
                  <div className="mb-[16px]">
                    <div className="flex items-center justify-between mb-[10px]">
                      <p className="text-[13px] text-[#2a2a2a] font-['Open_Sans'] font-[600]">
                        Selected files ({files.length})
                      </p>
                      <button
                        type="button"
                        onClick={clearAllFiles}
                        className="text-[12px] text-[#28509E] hover:text-[#1e3a7a] font-['Open_Sans'] font-[600] underline"
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="space-y-[6px]">
                      {files.slice(0, 6).map((file) => (
                        <div
                          key={`${file.name}-${file.size}-${file.lastModified}`}
                          className="flex items-center justify-between px-[12px] py-[8px] bg-white border border-[#e5e7eb] rounded-none"
                        >
                          <span className="text-[13px] text-[#2a2a2a] font-['Open_Sans'] truncate max-w-[85%]">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(file)}
                            className="text-[#6b7280] hover:text-[#111827] font-['Open_Sans'] font-[700] text-[16px] leading-none"
                            aria-label={`Remove ${file.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      {files.length > 6 && (
                        <p className="text-[12px] text-[#6b7280] font-['Open_Sans']">
                          + {files.length - 6} more
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
  type="button"
  disabled={isSubmitting}
  onClick={async () => {
    const errors = await formik.validateForm()
    const hasErrors = Object.keys(errors || {}).length > 0

    if (hasErrors) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true
          return acc
        }, {}),
        true
      )
      scrollToFormTop()
      return
    }

    formik.handleSubmit()
  }}
  className="w-full px-[40px] py-[16px] bg-[#ff8a00] text-white font-[Rajdhani] font-[700] text-[18px] uppercase rounded-none hover:bg-[#e77a00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#ff8a00] focus:ring-offset-2"
  aria-label={t(`${NS}.form.submit`)}
>
  {isSubmitting ? t(`${NS}.form.submitting`) : t(`${NS}.form.submit`)}
</button>


                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="mt-[20px] p-[16px] bg-[#d1fae5] border border-[#10b981] text-[#065f46] rounded-none text-[14px] font-['Open_Sans']">
                    {t(`${NS}.form.success`)}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mt-[20px] p-[16px] bg-[#fee2e2] border border-[#ef4444] text-[#991b1b] rounded-none text-[14px] font-['Open_Sans']">
                    {t(`${NS}.form.error`)}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Direct Contact Card */}
          <div className="order-1 lg:order-2">
<div
  ref={formTopRef}
  className="bg-white rounded-none shadow-md border border-[#e5e7eb] p-[30px] md:p-[40px]"
>
              <h3 className="font-[Rajdhani] text-[24px] md:text-[28px] font-[700] uppercase mb-[24px] text-[#28509E]">
                {t(`${NS}.contactCard.title`)}
              </h3>

              {/* WhatsApp Block */}
              <div className="mb-[15px] pb-[20px] border-b border-[#e5e7eb]">
                <h4 className="font-[Rajdhani] text-[20px] font-[700] text-[#28509E] mb-[8px]">
                  {t(`${NS}.contactCard.whatsapp.title`)}
                </h4>
                <p className="text-[14px] text-[#6b7280] mb-[16px] font-['Open_Sans']">
                  {t(`${NS}.contactCard.whatsapp.text`)}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-[24px] py-[12px] bg-[#25d366] text-white font-[Rajdhani] font-[700] text-[16px] uppercase rounded-none hover:bg-[#20ba5a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2"
                  aria-label={t(`${NS}.contactCard.whatsapp.aria`)}
                >
                  {t(`${NS}.contactCard.whatsapp.button`)}
                </a>
              </div>

              {/* Phone Block */}
              <div className="mb-[10px] pb-[32px] border-b border-[#e5e7eb]">
                <div className="mb-[-20px]">
                  <p className="text-[14px] font-[600] text-[#2a2a2a] mb-[4px] font-['Open_Sans']">
                    {t(`${NS}.contactCard.phone.office.label`)}
                  </p>
                  <a
                    href={`tel:${t("footer.contact.phoneHref")}`}
                    className="text-[16px] text-[#28509E] hover:text-[#ff8a00] transition-colors font-['Open_Sans']"
                  >
                    {t(`${NS}.contactCard.phone.office.number`)}
                  </a>
                </div>
              </div>

              {/* Email Block */}
              <div className="mb-[30px]">
                <div className="mb-[-15px]">
                  <p className="text-[14px] font-[600] text-[#2a2a2a] mb-[4px] font-['Open_Sans']">
                    {t(`${NS}.contactCard.email.general.label`)}
                  </p>
                  <a
                    href={`mailto:${t("footer.contact.emailHref")}`}
                    className="text-[16px] text-[#28509E] hover:text-[#ff8a00] transition-colors font-['Open_Sans'] break-all"
                  >
                    {t(`${NS}.contactCard.email.general.address`)}
                  </a>
                </div>
              </div>

              {/* Coverage */}
              <p className="text-[14px] text-[#6b7280] font-['Open_Sans']">
                {t(`${NS}.contactCard.coverage`)}
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full">
          <h3 className="font-[Rajdhani] text-[24px] md:text-[28px] font-[700] uppercase mb-[24px] text-[#28509E] text-center">
            {t(`${NS}.map.title`)}
          </h3>
          <div className="w-full h-[300px] md:h-[400px] bg-[#e5e7eb] rounded-none overflow-hidden border border-[#d1d5db]">
            <iframe
              title={t(`${NS}.map.aria`)}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.5!2d35.5801225!3d33.9041499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f3de263b60495%3A0xcbc7a90fca63a565!2sACHI%20Scaffolding!5e0!3m2!1sen!2slb!4v1700000000000!5m2!1sen!2slb"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label={t(`${NS}.map.aria`)}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
