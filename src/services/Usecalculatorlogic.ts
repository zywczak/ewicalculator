import { useCallback, useRef } from "react";
import { OPTION_IDS } from "../data/constants/optionIds";
import { StepsData } from "../data/steps/types";
import { CalculatedMaterials } from "./materialCalculator";
import { products } from "../data/products";

// ─── Module-level image cache ─────────────────────────────────────────────────

const imageCache = new Map<string, { imageUrl: string; timestamp: number }>();

const getCacheKey = (optionId: number, selectedOptions: number[]) => {
  const houseType = selectedOptions.find(
    (o) => o === OPTION_IDS.HOUSE.DETACHED || o === OPTION_IDS.HOUSE.SEMI_DETACHED || o === OPTION_IDS.HOUSE.TERRACED
  ) ?? 0;
  const surface = selectedOptions.find((o) => Object.values(OPTION_IDS.SURFACE).includes(o as any)) ?? 0;
  return `11-${optionId}-${houseType}-${surface}`;
};

const compressImage = (blob: Blob, maxWidth = 1920, quality = 0.85): Promise<Blob> => {
  if (blob.size < 1024 * 1024) return Promise.resolve(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("No canvas context")); return; }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Compression failed")), "image/jpeg", quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image load failed")); };
    img.src = url;
  });
};

const cleanObject = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(cleanObject);
  if (typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => [k, cleanObject(v)])
    );
  }
  return obj;
};

const getApiKey = () => {
  const urlParams = new URLSearchParams(globalThis.location.search);
  return urlParams.get("apiKEY") || import.meta.env.VITE_API_KEY || "51e904be14b69f404b782149c16681c3";
};

// ─── Hook interface ───────────────────────────────────────────────────────────

