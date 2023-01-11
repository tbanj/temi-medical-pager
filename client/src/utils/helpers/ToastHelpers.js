// import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

export function formatArray(options: any[], value = "", label = "") {
  if (!options) return options;

  if (value && label)
    return options.map((opt) => ({
      label: opt[label],
      value: opt[value],
    }));

  return options.map((opt) => ({ label: opt, value: opt }));
}

export const notifySuccess = (msg: string) => {
  toast.success(msg);
};

export const notifyError = (msg: string) => {
  toast.error(msg);
};
