"use client";

import { useState } from "react";

export const useNow = () => {
  return useState(() => new Date())[0];
};