interface UseCalculatorLogicOptions {
  stepsData: StepsData;
  currentStep: number;
  setCurrentStep: (v: number) => void;
  selectedOptions: number[];
  setSelectedOptions: (fn: (prev: number[]) => number[]) => void;
  completedSteps: Set<number>;
  setCompletedSteps: (fn: (prev: Set<number>) => Set<number>) => void;
  values: Record<number, string | number>;
  setValues: (fn: (prev: Record<number, string | number>) => Record<number, string | number>) => void;
  accumulatedJsonData: Record<string, any>;
  setAccumulatedJsonData: (fn: (prev: Record<string, any>) => Record<string, any>) => void;
  calculatedMaterials: CalculatedMaterials | null;
  generatedImageBase64: string | null;
  setGeneratedImageBase64: (v: string | null) => void;
  sessionNumber: number;
  logID: number;
  setLogID: (v: number) => void;
  outlinePoints: any[];
  setOutlinePoints: (v: any[]) => void;
  setCanCompleteOutline: (v: boolean) => void;
  setCustomImage: (v: string | null) => void;
  setIsDrawingMode: (v: boolean) => void;
  setGeneratedImage: (v: string | null) => void;
  setCompositeImage: (v: string | null) => void;
  setIsGeneratingImage: (v: boolean) => void;
  setTargetStepToReach: (v: number | null) => void;
  setSnackbarMessage: (v: string) => void;
  setSnackbarSeverity: (v: "success" | "error") => void;
  setSnackbarOpen: (v: boolean) => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCalculatorLogic({
  stepsData,
  currentStep, setCurrentStep,
  selectedOptions, setSelectedOptions,
  setCompletedSteps,
  values, setValues,
  accumulatedJsonData, setAccumulatedJsonData,
  calculatedMaterials, generatedImageBase64, setGeneratedImageBase64,
  sessionNumber, logID, setLogID,
  outlinePoints, setOutlinePoints,
  setCanCompleteOutline, setCustomImage, setIsDrawingMode,
  setGeneratedImage, setCompositeImage, setIsGeneratingImage,
  setTargetStepToReach,
  setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen,
}: UseCalculatorLogicOptions) {
  const outlineRef = useRef(outlinePoints);
  outlineRef.current = outlinePoints;

  const colourAbortControllerRef = useRef<AbortController | null>(null);

  const parentSteps = stepsData.steps.filter((s) => !s.parent).sort((a, b) => a.id - b.id);
  const isLastStep = currentStep === parentSteps.length - 1;

  // ── Helpers ───────────────────────────────────────────────────────────────

  const isStepSkipped = useCallback((stepIndex: number, selectedOpts: number[]): boolean => {
    const step = parentSteps[stepIndex];
    return parentSteps.slice(0, stepIndex).some((prev) =>
      prev.conditions?.some((c) => c.skip_steps.includes(step.id) && selectedOpts.includes(c.trigger_option))
    );
  }, [parentSteps]);

  const clearColourSelection = useCallback(() => {
    const colourStep = stepsData.steps.find((s) => s.id === 11);
    const colourOptionIds = colourStep?.options?.map((o) => o.id) ?? [];
    setValues((prev) => { const n = { ...prev }; delete n[11]; return n; });
    setSelectedOptions((prev) => prev.filter((o) => !colourOptionIds.includes(o)));
    setAccumulatedJsonData((prev) => {
      const n = { ...prev };
      if (colourStep?.json_key) delete n[colourStep.json_key];
      delete n["colour_code"];
      return n;
    });
  }, [stepsData, setValues, setSelectedOptions, setAccumulatedJsonData]);

  const clearStepSelection = useCallback((stepId: number) => {
    const step = stepsData.steps.find((s) => s.id === stepId);
    const optionIds = step?.options?.map((o) => o.id) ?? [];
    setValues((prev) => { const n = { ...prev }; delete n[stepId]; return n; });
    setSelectedOptions((prev) => prev.filter((o) => !optionIds.includes(o)));
    setAccumulatedJsonData((prev) => {
      const n = { ...prev };
      if (step?.json_key) delete n[step.json_key];
      return n;
    });
  }, [stepsData, setValues, setSelectedOptions, setAccumulatedJsonData]);

  const clearGeneratedImages = useCallback(() => {
    imageCache.clear();
    setGeneratedImage(null);
    setCompositeImage(null);
    sessionStorage.removeItem("compositeHouseImage");
  }, [setGeneratedImage, setCompositeImage]);

  // ── Navigation ────────────────────────────────────────────────────────────

  const logSession = useCallback(async (lastStep: string) => {
    try {
      const apiKEY = getApiKey();
      const measurement = Number(values[3]) || 0;
      let params = apiKEY ? `?apiKEY=${apiKEY}` : "";
      if (measurement > 0) params += `&measurement=${measurement}`;
      params += "&justLogCalculation=1";
      if (logID !== 0) params += `&logID=${logID}&lastStep=${lastStep}`;
      const res = await fetch(`https://veen-e.ewipro.com:7443/ewi-calculator/log.php${params}`, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) { const data = await res.json(); if (data.logID) setLogID(data.logID); }
    } catch (err) { console.error("[logSession]", err); }
  }, [values, logID, setLogID]);

  const resolveFixingsMinLength = useCallback((mappedData: Record<string, any>): number | null => {
    if (!mappedData.fixings || !mappedData.insulationType || !mappedData.thickness) return null;
    const fixingOption = stepsData.steps.find((s) => s.id === 7)?.options?.find((o) => selectedOptions.includes(o.id));
    const productCode = fixingOption?.productCode?.[0];
    if (!productCode) return null;
    const product = products.find((p) => p.productCode === productCode);
    if (!product || !("avaliable_lenght" in product)) return null;
    const minRequired = mappedData.thickness + (mappedData.insulationType === "EPS" ? 65 : 45);
    const sorted = [...(product as any).avaliable_lenght].sort((a: number, b: number) => a - b);
    return sorted.find((l: number) => l >= minRequired) ?? null;
  }, [stepsData, selectedOptions]);

  const buildMappedData = useCallback((accumulatedJsonData: Record<string, any>): Record<string, any> => {
    const mappedData = { ...accumulatedJsonData };
    if (mappedData.colour !== undefined) { mappedData.colour_code = mappedData.colour; delete mappedData.colour; }
    const fixingsMinLength = resolveFixingsMinLength(mappedData);
    if (fixingsMinLength) mappedData.fixings_min_length = fixingsMinLength;
    return mappedData;
  }, [resolveFixingsMinLength]);

  const buildCustomerDetails = useCallback((): Record<string, any> => {
    const customer_details: Record<string, any> = {};
    stepsData.steps.find((s) => s.id === 13)?.substeps?.forEach((sub: any) => {
      customer_details[sub.json_key] = values[sub.id] ?? null;
    });
    return customer_details;
  }, [stepsData, values]);

  const logSessionWithData = useCallback(async (lastStep: string) => {
    try {
      const apiKEY = getApiKey();
      const measurement = Number(values[3]) || 0;
      let params = apiKEY ? `?apiKEY=${apiKEY}` : "";
      if (measurement > 0) params += `&measurement=${measurement}`;
      params += "&justLogCalculation=1";
      if (logID !== 0) params += `&logID=${logID}&lastStep=${lastStep}`;

      const mappedData = buildMappedData(accumulatedJsonData);

      const dataObj = {
        ...mappedData,
        calculated_materials: calculatedMaterials,
        ...(generatedImageBase64 && { photo: generatedImageBase64 }),
      }
    
      const res = await fetch(`https://veen-e.ewipro.com:7443/ewi-calculator/log.php${params}`, {
        method: "POST", headers: { Accept: "application/json" }, body: JSON.stringify(dataObj),
      });

      const data = await res.json();
      if (data.logID) setLogID(data.logID);

    } catch (err) { console.error("[logSessionWithData]", err); }
  }, [values, accumulatedJsonData, calculatedMaterials, generatedImageBase64, sessionNumber, logID, setLogID, buildMappedData, buildCustomerDetails]);

  const getErrorMessage = (err: any): string => {
    if (err.message?.includes("HTTP")) return "Server error. Please try again later.";
    if (err.message?.includes("JSON")) return "Invalid server response.";
    return "Connection error. Please check your network.";
  };

  const submitForm = useCallback(async () => {
    try {
      const mappedData = buildMappedData(accumulatedJsonData);
      const payload = {
        apiKEY: getApiKey(), sessionNumber, logID,
        data: {
          ...cleanObject(mappedData),
          customer_details: cleanObject(buildCustomerDetails()),
          materials: cleanObject(calculatedMaterials ?? {}),
          ...(generatedImageBase64 && { photo: generatedImageBase64 }),
        },
      };
      const res = await fetch("https://veen-e.ewipro.com:7443/ewi-calculator/log.php", {
        method: "POST", body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      const success = result.email_validation === 1;
      setSnackbarMessage(success ? "Form submitted successfully!" : "Validation error. Please check the form.");
      setSnackbarSeverity(success ? "success" : "error");
      setSnackbarOpen(true);
    } catch (err: any) {
      setSnackbarMessage(getErrorMessage(err));
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [stepsData, values, selectedOptions, accumulatedJsonData, calculatedMaterials, generatedImageBase64, sessionNumber, logID, buildMappedData, buildCustomerDetails, setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen]);

  const handleNext = useCallback((
    stepValues?: Record<string, string | number | Record<string, any>>,
    triggerStepId?: number,
    selectedOptionId?: number,
  ) => {
    if (stepValues) setAccumulatedJsonData((prev) => ({ ...prev, ...stepValues }));
    if (isLastStep) { submitForm(); return; }

    let effective = selectedOptions;
    if (selectedOptionId !== undefined && triggerStepId !== undefined) {
      const stepOpts = stepsData.steps.find((s) => s.id === triggerStepId)?.options?.map((o) => o.id) ?? [];
      effective = effective.filter((o) => !stepOpts.includes(o));
      if (!effective.includes(selectedOptionId)) effective = [...effective, selectedOptionId];
      setSelectedOptions(() => effective);
    }

    let next = currentStep + 1;
    while (next < parentSteps.length && isStepSkipped(next, effective)) next++;
    const nextParentStep = parentSteps[next];
    if (nextParentStep?.id === 13) {
      logSessionWithData(parentSteps[currentStep]?.json_key ?? `step-${currentStep}`);
    } else {
      logSession(parentSteps[currentStep]?.json_key ?? `step-${currentStep}`);
    }
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    setCurrentStep(Math.min(next, parentSteps.length - 1));
  }, [isLastStep, selectedOptions, currentStep, parentSteps, isStepSkipped, stepsData, setAccumulatedJsonData, setSelectedOptions, setCompletedSteps, setCurrentStep, logSession, logSessionWithData, submitForm]);

  const handlePrev = useCallback(() => {
    let prev = currentStep - 1;
    while (prev >= 0 && isStepSkipped(prev, selectedOptions)) prev--;
    const newStep = Math.max(prev, 0);
    setAccumulatedJsonData((prevData) => {
      const n = { ...prevData };
      parentSteps.slice(newStep + 1).forEach((s) => { if (s.json_key) delete n[s.json_key]; });
      return n;
    });
    setCompletedSteps((prev) => {
      const n = new Set(prev);
      for (let i = newStep; i < parentSteps.length; i++) n.delete(i);
      return n;
    });
    setCurrentStep(newStep);
  }, [currentStep, selectedOptions, parentSteps, isStepSkipped, setAccumulatedJsonData, setCompletedSteps, setCurrentStep]);

  const handleGoToStep = useCallback((target: number) => {
    if (!isStepSkipped(target, selectedOptions)) setTargetStepToReach(target);
  }, [isStepSkipped, selectedOptions, setTargetStepToReach]);

  const handleNextClick = () => (globalThis as any).__multiStepFormHandlers?.handleNextClick?.();
  const handlePrevClick = () => (globalThis as any).__multiStepFormHandlers?.handlePrevClick?.();

  // ── Image handlers ────────────────────────────────────────────────────────

  const drawOutline = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "rgba(255,0,0,1)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    outlineRef.current.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x * width, p.y * height);
      else ctx.lineTo(p.x * width, p.y * height);
    });
    ctx.closePath();
    ctx.stroke();
  }, []);

  const applyMask = useCallback((
    ctx: CanvasRenderingContext2D,
    maskData: ImageData,
    width: number,
    height: number
  ) => {
    ctx.fillStyle = "rgba(255,0,0,0.7)";
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++)
        if (maskData.data[(y * width + x) * 4] > 200) ctx.fillRect(x, y, 1, 1);
  }, []);

