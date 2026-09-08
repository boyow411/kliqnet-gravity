"use client";
import Image from "next/image";
import { useRef, useState } from "react";
export function CaseGallery({
  images,
  captions,
  name,
}: {
  images: string[];
  captions: string[];
  name: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  if (!images.length) return null;
  return (
    <>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <figure key={src}>
            <button
              className="gallery-frame"
              aria-label={`Enlarge ${name} image ${i + 1}`}
              onClick={() => {
                setSelected(i);
                dialog.current?.showModal();
              }}
            >
              <Image
                src={src}
                alt={captions[i] || name + " project screen"}
                fill
                className="object-contain"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </button>
            <figcaption>
              {captions[i] || name + " project screen"}{" "}
              <span>— Select to enlarge</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-label={name + " image viewer"}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <form method="dialog">
          <button className="dialog-close" autoFocus>
            Close image
          </button>
        </form>
        <Image
          src={images[selected]}
          alt={captions[selected] || name + " project screen"}
          width={1600}
          height={1000}
        />
        <p>{captions[selected]}</p>
      </dialog>
    </>
  );
}
