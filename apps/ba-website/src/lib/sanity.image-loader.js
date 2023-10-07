"use client";

export default function myImageLoader({ src, width, quality }) {
  const w = width || 1000;
  const q = quality || 75;
  const queryConnector = src.includes("?") ? "&" : "?";
  return `${src}${queryConnector}w=${w}&q=${q}`;
}