  const onMaskLoad = useCallback((
    maskImg: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext("2d")!;
    maskCtx.drawImage(maskImg, 0, 0, width, height);
    const maskData = maskCtx.getImageData(0, 0, width, height);
    applyMask(ctx, maskData, width, height);
    drawOutline(ctx, width, height);
    const composite = (ctx.canvas).toDataURL("image/png");
    setCompositeImage(composite);
    sessionStorage.setItem("compositeHouseImage", composite);
  }, [applyMask, drawOutline, setCompositeImage]);

  const onBaseImageLoad = useCallback((img: HTMLImageElement, mask: string) => {
    const { width, height } = img;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const maskImg = new Image();
    maskImg.onload = () => onMaskLoad(maskImg, ctx, width, height);
    maskImg.src = mask;
  }, [onMaskLoad]);

  const createCompositeImage = useCallback((baseImage: string, mask: string) => {
    const img = new Image();
    img.onload = () => onBaseImageLoad(img, mask);
    img.src = baseImage;
  }, [onBaseImageLoad]);

  const handleCustomImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomImage(reader.result as string);
      setOutlinePoints([]);
      clearGeneratedImages();
      clearColourSelection();
      const houseType = selectedOptions.find((o) => o === 1 || o === 2 || o === 3);
      setIsDrawingMode(houseType === 1 || houseType === 2);
    };
    reader.readAsDataURL(file);
  }, [selectedOptions, clearGeneratedImages, clearColourSelection, setCustomImage, setOutlinePoints, setIsDrawingMode]);

  const handleOutlineChange = useCallback((points: any[], canComplete: boolean) => {
    setOutlinePoints(points);
    setCanCompleteOutline(canComplete);
  }, [setOutlinePoints, setCanCompleteOutline]);

  const handleAcceptOutline = useCallback((customImage: string | null) => {
    if (!customImage || outlineRef.current.length < 3) return;
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "black"; ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "white"; ctx.beginPath();
      outlineRef.current.forEach((p, i) => {
        const x = p.x * width, y = p.y * height;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath(); ctx.fill();
      createCompositeImage(customImage, canvas.toDataURL());
    };
    img.src = customImage;
    setIsDrawingMode(false);
  }, [createCompositeImage, setIsDrawingMode]);

  const handleRemoveCustomImage = useCallback(() => {
    // Abort any in-flight colour generation request before clearing state
    colourAbortControllerRef.current?.abort();
    colourAbortControllerRef.current = null;
    setIsGeneratingImage(false);

    setCustomImage(null); setIsDrawingMode(false); setOutlinePoints([]); setCanCompleteOutline(false);
    clearGeneratedImages(); clearColourSelection();
  }, [clearGeneratedImages, clearColourSelection, setCustomImage, setIsDrawingMode, setOutlinePoints, setCanCompleteOutline, setIsGeneratingImage]);

  const handleColourSelection = useCallback(async (
    colourValue: string, optionId: number,
    { customImage, compositeImage }: { customImage: string | null; compositeImage: string | null }
  ) => {
    if (!customImage && !compositeImage) return;
    const cacheKey = getCacheKey(optionId, selectedOptions);
    const cached = imageCache.get(cacheKey);
    if (cached) { setGeneratedImage(cached.imageUrl); return; }

    // ← abort poprzedniego requesta jeśli jeszcze leci
    colourAbortControllerRef.current?.abort();
    colourAbortControllerRef.current = new AbortController();
    const { signal } = colourAbortControllerRef.current;

    setIsGeneratingImage(true);
    try {
      const sourceUrl = sessionStorage.getItem("compositeHouseImage") || compositeImage || customImage!;
      let imageBlob = await fetch(sourceUrl, { signal }).then((r) => r.blob());
      imageBlob = await compressImage(imageBlob);
      const formData = new FormData();
      formData.append("file", imageBlob, "custom_house.jpg");
      formData.append("mode", "STRICT");
      formData.append("material", selectedOptions.includes(OPTION_IDS.RENDER_TYPE.BRICK_SLIPS) ? "BRICK_SLIP" : "RENDER");
      formData.append("colour_code", colourValue);

      const res = await fetch("https://veen-e.ewipro.com:7443/aidriver/edit_house", {
        method: "POST", headers: { Authorization: "51e904be14b69f404b782149c16681c3" }, body: formData,
        signal,
      });
      if (!res.ok) throw new Error(`AI generation failed: ${res.status}`);
      const resultBlob = await res.blob();
      const imageUrl = URL.createObjectURL(resultBlob);
      const reader = new FileReader();
      reader.onloadend = () => setGeneratedImageBase64(reader.result as string);
      reader.readAsDataURL(resultBlob);
      setGeneratedImage(imageUrl);
      imageCache.set(cacheKey, { imageUrl, timestamp: Date.now() });
    } catch (err: any) {
      if (err.name === "AbortError") {
        return;
      }
    } finally {
      if (!signal.aborted) setIsGeneratingImage(false);
    }
  }, [selectedOptions, setGeneratedImage, setGeneratedImageBase64, setIsGeneratingImage]);

  return {
    parentSteps, isStepSkipped,
    clearColourSelection, clearStepSelection, clearGeneratedImages,
    handleNext, handlePrev, handleGoToStep, handleNextClick, handlePrevClick,
    handleCustomImageUpload, handleOutlineChange, handleAcceptOutline,
    handleRemoveCustomImage, handleColourSelection,
  };
}